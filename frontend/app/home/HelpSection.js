import { useContext } from "react";
import { DataContext } from "../context";
import { weiToMatic } from "../utils";

const HelpSection = () => {
    const {
        data: { entranceFee },
    } = useContext(DataContext);

    return (
        <section className="w-full bg-gray-100">
            <div className="w-full md:px-16 md:py-6">
                <div className="relative container mx-auto flex md:flex-row flex-col justify-between items-center sm:rounded-xl shadow-lg overflow-hidden bg-purple-700 py-6 md:py-0">
                    <div className="w-full md:w-6/12 flex flex-col p-4 md:px-16">
                        <h3 className="w-full title-font md:text-3xl text-2xl mb-4 font-medium text-center md:text-left whitespace-pre-line text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 inline mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="align-middle">HOW IT WOKS?</span>
                        </h3>
                    </div>

                    <div className="w-full flex flex-col md:w-6/12 p-4 md:px-16 items-center justify-center">
                        <ol className="md:list-decimal w-full mb-2 leading-relaxed text-center md:text-left whitespace-pre-line text-white text-xl">
                            <li>
                                Buy tickets with {weiToMatic(entranceFee)} MATIC
                                on Mumbay Testnet.
                            </li>
                            <li>Wait for Draw on Sunday 12pm GMT.</li>
                            <li>
                                The ticket with the closest number to that day's
                                inflation rate will win the pool.
                            </li>
                            <li>
                                If there're two winner tickets with the same
                                index the one who was generated first will
                                prevail.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HelpSection;
