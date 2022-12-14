import { useEffect } from "react";
import { useMoralis } from "react-moralis";

export default function ConnectButton() {
    const {
        enableWeb3,
        isWeb3Enabled,
        isWeb3EnableLoading,
        account,
        Moralis,
        deactivateWeb3,
    } = useMoralis();

    useEffect(() => {
        if (isWeb3Enabled) return;
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3();
                // enableWeb3({provider: window.localStorage.getItem("connected")}) // add walletconnect
            }
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`);
            if (account == null) {
                window.localStorage.removeItem("connected");
                deactivateWeb3();
                console.log("Null Account found");
            }
        });
    }, []);

    return (
        <div className="flex flex-row">
            {account ? (
                <div className="ml-auto py-2 px-4 rounded-full whitespace-pre-line font-semibold text-white bg-purple-600 shadow-md">
                    Connected to {account.slice(0, 6)}...
                    {account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        // await walletModal.connect()
                        await enableWeb3();
                        // depends on what button they picked
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem(
                                "connected",
                                "injected"
                            );
                            // window.localStorage.setItem("connected", "walletconnect")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                    className="ml-auto py-2 px-4 rounded-full whitespace-pre-line font-semibold text-white bg-purple-600 shadow-md"
                >
                    Connect
                </button>
            )}
        </div>
    );
}
