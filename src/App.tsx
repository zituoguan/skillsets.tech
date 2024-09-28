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

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* positions */}
                <Route path="/frontend" element={<Frontend />} />
                <Route path="/backend" element={<Backend />} />
                <Route path="/devops" element={<DevOps />} />
                <Route path="/data" element={<Data />} />
                <Route path="/full-stack" element={<FullStack />} />
                <Route path="/design" element={<Design />} />
                <Route path="/quality-assurance" element={<QualityAssurance />}
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
        </Router>
    );
}

export default App;
