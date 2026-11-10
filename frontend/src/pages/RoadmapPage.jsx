import { useNavigate } from "react-router-dom";
import Roadmap from "../components/Roadmap";

function RoadmapPage() {
    const navigate = useNavigate();
    return (
        <main>
            <button onClick={() => navigate("/")}>← Back to Dashboard</button>
            <Roadmap />
        </main>
    );
}
export default RoadmapPage;
