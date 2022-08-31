import { useContext } from "react";
import { useMoralis } from "react-moralis";
import { DataContext } from "../context";
import { weiToMatic } from "../utils";
import { lotteryContractAddress, contractChainId } from "../constants/index";

const HistorySection = () => {
    const { account } = useMoralis();
    const {
        data: { chainId, players, lotteryHistory },
    } = useContext(DataContext);

    if (chainId !== contractChainId)
        return (
            <div className="text-2xl text-gray-400 bg-gray-100 text-center py-6">
                Please connect to a Mumbai chain
            </div>
        );

    const WinnersHistory = () => {
        if (lotteryHistory.length < 1)
            return (
                <div className="text-lg text-gray-400 mb-5">
                    History is about to start!
                </div>
            );

        return (
            <div className="my-8 leading-relaxed whitespace-pre-line text-black text-xl">
                <div className="table w-full">
                    {lotteryHistory[0].map((item, i) => (
                        <div
                            className="flex justify-between w-full shadow-md mb-5 py-5 px-5 bg-white rounded-md"
                            key={i}
                        >
                            <div className="hidden lg:block font-semibold">
                                <span>DRAW {i + 1}</span>
                            </div>
                            <div className="block lg:text-right xl:text-center">
                                <span className="font-semibold lg:hidden">
                                    DRAW {i + 1}
                                </span>
                                <div className="truncate">{item}</div>
                                <small className="xl:hidden text-gray-500">
                                    {weiToMatic(
                                        lotteryHistory[1][i].toNumber()
                                    )}{" "}
                                    MATIC
                                </small>
                            </div>
                            <div className="hidden xl:block text-right">
                                <small className="text-gray-500 ml-2">
                                    {weiToMatic(
                                        lotteryHistory[1][i].toNumber()
                                    )}{" "}
                                    MATIC
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section className="w-full md:py-8 bg-gray-100">
            <div className="container mx-auto flex px-8 md:px-16 md:flex-row flex-col-reverse">
                <div className="container px-5 py-2 mx-auto lg:px-32 md:text-left mb-16 md:mb-0 items-center text-center">
                    <div className="w-full flex flex-col md:flex-row"></div>
                    <div className="w-full mb-4 py-2">
                        <h3 className="whitespace-pre-line text-5xl text-purple-700 leading-normal tracking-normal font-bold">
                            Lottery History
                        </h3>
                    </div>
                    <WinnersHistory />
                    <div className="flex flex-col md:flex-row justify-center md:justify-start py-4">
                        <a
                            className="mx-1 font-bold px-6 py-4 rounded-xl outline-none focus:outline-none mr-1 mb-1 uppercase text-sm whitespace-pre-line text-white bg-purple-700 shadow-md"
                            target="_blank"
                            href={`https://mumbai.polygonscan.com/address/${lotteryContractAddress}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 inline mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                />
                            </svg>
                            <span className="align-middle">
                                Check in Explorer
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HistorySection;
