
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./style.css";

function App() {

    const matches = [
        {
            matchNo: 1,
            teams: "RCB vs CSK",
            date: "10 April 2026",
            venue: "Bengaluru",
            general: 800,
            premium: 2000,
            vip: 5000
        },
        {
            matchNo: 2,
            teams: "MI vs KKR",
            date: "12 April 2026",
            venue: "Mumbai",
            general: 1000,
            premium: 2500,
            vip: 6000
        },
        {
            matchNo: 3,
            teams: "CSK vs RR",
            date: "14 April 2026",
            venue: "Chennai",
            general: 700,
            premium: 1800,
            vip: 4500
        }
    ];

    return (
        <div>
            <Navbar />

            <Hero />

            <section className="container" id="matches">
                <h2>IPL 2026 Match Schedule</h2>

                <div className="match-list">

                    {matches.map((match) => (
                        <MatchCard
                            key={match.matchNo}
                            matchNo={match.matchNo}
                            teams={match.teams}
                            date={match.date}
                            venue={match.venue}
                            general={match.general}
                            premium={match.premium}
                            vip={match.vip}
                        />
                    ))}

                </div>
            </section>
        </div>
    );
}
export default App;