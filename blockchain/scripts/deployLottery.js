const {
    getNamedAccounts,
    deployments,
    network,
    run,
    ethers,
} = require("hardhat");
const {
    networkConfig,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");
const { verify } = require("./verify");

const chainId = 80001;
const _args = [
    networkConfig[chainId]["chainlinkContract"],
    networkConfig[chainId]["truflationOracle"],
    networkConfig[chainId]["vrfCoordinatorV2"],
    networkConfig[chainId]["subscriptionId"],
    networkConfig[chainId]["gasLane"],
    networkConfig[chainId]["entranceFee"],
    networkConfig[chainId]["callbackGasLimit"],
    networkConfig[chainId]["nftContractAddress"],
    networkConfig[chainId]["truflationJobId"],
];

const main = async () => {
    const waitBlockConfirmations = VERIFICATION_BLOCK_CONFIRMATIONS;

    console.log("----------------------------------------------------");
    const contractFactory = await hre.ethers.getContractFactory("InflottoV2");
    const contract = await contractFactory.deploy(
        _args[0],
        _args[1],
        _args[2],
        _args[3],
        _args[4],
        _args[5],
        _args[6],
        _args[7],
        _args[8]
    );
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);

    console.log("Deploy Done!!!");
    console.log("----------------------------------------------------");
    process.exit(0);
};

const verifyme = async () => {
    const contract = { address: "0x5F4F562C7698f476972079b2e1F05aeA3b1bbf4e" };
    console.log("Contract deployed to:", contract.address);

    // Verify the deployment
    if (process.env.POLYGONSCAN_API_KEY) {
        console.log("Verifying...");
        await verify(contract.address, _args);
    }

    console.log("Verification Done!!!");
    console.log("----------------------------------------------------");
    process.exit(0);
};

//main();
verifyme();
