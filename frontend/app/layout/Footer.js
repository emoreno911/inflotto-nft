const Footer = () => {
    return (
        <section className="w-full text-gray-700 shadow bg-white">
            <div className="container mx-auto flex flex-wrap px-5 py-5 flex-col items-center justify-center">
                <a className="flex flex-col order-first lg:order-none lg:w-2/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center px-2 mb-4 md:mb-0">
                    <span className="ml-3 text-4xl whitespace-pre-line font-title text-gray-800">
                        Inflotto
                    </span>
                </a>
                <small className="block my-2">
                    Powered by{" "}
                    <a
                        className="text-purple-700"
                        href="https://truflation.com/"
                        target="_blank"
                    >
                        Truflation Index
                    </a>
                </small>
                <small className="block text-gray-500">
                    dApp made by{" "}
                    <a
                        className="text-purple-700"
                        href="https://twitter.com/emoreno911"
                        target="_blank"
                    >
                        @emonreno911
                    </a>{" "}
                    with Chainlink technology
                </small>
            </div>
        </section>
    );
};

export default Footer;
