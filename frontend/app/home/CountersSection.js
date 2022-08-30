import { useContext } from "react";
import { DataContext } from "../context";
import { weiToMatic } from "../utils";
import { lotteryStateEnum } from "../constants";

const CountersSection = () => {
    const {
        fn: { enterLottery },
        data: { currentPool, numberOfTickets, lotteryState, lotteryId },
    } = useContext(DataContext);

    return (
        <section className="w-full bg-gray-100">
            <div className="w-full sm:py-8 md:px-16">
                <div className="container mx-auto flex p-5 md:flex-row flex-col items-center justify-center bg-white sm:rounded-xl sm:shadow-md">
                    <div className="w-full flex flex-col md:flex-row md:w-1/3 px-3 md:px-6 text-left items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-24 h-24 object-center"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#7E22CE"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <div className="flex flex-col flex-grow text-center md:text-left">
                            <h3 className="px-3 font-bold whitespace-pre-line bg-transparent text-purple-700 text-3xl leading-normal">
                                WEEK #{lotteryId}
                            </h3>
                            <div className="p-3 md:py-0">
                                <p className="whitespace-pre-line font-sans text-black text-xl font-semibold leading-normal">
                                    Lottery {lotteryStateEnum[lotteryState]}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row md:w-1/3 px-3 md:px-6 text-left items-center justify-center">
                        <h3 className="text-6xl whitespace-pre-line text-purple-700 font-bold">
                            {weiToMatic(currentPool)}
                        </h3>
                        <div className="pl-4 text-center md:text-left flex flex-col-reverse md:flex-col">
                            <h3 className="font-semibold mb-2 text-xl whitespace-pre-line text-black">
                                Current Pool
                            </h3>
                            <p className="md:leading-4 whitespace-pre-line text-3xl text-purple-700 font-semibold">
                                MATIC
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row md:w-1/3 px-3 md:px-6 text-left items-center justify-center">
                        <h3 className="whitespace-pre-line text-purple-700 text-7xl font-bold">
                            {numberOfTickets}
                        </h3>
                        <div className="pl-4 text-center md:text-left flex flex-col-reverse md:flex-col">
                            <h3 className="mb-2 text-xl whitespace-pre-line text-black font-semibold">
                                Players Entry
                            </h3>
                            <p className="md:leading-4 whitespace-pre-line text-purple-700 text-3xl font-semibold">
                                TICKETS
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CountersSection;
