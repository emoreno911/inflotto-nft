import _abiLottery from "./abiLottery.json";
import _abiNft from "./abiNft.json";

export const contractChainId = parseInt(process.env.NEXT_PUBLIC_CHAINID);

export const lotteryContractAddress = process.env.NEXT_PUBLIC_CONTRACT_LOTTERY;

export const nftContractAddress = process.env.NEXT_PUBLIC_CONTRACT_NFT;

export const lotteryStateEnum = {
    0: "OPEN",
    1: "CALCULATING WINNER",
};

export const abiLottery = _abiLottery;
export const abiNft = _abiNft;
