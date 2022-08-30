// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract InflottoV3 is ChainlinkClient, VRFConsumerBaseV2, KeeperCompatibleInterface { 
    using Chainlink for Chainlink.Request;
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    IERC721 private _token721;

    enum LotteryState { 
        OPEN, 
        CALCULATING_WINNER 
    }

    struct Winner {
        address payable addr; 
        uint amount;  
    }

    /* State variables */

    // Chainlink VRF Variables
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    uint64 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;

    // Truflation Variables
    //address public immutable i_chainlinkContract;
    address private immutable i_oracleId;
    uint256 private constant FEE_TRUFLATION = 10000000000000000; // 0.01 LINK;
    string private s_jobId;
    uint256 public s_recentYoyInflation;

    // Lottery Variables
    address private immutable i_nftContract;
    address private immutable i_owner;
    uint256 private immutable i_interval;
    uint256 private immutable i_entranceFee;
    uint256 private s_lastTimeStamp;
    uint256 private s_lotteryId;
    
    mapping (uint => Winner) private s_lotteryHistory;
    mapping (uint256 => address payable) private s_ticketRequests;
    address payable[] private s_players;
    uint256[] private s_tokens;
    uint256[] private s_tickets;
    LotteryState private s_lotteryState;
    
    // Upper and Lower bounds for YTD inflation randmoness
    uint256 private s_inflationUpper = 13500;
    uint256 private s_inflationLower = 8000;

    /* Events */
    event PlayerAdded(address indexed player, uint256 ticket);
    event WinnerPicked(address indexed player, uint256 lotteryId);

    /* Functions */
    constructor(
        address chainlinkContract,
        address oracleId,
        address vrfCoordinatorV2,
        uint64 subscriptionId,
        bytes32 gasLane, // keyHash
        uint256 interval,
        uint256 entranceFee,
        uint32 callbackGasLimit,
        address nftContract,
        string memory jobId
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_oracleId = oracleId;
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_gasLane = gasLane;
        i_interval = interval;
        i_subscriptionId = subscriptionId;
        i_entranceFee = entranceFee;
        s_lastTimeStamp = block.timestamp;
        i_callbackGasLimit = callbackGasLimit;
        s_lotteryState = LotteryState.OPEN;
        i_nftContract = nftContract;
        s_jobId = jobId;
        i_owner = msg.sender;
        setChainlinkToken(chainlinkContract);
    }

    modifier onlyowner() {
      require(msg.sender == i_owner);
      _;
    }

    function enter() public payable {
        require(msg.value >= i_entranceFee, "Min contribution 0.01 MATIC");
        require(s_lotteryState == LotteryState.OPEN, "The lottery isn't open!");

        // generate ramdom number
        uint256 requestId = getRandomNumber();

        // address of player entering lottery
        s_ticketRequests[requestId] = payable(msg.sender);
    }

    // this function is called after a random number is generated
    function enterCallback(uint256 requestId, uint256 randomNumber) private {
        s_players.push(payable(s_ticketRequests[requestId]));
        s_tickets.push(randomNumber);
        s_tokens.push(_tokenIds.current());
        _tokenIds.increment();
        emit PlayerAdded(s_ticketRequests[requestId], randomNumber);
    }

    // this is called once fulfillInflationWei is completed
    function pickWinner() private {
        require(s_lotteryState == LotteryState.CALCULATING_WINNER, "You aren't at that stage yet!");
        uint inflationToday = s_recentYoyInflation/1000000000000000; // wei/e'15 = 00000
        int closestTicket = 100000; // a random high number just to start the comparation
        uint winnerIndex;
        for (uint256 index = 0; index < s_tickets.length; index++) {
            int test = substractAndReturnAbs(int(s_tickets[index]), int(inflationToday));
            if (test < closestTicket) {
                closestTicket = test;
                winnerIndex = index;
            }
        }

        payWinner(winnerIndex);
    }

    function payWinner(uint winnerIndex) private {
        require(s_lotteryState == LotteryState.CALCULATING_WINNER, "You aren't at that stage yet!");

        address payable recentWinner = s_players[winnerIndex];
        // _token721 = IERC721(i_nftContract);
        // address recentWinner = _token721.ownerOf(s_tokens[winnerIndex]);
        // recentWinner.transfer(balance);
        s_lotteryHistory[s_lotteryId].addr = recentWinner;
        s_lotteryHistory[s_lotteryId].amount = address(this).balance;
        s_lotteryId++;

        // pay the winner
        //s_players[winnerIndex].transfer(address(this).balance);
        (bool success, ) = recentWinner.call{value: address(this).balance}("");
        require(success, "Transfer failed");
        
        // reset the state of the contract
        s_players = new address payable[](0);
        s_tickets = new uint256[](0);
        s_tokens = new uint256[](0);
        s_lotteryState = LotteryState.OPEN;

        emit WinnerPicked(recentWinner, s_lotteryId - 1);
    }

    function substractAndReturnAbs(int val1, int val2) private pure returns(int) {
        int result = val1 - val2;
        return result >= 0 ? result : -1*result;
    } 

    function adjustInflationBounds(uint256 upper, uint256 lower) public onlyowner {
        s_inflationUpper = upper;
        s_inflationLower = lower;
    }


    // Keepers Interface
    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        bool isOpen = LotteryState.OPEN == s_lotteryState;
        bool hasPlayers = s_players.length > 0;
        bool hasBalance = address(this).balance > 0;
        upkeepNeeded = (isOpen && hasBalance && hasPlayers);
        return (upkeepNeeded, "0x0"); // can we comment this out?
    }

    // this function is the trigger to select the winner
    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");
        require(upkeepNeeded, "Upkeep not needed");

        s_lotteryState = LotteryState.CALCULATING_WINNER;
        requestInflationWei();
    }

    /**
     * VRFv2 Randomness
     */
    function getRandomNumber() private returns (uint256 requestId) {
        requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        // randomness % (max - min + 1) + min
        uint256 randomNumber = randomWords[0] % (s_inflationUpper - s_inflationLower + 1) + s_inflationLower;
        enterCallback(requestId, randomNumber);
    }

    /**
     * Truflation Index
     */
    function requestInflationWei() internal returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            bytes32(bytes(s_jobId)),
            address(this),
            this.fulfillInflationWei.selector
        );
        req.add("service", "truflation/current");
        req.add("keypath", "yearOverYearInflation");
        req.add("abi", "uint256");
        req.add("multiplier", "1000000000000000000");
        return sendChainlinkRequestTo(i_oracleId, req, FEE_TRUFLATION);
    }

    function fulfillInflationWei(
        bytes32 _requestId,
        bytes memory _inflation
    ) public recordChainlinkFulfillment(_requestId) {
        s_recentYoyInflation = toUint256(_inflation);
        pickWinner();
    }

    function toUint256(bytes memory _bytes) internal pure returns (uint256 value) {
        assembly {
        value := mload(add(_bytes, 0x20))
        }
    }

    /** Getter Functions */
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getMinimumEntry() public view returns (uint) {
        return i_entranceFee;
    }

    function getLotteryId() public view returns (uint) {
        return s_lotteryId;
    }

    function getLotteryState() public view returns (LotteryState) {
        return s_lotteryState;
    }

    function getPlayers() public view returns (address payable[] memory, uint[] memory) {
        return (s_players, s_tickets);
    }

    function getWinnerByLottery(uint lottery) public view returns (address, uint) {
        return (s_lotteryHistory[lottery].addr, s_lotteryHistory[lottery].amount);
    }

    function getLotteryHistory() public view returns (address[] memory, uint[] memory) {
        address[] memory mAddr = new address[](s_lotteryId);
        uint[] memory mAmount = new uint[](s_lotteryId);

        for (uint i = 0; i < s_lotteryId; i++) {
            mAddr[i] = s_lotteryHistory[i+1].addr;
            mAmount[i] = s_lotteryHistory[i+1].amount;
        }

        return (mAddr, mAmount);
    }

}