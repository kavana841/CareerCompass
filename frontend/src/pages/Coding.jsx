import { Link } from "react-router-dom";
function Coding() {
    const topics = [
        {name: "Arrays", icon: "📚", problems:50},
        {name: "Strings", icon: "🔤", problems:40},
        {name: "Linked Lists", icon: "🔗", problems:35},
        {name: "Stacks & Queues", icon: "📦", problems:30},
        {name: "Trees", icon:"🌳", problems:35},
        {name: "Graphs", icon:"📈", problems:30},
        {name: "Dynamic programming", icon:"⚡", problems:25},
        {name: "Recursion", icon:"🔁", problems:20},
      
    ];
    return (
        <div className="coding-page">
            <h1>💻 Coding practice</h1>
            <p>Select a topic and start solving problems.</p>
            <div className="coding-grid">
                {topics.map((topic) => (
                    <Link
            to={`/coding/${topic.name.toLowerCase().replace(/\s+/g, "-")}`}
            key={topic.name}
            className="coding-card"
          >
            <h2>{topic.icon} {topic.name}</h2>
            <p>{topic.problems} Practice Problems</p>
            <button>Start Practice →</button>
          </Link>
        ))}
            </div>
        </div>
    );
}
export default Coding;