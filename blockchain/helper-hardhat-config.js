const networkConfig = {
    default: {
        name: "hardhat",
        keepersUpdateInterval: "30",
    },
    31337: {
        name: "localhost",
        subscriptionId: "588",
        gasLane:
            "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        entranceFee: "100000000000000000", // 0.1 ETH
        callbackGasLimit: "500000", // 500,000 gas
    },
    137: {
        name: "polygon",
        subscriptionId: "1559",
        gasLane:
            "0xd729dc84e21ae57ffb6be0053bf2b0668aa2aaf300a2a7b2ddf7dc0bb6e875a8", // 30 gwei
        keepersUpdateInterval: "300", // 5min
        entranceFee: "100000000000000000", // 0.1 ETH
        callbackGasLimit: "100000", // 100,000 gas
        vrfCoordinatorV2: "0xAE975071Be8F8eE67addBC1A82488F1C24858067",
        chainlinkContract: "0xb0897686c545045afc77cf20ec7a532e3120e0f1",
        truflationOracle: "0xA96474C1A08374EFd0F3C9BC7153FDA7A6c8d9e1",
        truflationJobId: "e5b99e0a2f79402998187b11f37c56a6",
        nftContractAddress: "",
    },
    80001: {
        name: "mumbai",
        subscriptionId: "1558",
        gasLane:
            "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f", // 30 gwei
        keepersUpdateInterval: "300", // 5min
        entranceFee: "1000000000000000", // 0.001 ETH
        callbackGasLimit: "1000000", // 1,000,000 gas
        vrfCoordinatorV2: "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed",
        chainlinkContract: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
        truflationOracle: "0x17dED59fCd940F0a40462D52AAcD11493C6D8073",
        truflationJobId: "8b459447262a4ccf8863962e073576d9",
        nftContractAddress: "0x642B09E6947Ee8f3550F82c6FE8816e7f43658b8",
    },
};

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
//const frontEndContractsFile = "../nextjs-smartcontract-lottery-fcc/constants/contractAddresses.json"
//const frontEndAbiFile = "../nextjs-smartcontract-lottery-fcc/constants/abi.json"

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
};
