import axios from "axios";
import { useState, useContext } from "react";
import { useMoralis } from "react-moralis";
import { DataContext } from "../context";
import { nftContractAddress } from "../constants/index";

const TicketsSection = () => {
    const { account } = useMoralis();
    const {
        data: { nftsTickets },
    } = useContext(DataContext);

    const openseaBase = "https://testnets.opensea.io/assets/mumbai/" + nftContractAddress;

    const handleClick = async () => {
        const data = {
            id: 32,
            draw: 1,
            index: "9.439",
            owner: "0x7893e07983E424D5A5C2144956B69646F81522dc"
        };
        const response = await fetch("/api/mint", {
            method: "post",
            body: JSON.stringify(data),
        });
        const rs = await response.json();
        console.log(rs);
    };

    // if (nftsTickets.length < 1)
    //     return (
    //         <section className="w-full md:py-8 bg-gray-100">
    //             <div className="container mx-auto px-8 xl:px-16">
    //                 <div className="container px-5 py-2 mx-auto lg:px-32">
    //                     <h3 className="whitespace-pre-line text-5xl text-purple-700 leading-normal tracking-normal font-bold mb-4 py-2 text-center md:text-left">
    //                         Your Tickets
    //                     </h3>
    //                     <div className="flex flex-col items-center">
    //                         <img
    //                             src="/empty-state-t.png"
    //                             alt="empty-state"
    //                             className=""
    //                         />
    //                         <div className="text-xl text-gray-400">
    //                             You haven't bought a ticket for this draw yet!
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </section>
    //     );

    return (
        <section className="w-full md:py-8 bg-gray-100">
            <div className="container mx-auto px-8 xl:px-16">
                <div className="container px-5 py-2 mx-auto lg:px-32">
                    <h3 className="whitespace-pre-line text-5xl text-purple-700 leading-normal tracking-normal font-bold mb-4 py-2">
                        Your Tickets
                    </h3>
                    <div className="flex flex-wrap -m-1 md:-m-2">
                        {nftsTickets.map((ticket, i) => (
                            <div
                                key={i}
                                className="flex flex-wrap w-1/2 md:w-1/3 xl:w-1/4 mb-8"
                            >
                                <div className="w-full p-1 md:p-2">
                                    <img
                                        src={ticket.image}
                                        alt={ticket.name}
                                        className="block object-cover object-center w-full h-full rounded-lg"
                                    />
                                    <a
                                        href={
                                            openseaBase +
                                            "/" +
                                            parseInt(ticket.id)
                                        }
                                        target="_blank"
                                    >
                                        <span className="block text-center font-semibold">
                                            {ticket.name}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pt-12 hidden">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleClick()}
                    >
                        MINT
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TicketsSection;
