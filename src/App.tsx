import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Frontend from "./pages/Frontend";
import Backend from "./pages/Backend";
import DevOps from "./pages/DevOps";
import Data from "./pages/Data";
import FullStack from "./pages/FullStack";
import Design from "./pages/Design";
import QualityAssurance from "./pages/QA";
import Mobile from "./pages/iOSAndroid";
import Management from "./pages/Management";
import Junior from "./pages/seniority/Junior";
import Mid from "./pages/seniority/Mid";
import Senior from "./pages/seniority/Senior";
import Trends from "./pages/Trends";
import SkillJobs from "./pages/SkillJobs";
import Skill from "./pages/Skill";
import Search from "./pages/Search";
import ScrollToTop from "./util/scroll";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <Navbar />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                {/* skill */}
                <Route path="/skill/:skill" element={<Skill />} />
                {/* positions */}
                <Route path="/frontend" element={<Frontend />} />
                <Route path="/backend" element={<Backend />} />
                <Route path="/devops" element={<DevOps />} />
                <Route path="/data" element={<Data />} />
                <Route path="/full-stack" element={<FullStack />} />
                <Route path="/design" element={<Design />} />
                <Route
                    path="/quality-assurance"
                    element={<QualityAssurance />}
                />
                <Route path="/mobile" element={<Mobile />} />
                <Route path="/management" element={<Management />} />
                {/* seniority */}
                <Route path="/junior" element={<Junior />} />
                <Route path="/mid" element={<Mid />} />
                <Route path="/senior" element={<Senior />} />
                {/* trends */}
                <Route path="/trends" element={<Trends />} />
                {/* jobs */}
                <Route path="/jobs/:skill" element={<SkillJobs />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
