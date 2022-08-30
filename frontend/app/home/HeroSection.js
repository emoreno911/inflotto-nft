import { useContext } from "react";
import { contractChainId } from "../constants";
import { DataContext } from "../context";

const HeroSection = () => {
    const {
        fn: { handleEnterLottery },
        data: { chainId, inflationToday, isLoading, isFetching },
    } = useContext(DataContext);

    return (
        <section className="w-full bg-white">
            <div className="w-full rounded-xl relative flex flex-col items-center justify-between hero-section">
                <img
                    className="absolute object-cover object-center w-full h-full hero-bg"
                    alt="hero"
                    src="/blockchain-bg.jpg"
                />

                <div className="w-full relative items-center justify-center">
                    <div className="w-full container mx-auto md:px-24 px-2 text-center py-16 flex flex-col justify-center items-center">
                        <div className="w-full flex flex-row justify-center">
                            <p className="bg-yellow-50 w-auto block my-8 leading-relaxed whitespace-pre-line text-black font-semibold px-4 py-2 rounded-full text-lg">
                                TODAY'S TRUFLATION INDEX:{" "}
                                {inflationToday.toFixed(3)} %
                            </p>
                        </div>
                        <h2 className="w-full title-font mb-4 text-white whitespace-pre-line text-6xl font-semibold">
                            The Lottery of Inflation
                        </h2>
                        <p className="w-full mb-8 leading-relaxed whitespace-pre-line text-white text-xl font-normal">
                            Buy tickets and wait till{" "}
                            <span className="font-bold">Sunday</span> for the
                            draw, the closest number to the Year Over Year
                            Truflation index of that day will be the winner.
                        </p>
                        <div className="w-full text-center my-8">
                            {chainId === contractChainId && (
                                <button
                                    disabled={isLoading || isFetching}
                                    onClick={() => handleEnterLottery()}
                                    className="ml-1 font-semibold px-6 py-4 rounded-xl outline-none focus:outline-none m-2 uppercase shadow hover:shadow-lg whitespace-pre-line text-white bg-purple-700 text-2xl"
                                >
                                    {isLoading || isFetching ? (
                                        <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                                    ) : (
                                        "Buy a ticket"
                                    )}
                                </button>
                            )}
                            {chainId !== contractChainId && (
                                <div className="text-xl text-white font-semibold text-center py-6">
                                    Please connect to a Mumbai chain
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
