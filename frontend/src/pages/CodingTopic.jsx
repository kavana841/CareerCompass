import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/coding.css";

function CodingTopic() {
  const navigate = useNavigate();
  const { topic } = useParams();

  const topicName = topic
    ? topic
        .split("-")
        .map((word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ")
    : "Coding";

  const [selectedProblem, setSelectedProblem] = useState(0);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");

  const problemBank = {
  arrays: [
  {
    title: "Find the Largest Element",
    difficulty: "Easy",
    description:
      "Given an array of integers, find and print the largest element.",

    input:
      "5\n10 25 7 42 18",

    output:
      "42",
  },

  {
    title: "Find the Second Largest Element",
    difficulty: "Medium",
    description:
      "Given an array of integers, find the second largest element without sorting the array.",

    input:
      "6\n10 25 7 42 18 30",

    output:
      "30",
  },

  {
    title: "Remove Duplicates",
    difficulty: "Hard",
    description:
      "Given an array of integers, remove duplicate elements and print the unique elements.",

    input:
      "7\n1 2 2 3 4 4 5",

    output:
      "1 2 3 4 5",
  },
],
  strings: [
    {
      title: "Reverse a String",
      difficulty: "Easy",
      description:
        "Given a string, reverse it without using a built-in reverse function.",
    },
    {
      title: "Check Palindrome",
      difficulty: "Medium",
      description:
        "Check whether a given string reads the same forward and backward.",
    },
    {
      title: "Count Character Frequency",
      difficulty: "Hard",
      description:
        "Count the frequency of every character present in a given string.",
    },
  ],

  "linked-lists": [
    {
      title: "Traverse a Linked List",
      difficulty: "Easy",
      description:
        "Create a singly linked list and print all its elements.",
    },
    {
      title: "Reverse a Linked List",
      difficulty: "Medium",
      description:
        "Reverse a singly linked list and return the new head.",
    },
    {
      title: "Detect a Cycle",
      difficulty: "Hard",
      description:
        "Determine whether a singly linked list contains a cycle.",
    },
  ],

  "stacks-&-queues": [
    {
      title: "Implement a Stack",
      difficulty: "Easy",
      description:
        "Implement a stack using an array with push and pop operations.",
    },
    {
      title: "Balanced Parentheses",
      difficulty: "Medium",
      description:
        "Check whether the parentheses in a given expression are balanced.",
    },
    {
      title: "Queue Using Two Stacks",
      difficulty: "Hard",
      description:
        "Implement a queue using two stacks.",
    },
  ],

  trees: [
    {
      title: "Tree Traversal",
      difficulty: "Easy",
      description:
        "Implement inorder, preorder, and postorder traversal of a binary tree.",
    },
    {
      title: "Find Tree Height",
      difficulty: "Medium",
      description:
        "Find the height of a given binary tree.",
    },
    {
      title: "Check Binary Search Tree",
      difficulty: "Hard",
      description:
        "Determine whether a given binary tree is a valid binary search tree.",
    },
  ],

  graphs: [
    {
      title: "Breadth First Search",
      difficulty: "Easy",
      description:
        "Implement Breadth First Search (BFS) for a graph.",
    },
    {
      title: "Depth First Search",
      difficulty: "Medium",
      description:
        "Implement Depth First Search (DFS) for a graph.",
    },
    {
      title: "Shortest Path",
      difficulty: "Hard",
      description:
        "Find the shortest path between two vertices in a weighted graph.",
    },
  ],

  "dynamic-programming": [
    {
      title: "Fibonacci Numbers",
      difficulty: "Easy",
      description:
        "Find the nth Fibonacci number using dynamic programming.",
    },
    {
      title: "Climbing Stairs",
      difficulty: "Medium",
      description:
        "Find the number of distinct ways to climb n stairs when you can take one or two steps at a time.",
    },
    {
      title: "0/1 Knapsack",
      difficulty: "Hard",
      description:
        "Solve the classic 0/1 Knapsack problem using dynamic programming.",
    },
  ],

  recursion: [
    {
      title: "Factorial Using Recursion",
      difficulty: "Easy",
      description:
        "Calculate the factorial of a number using recursion.",
    },
    {
      title: "Fibonacci Using Recursion",
      difficulty: "Medium",
      description:
        "Find the nth Fibonacci number using a recursive function.",
    },
    {
      title: "Tower of Hanoi",
      difficulty: "Hard",
      description:
        "Solve the Tower of Hanoi problem using recursion.",
    },
  ],
};

const problems = problemBank[topic] || [
  {
    title: "Problem Not Found",
    difficulty: "Easy",
    description:
      "No problems are available for this topic yet.",
  },
];

  const problem = problems[selectedProblem];

  return (
    <div className="coding-topic-page">

      <div className="coding-topic-header">

        <button onClick={() => navigate("/coding")}>
          ← Back to Coding
        </button>

        <h1>
          💻 {topicName}
        </h1>

        <p>
          Practice {topicName} problems and improve your coding skills.
        </p>

      </div>

      <div className="coding-topic-layout">

        <div className="problem-list">

          <h2>🧩 Problems</h2>

          {problems.map((item, index) => (
            <button
              key={item.title}
              onClick={() => {
                setSelectedProblem(index);
                setCode("");
              }}
              className={
                selectedProblem === index
                  ? "problem-active"
                  : ""
              }
            >
              <strong>
                {index + 1}. {item.title}
              </strong>

              <span>
                {item.difficulty}
              </span>
            </button>
          ))}

        </div>

        <div className="problem-area">

          <h2>{problem.title}</h2>

          <span>
            Difficulty: {problem.difficulty}
          </span>

          <p>
            {problem.description}
          </p>
          <div className="test-case">

  <h3>📥 Example Input</h3>

  <pre>
    {problem.input}
  </pre>

  <h3>📤 Expected Output</h3>

  <pre>
    {problem.output}
  </pre>

</div>
          <div className="test-cases">
            <h3>🧪 Test Cases</h3>
            {problem.testCases?.map((test, index) => (
              <div className= "test-case" key={index}>
                <strong>Test Case {index + 1}</strong>
                <p><b>Input:</b> {test.input}</p>
                <p><b>Expected Output:</b> {test.expected}</p>
                </div>
            ))}
          </div>

         <div className="language-selector">

  <label>Programming Language</label>

  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
  >
    <option value="python">🐍 Python</option>
    <option value="java">☕ Java</option>
    <option value="cpp">💻 C++</option>
    <option value="javascript">⚡ JavaScript</option>
  </select>

</div>

<textarea
  value={code}
  onChange={(e) => setCode(e.target.value)}
  placeholder={`// Write your ${language} solution here...`}
/>

          <div className="code-actions">

  <button disabled title="Code execution is not available yet">
    ▶️ Run Code (Coming Soon)
  </button>

  <button disabled title="Solution checking is not available yet">
    ✅ Submit (Coming Soon)
  </button>

</div>

        </div>

      </div>

    </div>
  );
}

export default CodingTopic;
