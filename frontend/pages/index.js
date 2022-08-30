import { NotificationProvider } from "web3uikit";
import Home from "../app/home";
import Layout from "../app/layout";
import DataContextProvider from "../app/context";

const Index = () => {
    const metadata = {
        title: "Inflotto",
        description: "The Lottery of Inflation",
        image: "http://...",
        url: `https://inflotto.vercel.app`,
        sitename: "inflotto",
    };

    return (
        <Layout metadata={null}>
            <NotificationProvider>
                <DataContextProvider>
                    <Home />
                </DataContextProvider>
            </NotificationProvider>
        </Layout>
    );
};

export default Index;
