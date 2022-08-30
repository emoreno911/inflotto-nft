import React from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
//import abi from "../abi";
import { abi } from "../constants";

const History = () => {
    // 0xdAC17F958D2ee523a2206206994597C13D831ec7 = contract address of USDT
    const { native } = useMoralisWeb3Api();

    const ABI = abi; // Add ABI of 0xdAC17F958D2ee523a2206206994597C13D831ec7

    const options = {
        chain: "mumbai",
        address: "0x3a67749f65B3De5bdD7550D88456A47dF3C2fd55",
        function_name: "enter",
        abi: ABI,
        params: {},
    };

    const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
        native.runContractFunction,
        { ...options }
    );

    return (
        // Use your custom error component to show errors
        <div style={{ height: "20vh", overflow: "auto" }}>
            <div>
                {error && <>{JSON.stringify(error)}</>}
                <button
                    onClick={() => {
                        fetch({ params: options });
                    }}
                >
                    Fetch data
                </button>
                {data && <pre>{JSON.stringify(data)}</pre>}
            </div>
        </div>
    );
};

export default History;
