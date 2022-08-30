import { useContext } from "react";
import { useMoralis } from "react-moralis";
import { DataContext } from "../context";
import { weiToMatic } from "../utils";
import { contractAddress, contractChainId } from "../constants";

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
            return <div className="text-xl text-gray-400">No Items Here!</div>;

        return (
            <div className="my-8 leading-relaxed whitespace-pre-line text-black text-xl">
                {lotteryHistory[0].map((item, i) => (
                    <div key={i}>
                        <p className="font-semibold">
                            <span>Week {i + 1}</span>
                            <small className="text-gray-500 ml-2">
                                ({weiToMatic(lotteryHistory[1][i].toNumber())}{" "}
                                MATIC)
                            </small>
                        </p>
                        <p className="truncate mb-3">{item}</p>
                    </div>
                ))}
            </div>
        );
    };

    const MyTickets = () => {
        if (players.length < 1) return <div></div>;

        const [_players, tickets] = players;
        let myTickets = [];
        tickets.forEach((t, i) => {
            if (_players[i].toLowerCase() == account.toLowerCase())
                myTickets.push(t);
        });

        if (myTickets.length < 1)
            return <div className="text-xl text-gray-400">No Items Here!</div>;

        return (
            <ul>
                {myTickets.map((ticket, i) => (
                    <div
                        key={i}
                        className="text-white text-center bg-gray-800 py-3 my-3 rounded-md"
                    >
                        {ticket.toNumber() / 1000}
                    </div>
                ))}
            </ul>
        );
    };

    return (
        <section className="w-full md:py-8 bg-gray-100">
            <div className="container mx-auto flex px-8 md:px-16 md:flex-row flex-col-reverse">
                <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-3 md:text-left mb-16 md:mb-0 items-center text-center">
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
                            href={`https://mumbai.polygonscan.com/address/${contractAddress}`}
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
                <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 w-5/6 text-center md:text-left px-4 md:px-8">
                    <div className="w-full">
                        <h3 className="whitespace-pre-line text-5xl text-purple-700 leading-normal tracking-normal font-bold mb-4 py-2">
                            Your Tickets
                        </h3>
                        <MyTickets />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HistorySection;
