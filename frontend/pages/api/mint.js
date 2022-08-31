const ethers = require("ethers");

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider(
    process.env.ALCHEMY_NETWORK_PROVIDER,
    process.env.ALCHEMY_APIKEY
);

// Create a signer
const privateKey = process.env.OPERATOR_PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// Get contract ABI and address
const abi = require("../../app/constants/abiNft.json");
const contractAddress = process.env.CONTRACT_ADDRESS_NFT;

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer);

const mint = async (req, res) => {
    try {
        const { id, draw, index, owner } = JSON.parse(req.body);

        let nftTxn = await myNftContract.mint(id, draw, index, owner);
        await nftTxn.wait();
        console.log(
            `NFT Minted! Check it out at: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`
        );

        res.status(200).json({ success: true, tx: nftTxn.hash });
    } catch (e) {
        console.error(e);
        res.status(200).json({ success: false });
    }
};

export default mint;
