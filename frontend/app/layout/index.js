import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

function Layout({
    children,
    metadata = null,
    title = "Inflotto - The Lottery of Inflation",
}) {
    return (
        <div className="root">
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta name="theme-color" content="#171722" />
                <link rel="shortcut icon" href="/favico.png" />

                {metadata !== null && (
                    <React.Fragment>
                        <meta
                            name="description"
                            content={metadata.description}
                        />
                        <meta property="og:type" content="website" />
                        <meta property="og:title" content={metadata.title} />
                        <meta
                            property="og:description"
                            content={metadata.description}
                        />
                        <meta property="og:image" content={metadata.image} />
                        <meta property="og:url" content={metadata.url} />
                        <meta
                            property="og:site_name"
                            content={metadata.sitename}
                        />
                        <meta name="twitter:title" content={metadata.title} />
                        <meta
                            name="twitter:description"
                            content={metadata.description}
                        />
                        <meta name="twitter:image" content={metadata.image} />
                    </React.Fragment>
                )}

                <title>{title}</title>
            </Head>

            <section className="m-0 p-0 stretchToScreen bg-white">
                <Header />
                {children}
                <Footer />
            </section>
        </div>
    );
}

export default Layout;
