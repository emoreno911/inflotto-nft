import ConnectButton from "../home/ConnectButton";

const FaucetButton = () => (
    <a
        href="https://faucet.polygon.technology/"
        target="_blank"
        className="mx-1 py-2 px-6 mb-2 md:mb-0 text-center rounded-full whitespace-pre-line font-semibold bg-white text-purple-700 shadow-md"
    >
        Mumbay Faucet
    </a>
);

const Header = () => {
    return (
        <section className="w-full text-white bg-white">
            <div className="container mx-auto flex flex-wrap px-5 py-5 flex-col md:flex-row items-center justify-between">
                <a className="flex title-font font-medium items-center px-2 text-gray-900 md:mb-0">
                    <img
                        className="w-10 h-10 rounded-full object-cover object-center shadow-none"
                        src="/favico.png"
                    />
                    <span className="ml-2 text-4xl whitespace-pre-line font-title text-gray-800">
                        Inflotto
                    </span>
                </a>
                <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col md:flex-row justify-center py-2 md:py-0">
                        <FaucetButton />
                        <ConnectButton />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;
