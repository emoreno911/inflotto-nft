import React from "react";
import HeroSection from "./HeroSection";
import CountersSection from "./CountersSection";
import HistorySection from "./HistorySection";
import HelpSection from "./HelpSection";
import TicketsSection from "./TicketsSection";

function Home() {
    return (
        <>
            <HeroSection />
            <CountersSection />
            <TicketsSection />
            <HistorySection />
            <HelpSection />
        </>
    );
}

export default Home;
