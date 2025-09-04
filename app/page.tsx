"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Download,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  X,
  Terminal,
  SlidersHorizontal,
  FileText,
  FolderKanban,
  AtSign,
  Award,
  GraduationCap,
  Briefcase,
  Check,
} from "lucide-react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import SystemFooter from "./components/SystemFooter";
import LiveHeader from "./components/LiveHeader";

export default function Portfolio() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");

    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [showGraphModal, setShowGraphModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [currentScannerImage, setCurrentScannerImage] = useState("/1.jpg");
  const scannerImageCount = 9;

  const [activeContact, setActiveContact] = useState("email");

  useEffect(() => {
    if (showGraphModal || showScannerModal) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showGraphModal, showScannerModal]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setSubmitStatus("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    const googleFormData = new FormData();
    googleFormData.append("entry.816679585", formData.name);
    googleFormData.append("entry.1364646092", formData.email);
    googleFormData.append("entry.1898981440", formData.subject);
    googleFormData.append("entry.326277647", formData.message);

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSemzj8IouWrZiK7jRoYq0R8Bpy6oVeS-DGQm3C10v0XfgjzGQ/formResponse",
        {
          method: "POST",
          body: googleFormData,
          mode: "no-cors",
        }
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("success");
    }

    setIsSubmitting(false);
  };

  const InteractiveModelDiagram = () => {
    const initialNodes = [
      {
        id: "text_tokens",
        position: { x: 50, y: 50 },
        data: { label: "Text Tokens (Len 60)" },
        type: "input",
        style: { backgroundColor: "#60a5fa", color: "black" },
      },
      {
        id: "delta_feats",
        position: { x: 50, y: 150 },
        data: { label: "Delta Feats (Dim 2)" },
        type: "input",
        style: { backgroundColor: "#60a5fa", color: "black" },
      },
      {
        id: "embedding",
        position: { x: 250, y: 50 },
        data: { label: "Embedding (300D)" },
        style: { backgroundColor: "#34d399", color: "black" },
      },
      {
        id: "text_mha",
        position: { x: 250, y: 150 },
        data: { label: "MHA (4H) + AddNorm" },
        style: { backgroundColor: "#34d399", color: "black" },
      },
      {
        id: "global_pool",
        position: { x: 250, y: 250 },
        data: { label: "Global Pool" },
        style: { backgroundColor: "#34d399", color: "black" },
      },
      {
        id: "text_add",
        position: { x: 250, y: 350 },
        data: { label: "+" },
        style: { backgroundColor: "#f59e0b", color: "black" },
      },
      {
        id: "text_dense",
        position: { x: 250, y: 450 },
        data: { label: "Dropout + Dense (300D)" },
        style: { backgroundColor: "#f59e0b", color: "black" },
      },
      {
        id: "dense_16d",
        position: { x: 550, y: 50 },
        data: { label: "Dense (16D)" },
        style: { backgroundColor: "#34d399", color: "black" },
      },
      {
        id: "concat",
        position: { x: 550, y: 150 },
        data: { label: "+" },
        style: { backgroundColor: "#f59e0b", color: "black" },
      },
      {
        id: "dense_450d",
        position: { x: 550, y: 250 },
        data: { label: "Dense (450D) + Drop" },
        style: { backgroundColor: "#34d399", color: "black" },
      },
      {
        id: "reason_mha",
        position: { x: 550, y: 380 },
        data: { label: "MHA (4H, Reason)" },
        style: { backgroundColor: "#34d399", color: "black" },
      },
      {
        id: "dropout",
        position: { x: 550, y: 510 },
        data: { label: "Dropout (0.4)" },
        style: { backgroundColor: "#f59e0b", color: "black" },
      },
      {
        id: "output",
        position: { x: 550, y: 610 },
        data: { label: "Output (Sigmoid)" },
        type: "output",
        style: { backgroundColor: "#f87171", color: "white" },
      },
      {
        id: "node_feats",
        position: { x: 850, y: 50 },
        data: { label: "Node Feats (X: 7x1)" },
        type: "input",
        style: { backgroundColor: "#60a5fa", color: "black" },
      },
      {
        id: "adj_matrix",
        position: { x: 850, y: 120 },
        data: { label: "Adj. Matrix (A: 7x7)" },
        type: "input",
        style: { backgroundColor: "#60a5fa", color: "black" },
      },
      {
        id: "node_mask",
        position: { x: 850, y: 190 },
        data: { label: "Node Mask (M: 7)" },
        type: "input",
        style: { backgroundColor: "#60a5fa", color: "black" },
      },
      {
        id: "mask_nodes",
        position: { x: 850, y: 280 },
        data: { label: "Mask Nodes" },
        style: { backgroundColor: "#f59e0b", color: "black" },
      },
      {
        id: "gcn1",
        position: { x: 850, y: 350 },
        data: { label: "GCN1 (64D)" },
        style: { backgroundColor: "#34d399", color: "black" },
      },
      {
        id: "gcn2",
        position: { x: 850, y: 420 },
        data: { label: "GCN2 (64D)" },
        style: { backgroundColor: "#34d399", color: "black" },
      },
      {
        id: "gcn3",
        position: { x: 850, y: 490 },
        data: { label: "GCN3 (32D)" },
        style: { backgroundColor: "#34d399", color: "black" },
      },
      {
        id: "masked_pool",
        position: { x: 850, y: 560 },
        data: { label: "Masked Pool" },
        style: { backgroundColor: "#34d399", color: "black" },
      },
      {
        id: "graph_dense",
        position: { x: 850, y: 630 },
        data: { label: "Dropout + Dense (150D)" },
        style: { backgroundColor: "#f59e0b", color: "black" },
      },
    ];

    const initialEdges = [
      { id: "e1", source: "text_tokens", target: "embedding", animated: true },
      { id: "e2", source: "embedding", target: "text_mha", animated: true },
      { id: "e3", source: "text_mha", target: "global_pool", animated: true },
      { id: "e4", source: "global_pool", target: "text_add", animated: true },
      { id: "e5", source: "delta_feats", target: "text_add", animated: true },
      { id: "e6", source: "text_add", target: "text_dense", animated: true },
      { id: "e7", source: "text_tokens", target: "dense_16d", animated: true },
      { id: "e8", source: "delta_feats", target: "dense_16d", animated: true },
      { id: "e9", source: "dense_16d", target: "concat", animated: true },
      { id: "e10", source: "text_mha", target: "concat", animated: true },
      { id: "e11", source: "concat", target: "dense_450d", animated: true },
      { id: "e12", source: "dense_450d", target: "reason_mha", animated: true },
      { id: "e13", source: "text_dense", target: "reason_mha", animated: true },
      {
        id: "e14",
        source: "graph_dense",
        target: "reason_mha",
        animated: true,
      },
      { id: "e15", source: "reason_mha", target: "dropout", animated: true },
      { id: "e16", source: "dropout", target: "output", animated: true },
      { id: "e17", source: "node_feats", target: "mask_nodes", animated: true },
      { id: "e18", source: "adj_matrix", target: "mask_nodes", animated: true },
      { id: "e19", source: "node_mask", target: "mask_nodes", animated: true },
      { id: "e20", source: "mask_nodes", target: "gcn1", animated: true },
      { id: "e21", source: "gcn1", target: "gcn2", animated: true },
      { id: "e22", source: "gcn2", target: "gcn3", animated: true },
      { id: "e23", source: "gcn3", target: "masked_pool", animated: true },
      {
        id: "e24",
        source: "masked_pool",
        target: "graph_dense",
        animated: true,
      },
    ];

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
      (params: Connection) => setEdges((eds) => addEdge(params, eds)),
      [setEdges]
    );

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background color="#4b5563" />
          <Controls />
        </ReactFlow>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono ">
      <header className="border-b-4 border-green-400 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <LiveHeader />
          <nav className="flex flex-col sm:flex-row gap-3 md:gap-6">
            <a
              href="#about"
              onClick={handleNavClick}
              className="border-2 border-white px-3 py-2 md:px-4 md:py-2 hover:bg-white hover:text-black transition-none text-center text-sm md:text-base "
            >
              [ABOUT]
            </a>
            <a
              href="#projects"
              onClick={handleNavClick}
              className="border-2 border-white px-3 py-2 md:px-4 md:py-2 hover:bg-white hover:text-black transition-none text-center text-sm md:text-base "
            >
              [PROJECTS]
            </a>
            <a
              href="#resume"
              onClick={handleNavClick}
              className="border-2 border-white px-3 py-2 md:px-4 md:py-2 hover:bg-white hover:text-black transition-none text-center text-sm md:text-base "
            >
              [RESUME]
            </a>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="border-2 border-white px-3 py-2 md:px-4 md:py-2 hover:bg-white hover:text-black transition-none text-center text-sm md:text-base "
            >
              [CONTACT]
            </a>
          </nav>
        </div>
      </header>

      <section id="about" className="border-b-4 border-green-400 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-white pb-2 flex items-center gap-3 ">
            <FileText className="text-green-400 " size={28} />
            ABOUT_ME.TXT
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="border-2 border-white p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-green-400 ">
                DESCRIPTION:
              </h3>
              <p className="mb-4 leading-relaxed text-sm md:text-base ">
                Final year Computer Science student at IIIT-Delhi with hands-on
                experience building production systems that solve real problems.
                From secure research portals to AI-powered chatbots, I focus on
                creating applications that work reliably in the real world.
              </p>
              <p className="mb-4 leading-relaxed text-sm md:text-base ">
                Currently leading development projects including the OTMT
                platform ecosystem and advanced ML research in deception
                detection using Transformers and Graph Neural Networks. Also
                mentoring students as a Teaching Assistant at EPICQUEST
                LEARNING, designing curriculum and teaching app development
                fundamentals.
              </p>
              <h3 className="text-lg md:text-xl font-bold mb-4 text-green-400 mt-6 ">
                PHILOSOPHY:
              </h3>
              <p className="leading-relaxed text-sm md:text-base ">
                "The best code is code that doesn't need to exist. The second
                best is code that's so simple it obviously has no bugs."
              </p>
            </div>
            <div className="border-2 border-white p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-green-400 ">
                SKILLS.JSON:
              </h3>
              <pre className="text-xs md:text-sm leading-relaxed overflow-x-auto ">
                {`{
  "languages": [
    "Python", "JavaScript", "Java", 
    "C++", "Kotlin", "SQL"
  ],
  "frameworks": [
    "React.js", "Node.js", "Express.js",
    "FastAPI", "TensorFlow", "PyTorch"
  ],
  "databases": [
    "MongoDB", "MySQL", "Firebase"
  ],
  "tools": [
    "Docker", "Git/GitHub", "Nginx", 
    "PM2", "VS Code", "Google Colab"
  ],
  "mobile": [
    "Jetpack Compose", "Android", "JavaFX"
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section
        id="core-competencies"
        className="border-b-4 border-green-400 p-4 md:p-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-white pb-2 flex items-center gap-3 ">
            <GraduationCap className="text-green-400 " size={28} />
            CORE_COMPETENCIES.LOG
          </h2>
          <div className="border-2 border-white p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-green-400 ">
              RELEVANT_COURSEWORK:
            </h3>
            <p className="text-sm md:text-base leading-relaxed ">
              Key academic subjects at IIIT-Delhi that have provided a strong
              theoretical foundation for my practical work in software
              development and AI.
            </p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm md:text-base ">
              <div className="p-2 bg-gray-800 border border-gray-600">
                Machine Learning & NLP
              </div>
              <div className="p-2 bg-gray-800 border border-gray-600">
                Data Structures & Algorithms
              </div>
              <div className="p-2 bg-gray-800 border border-gray-600">
                Operating Systems
              </div>
              <div className="p-2 bg-gray-800 border border-gray-600">
                Computer Networks
              </div>
              <div className="p-2 bg-gray-800 border border-gray-600">
                Database Management Systems
              </div>
              <div className="p-2 bg-gray-800 border border-gray-600">
                Artificial Intelligence
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="coding" className="border-b-4 border-green-400 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-white pb-2 flex items-center gap-3 ">
            <Terminal className="text-green-400" size={28} />
            PROBLEM_SOLVING.LOG
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="border-2 border-white p-4 md:p-6 space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-green-400 ">
                  LEETCODE_PROFILE:
                </h3>
                <p className="text-sm md:text-base mt-2 mb-3 ">
                  Actively solving problems to sharpen algorithmic skills.
                  <br />
                  <span className="text-white font-bold">150+</span> Problems
                  Solved.
                </p>
                <a
                  href="https://leetcode.com/u/devan1shX/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white px-3 py-2 hover:bg-white hover:text-black flex items-center gap-2 justify-center sm:inline-flex"
                >
                  <ExternalLink size={16} />
                  <span>VIEW_PROFILE</span>
                </a>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-green-400 ">
                  GEEKSFORGEEKS_PROFILE:
                </h3>
                <p className="text-sm md:text-base mt-2 mb-3 ">
                  Practicing diverse data structures and core concepts.
                  <br />
                  <span className="text-white font-bold ">100+</span> Problems
                  Solved.
                </p>
                <a
                  href="https://www.geeksforgeeks.org/user/devan1shx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white px-3 py-2 hover:bg-white hover:text-black flex items-center gap-2 justify-center sm:inline-flex"
                >
                  <ExternalLink size={16} />
                  <span>VIEW_PROFILE</span>
                </a>
              </div>
            </div>

            <div className="border-2 border-white p-4 md:p-6 ">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-green-400">
                STRENGTHS.CFG:
              </h3>
              <pre className="text-xs md:text-sm leading-relaxed overflow-x-auto">
                {`# Key areas of expertise in algorithms and data structures

[preferred_topics]
- Dynamic Programming
- Graph Theory (DFS, BFS, Dijkstra)
- Trees & Advanced Data Structures
- Two Pointers & Sliding Window
- Bit Manipulation

[approach]
1. ANALYZE_CONSTRAINTS
2. VISUALIZE_PROBLEM
3. IMPLEMENT_BRUTEFORCE (if needed)
4. OPTIMIZE_SOLUTION
5. TEST_EDGE_CASES`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="border-b-4 border-green-400 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 border-b-2 border-green-400 pb-2 flex items-center gap-3 animate-pulse-light">
            <Briefcase className="text-green-400" size={28} />
            PROJECTS.DIR
          </h2>
          <div className="space-y-12">
            <div className="relative border-2 border-green-500/50 bg-gray-950 shadow-neon-green transition-all duration-300 hover:border-green-400 hover:shadow-neon-green-strong">
              <div className="p-3 bg-gradient-to-r from-gray-800 to-black border-b-2 border-green-600 flex justify-between items-center animate-bg-pulse">
                <h3 className="font-bold text-lg md:text-xl text-green-300 tracking-wide">
                  [PROJECT PROFILE: Document Scanner App]
                </h3>
                <span className="text-gray-500 text-sm italic hidden sm:block">
                  Log_ID: <span className="text-white">DS_24_001</span>
                </span>
              </div>
              <div className="p-2 bg-black/50 flex flex-wrap gap-x-6 gap-y-2 text-xs border-b-2 border-green-700">
                <p>
                  <span className="text-gray-400">STATUS:</span>
                  <span className="relative inline-flex h-3 w-3 ml-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-green-300 font-bold">
                    DEPLOYED & ACTIVE
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">INITIATED:</span>{" "}
                  <span className="text-white">Mar 2024</span>
                </p>
              </div>

              <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div
                    className="bg-black p-3 border-2 border-green-700 h-full cursor-pointer group relative overflow-hidden"
                    onClick={() => {
                      setShowScannerModal(true);
                      setCurrentScannerImage("/1.jpg");
                    }}
                  >
                    <img
                      src="/docuScan.png"
                      alt="Scanner App Preview"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-center text-xs text-green-300 font-bold animate-pulse">
                        [VIEW DETAILED ANALYSIS]
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-5">
                  <div>
                    <p className="font-bold text-green-400 text-lg">
                      [MISSION_OBJECTIVE]
                    </p>
                    <p className="mt-2 text-sm text-gray-200 leading-relaxed">
                      To create a smart Android document scanner that makes
                      digitizing papers fast and effortless, with built-in tools
                      to extract text and read it aloud for enhanced
                      accessibility.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-green-400 text-lg">
                      [PERFORMANCE_REPORT]
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-gray-300">
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-green-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            High-Accuracy Text Recognition (98%):
                          </strong>{" "}
                          Reliably converts scanned documents into editable text
                          for seamless digital integration.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-green-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Automated Edge Detection:
                          </strong>{" "}
                          Dramatically reduces user effort by intelligently
                          framing documents, cutting manual cropping time by{" "}
                          <span className="text-green-300">75%</span>.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-green-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Auditory Accessibility:
                          </strong>{" "}
                          Converts scanned text to speech with{" "}
                          <span className="text-green-300">90% clarity</span>,
                          opening access for visually impaired users.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-green-400 text-lg">
                      [TECHNOLOGY_STACK]
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-gray-700 text-green-200 px-3 py-1 border border-green-800 rounded-sm hover:bg-green-800 transition-colors">
                        Kotlin
                      </span>
                      <span className="text-xs bg-gray-700 text-green-200 px-3 py-1 border border-green-800 rounded-sm hover:bg-green-800 transition-colors">
                        Jetpack Compose
                      </span>
                      <span className="text-xs bg-gray-700 text-green-200 px-3 py-1 border border-green-800 rounded-sm hover:bg-green-800 transition-colors">
                        C++
                      </span>
                      <span className="text-xs bg-gray-700 text-green-200 px-3 py-1 border border-green-800 rounded-sm hover:bg-green-800 transition-colors">
                        Google ML Kit
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-800/50 border-t-2 border-green-600 flex justify-end gap-4">
                <a
                  href="https://github.com/devan1shX/DocuScan"
                  className="text-green-300 hover:text-white transition-colors flex items-center gap-2 text-sm border-b border-transparent hover:border-green-300 pb-0.5"
                >
                  <Github size={18} />
                  <span>SOURCE_CODE</span>
                </a>
                <a
                  href="/base.apk"
                  download="base.apk"
                  className="text-green-300 hover:text-white transition-colors flex items-center gap-2 text-sm border-b border-transparent hover:border-green-300 pb-0.5"
                >
                  <Download size={18} />
                  <span>INSTALL_BINARY</span>
                </a>
              </div>
            </div>

            <div className="relative border-2 border-blue-500/50 bg-gray-950 shadow-neon-blue transition-all duration-300 hover:border-blue-400 hover:shadow-neon-blue-strong">
              <div className="p-3 bg-gradient-to-r from-gray-800 to-black border-b-2 border-blue-600 flex justify-between items-center animate-bg-pulse">
                <h3 className="font-bold text-lg md:text-xl text-blue-300 tracking-wide">
                  [PROJECT PROFILE: Deception Detection AI]
                </h3>
                <span className="text-gray-500 text-sm italic hidden sm:block">
                  Log_ID: <span className="text-white">DD_25_001</span>
                </span>
              </div>
              <div className="p-2 bg-black/50 flex flex-wrap gap-x-6 gap-y-2 text-xs border-b-2 border-blue-700">
                <p>
                  <span className="text-gray-400">STATUS:</span>{" "}
                  <span className="text-yellow-300 font-bold">
                    UNDER RESEARCH
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">INITIATED:</span>{" "}
                  <span className="text-white">Aug 2024</span>
                </p>
              </div>
              <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div
                    onClick={() => setShowGraphModal(true)}
                    className="bg-black p-3 border-2 border-blue-700 h-full flex items-center justify-center cursor-pointer group relative overflow-hidden"
                  >
                    <div className="text-center p-4">
                      <div className="text-blue-400 text-xl font-bold font-mono">
                        $ view_architecture
                        <span className="inline-block w-3 h-6 bg-blue-400 ml-1 animate-pulse"></span>
                      </div>
                      <div className="text-xs text-gray-400 mt-2 group-hover:text-white animate-pulse-light">
                        [Click for Model Overview]
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-5">
                  <div>
                    <p className="font-bold text-blue-400 text-lg">
                      [MISSION_OBJECTIVE]
                    </p>
                    <p className="mt-2 text-sm text-gray-200 leading-relaxed">
                      To build an advanced AI model capable of identifying
                      deceptive patterns in complex text-based communications,
                      specifically for high-stakes diplomatic dialogues.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-400 text-lg">
                      [PERFORMANCE_REPORT]
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-gray-300">
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-blue-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Innovative Hybrid Architecture:
                          </strong>{" "}
                          Combines Transformer encoders with Graph Convolutional
                          Networks (GCNs) for deep contextual understanding.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-blue-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            High Predictive Accuracy:
                          </strong>{" "}
                          Achieved an impressive{" "}
                          <span className="text-blue-300">85.8% accuracy</span>{" "}
                          in identifying deception across a vast dataset.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-blue-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Large-Scale Data Processing:
                          </strong>{" "}
                          Trained and validated on over{" "}
                          <span className="text-blue-300">
                            17,000 preprocessed messages
                          </span>{" "}
                          for robust performance.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-blue-400 text-lg">
                      [TECHNOLOGY_STACK]
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-gray-700 text-blue-200 px-3 py-1 border border-blue-800 rounded-sm hover:bg-blue-800 transition-colors">
                        Python
                      </span>
                      <span className="text-xs bg-gray-700 text-blue-200 px-3 py-1 border border-blue-800 rounded-sm hover:bg-blue-800 transition-colors">
                        TensorFlow
                      </span>
                      <span className="text-xs bg-gray-700 text-blue-200 px-3 py-1 border border-blue-800 rounded-sm hover:bg-blue-800 transition-colors">
                        GCNs
                      </span>
                      <span className="text-xs bg-gray-700 text-blue-200 px-3 py-1 border border-blue-800 rounded-sm hover:bg-blue-800 transition-colors">
                        NLP
                      </span>
                      <span className="text-xs bg-gray-700 text-blue-200 px-3 py-1 border border-blue-800 rounded-sm hover:bg-blue-800 transition-colors">
                        Transformers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-800/50 border-t-2 border-blue-600 flex justify-end gap-4">
                <a
                  href="https://github.com/Beingstupid4me/Deception-detection"
                  className="text-blue-300 hover:text-white transition-colors flex items-center gap-2 text-sm border-b border-transparent hover:border-blue-300 pb-0.5"
                >
                  <Github size={18} />
                  <span>SOURCE_CODE</span>
                </a>
              </div>
            </div>

            <div className="relative border-2 border-red-500/50 bg-gray-950 shadow-neon-red transition-all duration-300 hover:border-red-400 hover:shadow-neon-red-strong">
              <div className="p-3 bg-gradient-to-r from-gray-800 to-black border-b-2 border-red-600 flex justify-between items-center animate-bg-pulse">
                <h3 className="font-bold text-lg md:text-xl text-red-300 tracking-wide">
                  [PROJECT PROFILE: Stick Hero Game]
                </h3>
                <span className="text-gray-500 text-sm italic hidden sm:block">
                  Log_ID: <span className="text-white">SH_23_001</span>
                </span>
              </div>
              <div className="p-2 bg-black/50 flex flex-wrap gap-x-6 gap-y-2 text-xs border-b-2 border-red-700">
                <p>
                  <span className="text-gray-400">STATUS:</span>{" "}
                  <span className="text-cyan-300 font-bold">
                    ACADEMIC ARCHIVE
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">INITIATED:</span>{" "}
                  <span className="text-white">Oct 2023</span>
                </p>
              </div>
              <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-black p-3 border-2 border-red-700 h-full group relative overflow-hidden">
                    <img
                      src="/stick_hero.png"
                      alt="Stick Hero Game Preview"
                      className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-center text-xs text-red-300 font-bold animate-pulse">
                        [GAMEPLAY SCREENSHOT]
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-5">
                  <div>
                    <p className="font-bold text-red-400 text-lg">
                      [MISSION_OBJECTIVE]
                    </p>
                    <p className="mt-2 text-sm text-gray-200 leading-relaxed">
                      To engineer a fun and responsive 2D arcade game from the
                      ground up using JavaFX, focusing on smooth performance,
                      complex animations, and high-quality, bug-free code.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-red-400 text-lg">
                      [PERFORMANCE_REPORT]
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-gray-300">
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-red-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Ultra-Smooth Gameplay:
                          </strong>{" "}
                          Achieves a stable{" "}
                          <span className="text-red-300">
                            60 Frames Per Second (FPS)
                          </span>{" "}
                          with immediate player input response.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-red-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Multithreaded Animation Engine:
                          </strong>{" "}
                          Handles numerous concurrent on-screen actions and
                          physics simulations without performance degradation.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-red-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Robust Code Quality:
                          </strong>{" "}
                          Ensures high reliability and expected behavior with{" "}
                          <span className="text-red-300">
                            90% JUnit test coverage
                          </span>
                          .
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-red-400 text-lg">
                      [TECHNOLOGY_STACK]
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-gray-700 text-red-200 px-3 py-1 border border-red-800 rounded-sm hover:bg-red-800 transition-colors">
                        Java
                      </span>
                      <span className="text-xs bg-gray-700 text-red-200 px-3 py-1 border border-red-800 rounded-sm hover:bg-red-800 transition-colors">
                        JavaFX
                      </span>
                      <span className="text-xs bg-gray-700 text-red-200 px-3 py-1 border border-red-800 rounded-sm hover:bg-red-800 transition-colors">
                        Multithreading
                      </span>
                      <span className="text-xs bg-gray-700 text-red-200 px-3 py-1 border border-red-800 rounded-sm hover:bg-red-800 transition-colors">
                        JUnit
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-800/50 border-t-2 border-red-600 flex justify-end gap-4">
                <a
                  href="https://github.com/devan1shX/Stick-Hero-Game"
                  className="text-red-300 hover:text-white transition-colors flex items-center gap-2 text-sm border-b border-transparent hover:border-red-300 pb-0.5"
                >
                  <Github size={18} />
                  <span>SOURCE_CODE</span>
                </a>
              </div>
            </div>

            <div className="relative border-2 border-purple-500/50 bg-gray-950 shadow-neon-purple transition-all duration-300 hover:border-purple-400 hover:shadow-neon-purple-strong">
              <div className="p-3 bg-gradient-to-r from-gray-800 to-black border-b-2 border-purple-600 flex justify-between items-center animate-bg-pulse">
                <h3 className="font-bold text-lg md:text-xl text-purple-300 tracking-wide">
                  [PROJECT PROFILE: Mini Operating System]
                </h3>
                <span className="text-gray-500 text-sm italic hidden sm:block">
                  Log_ID: <span className="text-white">OS_24_001</span>
                </span>
              </div>
              <div className="p-2 bg-black/50 flex flex-wrap gap-x-6 gap-y-2 text-xs border-b-2 border-purple-700">
                <p>
                  <span className="text-gray-400">STATUS:</span>{" "}
                  <span className="text-cyan-300 font-bold">
                    ACADEMIC ARCHIVE
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">INITIATED:</span>{" "}
                  <span className="text-white">Nov 2023</span>
                </p>
              </div>
              <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-black p-3 border-2 border-purple-700 h-full group relative overflow-hidden">
                    <img
                      src="/operating_system.png"
                      alt="Mini OS Preview"
                      className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-center text-xs text-purple-300 font-bold animate-pulse">
                        [SYSTEM DIAGRAM]
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-5">
                  <div>
                    <p className="font-bold text-purple-400 text-lg">
                      [MISSION_OBJECTIVE]
                    </p>
                    <p className="mt-2 text-sm text-gray-200 leading-relaxed">
                      To build a foundational operating system kernel from
                      scratch in C, focusing on efficient process scheduling and
                      memory management to dramatically improve overall system
                      performance.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-purple-400 text-lg">
                      [PERFORMANCE_REPORT]
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-gray-300">
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-purple-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Optimized Process Handling:
                          </strong>{" "}
                          The custom priority-based CPU scheduler decreased
                          average task completion time by{" "}
                          <span className="text-purple-300">15%</span> under
                          heavy system workloads.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-purple-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Highly Efficient Memory Use:
                          </strong>{" "}
                          Achieved a significant{" "}
                          <span className="text-purple-300">
                            30% reduction in memory footprint
                          </span>{" "}
                          through an innovative "lazy-loading" technique.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-purple-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Robust System Core:
                          </strong>{" "}
                          Developed a custom shell and ELF loader for a fully
                          functional, bare-metal operating environment.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-purple-400 text-lg">
                      [TECHNOLOGY_STACK]
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-gray-700 text-purple-200 px-3 py-1 border border-purple-800 rounded-sm hover:bg-purple-800 transition-colors">
                        C Language
                      </span>
                      <span className="text-xs bg-gray-700 text-purple-200 px-3 py-1 border border-purple-800 rounded-sm hover:bg-purple-800 transition-colors">
                        Linux Kernel
                      </span>
                      <span className="text-xs bg-gray-700 text-purple-200 px-3 py-1 border border-purple-800 rounded-sm hover:bg-purple-800 transition-colors">
                        System Architecture
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-800/50 border-t-2 border-purple-600 flex justify-end gap-4">
                <a
                  href="https://github.com/devan1shX/OS-Assignment"
                  className="text-purple-300 hover:text-white transition-colors flex items-center gap-2 text-sm border-b border-transparent hover:border-purple-300 pb-0.5"
                >
                  <Github size={18} />
                  <span>SOURCE_CODE</span>
                </a>
              </div>
            </div>

            <div className="relative border-2 border-yellow-500/50 bg-gray-950 shadow-neon-yellow transition-all duration-300 hover:border-yellow-400 hover:shadow-neon-yellow-strong">
              <div className="p-3 bg-gradient-to-r from-gray-800 to-black border-b-2 border-yellow-600 flex justify-between items-center animate-bg-pulse">
                <h3 className="font-bold text-lg md:text-xl text-yellow-300 tracking-wide">
                  [PROJECT PROFILE: Advanced Chip Design]
                </h3>
                <span className="text-gray-500 text-sm italic hidden sm:block">
                  Log_ID: <span className="text-white">NOC_24_001</span>
                </span>
              </div>
              <div className="p-2 bg-black/50 flex flex-wrap gap-x-6 gap-y-2 text-xs border-b-2 border-yellow-700">
                <p>
                  <span className="text-gray-400">STATUS:</span>{" "}
                  <span className="text-orange-300 font-bold">
                    RESEARCH COMPLETE
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">INITIATED:</span>{" "}
                  <span className="text-white">Feb 2024</span>
                </p>
              </div>
              <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-black p-3 border-2 border-yellow-700 h-full group relative overflow-hidden">
                    <img
                      src="/noc.png"
                      alt="Network on Chip Preview"
                      className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-center text-xs text-yellow-300 font-bold animate-pulse">
                        [ARCHITECTURAL OVERVIEW]
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-5">
                  <div>
                    <p className="font-bold text-yellow-400 text-lg">
                      [MISSION_OBJECTIVE]
                    </p>
                    <p className="mt-2 text-sm text-gray-200 leading-relaxed">
                      To research and design highly efficient internal data
                      pathways for modern computer chips (a "Network-on-Chip"),
                      aiming to significantly boost future processor performance
                      and data handling capabilities.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-yellow-400 text-lg">
                      [PERFORMANCE_REPORT]
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-gray-300">
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-yellow-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Innovative Chip Architecture:
                          </strong>{" "}
                          Developed novel layouts for optimized data flow within
                          multi-core processors, effectively preventing data
                          bottlenecks.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-yellow-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Advanced Performance Simulation:
                          </strong>{" "}
                          Utilized the industry-standard Gem5 simulator to
                          rigorously test designs under diverse data traffic
                          patterns.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={18}
                          className="inline mr-2 mt-0.5 text-yellow-500 flex-shrink-0"
                        />
                        <span>
                          <strong className="text-white">
                            Blueprint for Future Chips:
                          </strong>{" "}
                          Provided critical insights for developing more
                          powerful, scalable, and energy-efficient processing
                          units.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-yellow-400 text-lg">
                      [TECHNOLOGY_STACK]
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-gray-700 text-yellow-200 px-3 py-1 border border-yellow-800 rounded-sm hover:bg-yellow-800 transition-colors">
                        Gem5 Simulator
                      </span>
                      <span className="text-xs bg-gray-700 text-yellow-200 px-3 py-1 border border-yellow-800 rounded-sm hover:bg-yellow-800 transition-colors">
                        Python
                      </span>
                      <span className="text-xs bg-gray-700 text-yellow-200 px-3 py-1 border border-yellow-800 rounded-sm hover:bg-yellow-800 transition-colors">
                        SystemC
                      </span>
                      <span className="text-xs bg-gray-700 text-yellow-200 px-3 py-1 border border-yellow-800 rounded-sm hover:bg-yellow-800 transition-colors">
                        Digital Design
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-800/50 border-t-2 border-yellow-600 flex justify-end gap-4">
                <a
                  href="https://github.com/Beingstupid4me/NOC_Config"
                  className="text-yellow-300 hover:text-white transition-colors flex items-center gap-2 text-sm border-b border-transparent hover:border-yellow-300 pb-0.5"
                >
                  <Github size={18} />
                  <span>SOURCE_CODE</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes pulse-light {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes bg-pulse {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-pulse-light {
          animation: pulse-light 2s infinite ease-in-out;
        }
        .animate-bg-pulse {
          background-size: 200% 200%;
          animation: bg-pulse 10s infinite alternate linear;
        }
        .shadow-neon-green {
          box-shadow: 0 0 8px rgba(0, 255, 0, 0.4),
            0 0 15px rgba(0, 255, 0, 0.2);
        }
        .hover\\:shadow-neon-green-strong:hover {
          box-shadow: 0 0 15px rgba(0, 255, 0, 0.6),
            0 0 25px rgba(0, 255, 0, 0.4);
        }
        .shadow-neon-blue {
          box-shadow: 0 0 8px rgba(0, 191, 255, 0.4),
            0 0 15px rgba(0, 191, 255, 0.2);
        }
        .hover\\:shadow-neon-blue-strong:hover {
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.6),
            0 0 25px rgba(0, 191, 255, 0.4);
        }
        .shadow-neon-red {
          box-shadow: 0 0 8px rgba(255, 0, 0, 0.4),
            0 0 15px rgba(255, 0, 0, 0.2);
        }
        .hover\\:shadow-neon-red-strong:hover {
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.6),
            0 0 25px rgba(255, 0, 0, 0.4);
        }
        .shadow-neon-purple {
          box-shadow: 0 0 8px rgba(128, 0, 128, 0.4),
            0 0 15px rgba(128, 0, 128, 0.2);
        }
        .hover\\:shadow-neon-purple-strong:hover {
          box-shadow: 0 0 15px rgba(128, 0, 128, 0.6),
            0 0 25px rgba(128, 0, 128, 0.4);
        }
        .shadow-neon-yellow {
          box-shadow: 0 0 8px rgba(255, 255, 0, 0.4),
            0 0 15px rgba(255, 255, 0, 0.2);
        }
        .hover\\:shadow-neon-yellow-strong:hover {
          box-shadow: 0 0 15px rgba(255, 255, 0, 0.6),
            0 0 25px rgba(255, 255, 0, 0.4);
        }
      `}</style>

      <section id="setup" className="border-b-4 border-green-400 p-4 md:p-6 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-white pb-2 flex items-center gap-3">
            <SlidersHorizontal className="text-green-400" size={28} />
            SETUP.CONF
          </h2>
          <div className="border-2 border-white p-4 md:p-6">
            <pre className="text-xs md:text-sm leading-relaxed overflow-x-auto">
              {`# My daily driver configuration for development and productivity.

[hardware]
computer = "HP Pavilion Gaming 15 (ec-2150ax)"
monitor = "Dell U2721DE (27-inch QHD)"
keyboard = "Keychron K2 (Mechanical)"
mouse = "Logitech MX Master 3S"
headphones = "Sony WH-1000XM4"

[dev_environment]
editor = "Visual Studio Code"
theme = "SynthWave '84"
terminal = "Windows Terminal w/ WSL2 (Ubuntu)"
shell_prompt = "Starship 🚀"
version_control = "Git & GitHub Desktop"
api_client = "Postman"

[productivity_tools]
browser = "Brave + Chrome for Dev"
note_taking = "Notion & Obsidian"
design = "Figma"
music = "Spotify (Lo-fi beats for focus)"
`}
            </pre>
          </div>
        </div>
      </section>

      <section
        id="leadership"
        className="border-b-4 border-green-400 p-4 md:p-6 "
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-white pb-2 flex items-center gap-3">
            <Award className="text-green-400" size={28} />
            LEADERSHIP.MD
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="border-2 border-white p-4 md:p-6">
              <h3 className="font-bold text-base md:text-lg">
                LEAD TEACHING ASSISTANT
              </h3>
              <p className="text-green-400 text-sm md:text-base mb-2">
                EpicQuest Learning | May 2024 - May 2025
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
                <li>
                  Designed and delivered app development curriculum for 10+
                  students.
                </li>
                <li>
                  Mentored students on leadership projects using design thinking
                  strategies.
                </li>
              </ul>
            </div>
            <div className="border-2 border-white p-4 md:p-6">
              <h3 className="font-bold text-base md:text-lg">
                CLASS REPRESENTATIVE
              </h3>
              <p className="text-green-400 text-sm md:text-base mb-2">
                Tinu Public School | Class 12
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
                <li>
                  Acted as the primary liaison for over 80 students and faculty.
                </li>
                <li>
                  Organized class-wide academic initiatives and communicated
                  feedback.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="resume" className="border-b-4 border-green-400 p-4 md:p-6 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-white pb-2 flex items-center gap-3">
            <FolderKanban className="text-green-400" size={28} />
            RESUME.MD
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 border-2 border-white p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-green-400">
                EXPERIENCE:
              </h3>

              <div className="mb-6">
                <h4 className="font-bold text-sm md:text-base">
                  PLATFORM DEVELOPER
                </h4>
                <a
                  href="https://otmt.iiitd.edu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline cursor-pointer text-sm md:text-base break-all"
                >
                  Office of Tech Transfer & Management, IIIT-Delhi | Jan 2025 -
                  Apr 2025
                </a>
                <ul className="mt-2 space-y-1 text-sm md:text-base">
                  <li>
                    • Led full-stack development of OTMT platform: MERN web app
                    + Android app + admin dashboard
                  </li>
                  <li>
                    • Built automated brochure generation tool and integrated
                    RAG-based chatbot for user queries
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-sm md:text-base">
                  FULL-STACK & SECURITY ENGINEER
                </h4>
                <a
                  href="https://r2c.iiitd.edu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline cursor-pointer text-sm md:text-base break-all"
                >
                  Research to Commercialization, IIIT-Delhi | May 2025 - July
                  2025
                </a>
                <ul className="mt-2 space-y-1 text-sm md:text-base">
                  <li>
                    • Built secure research portal with React.js, Node.js,
                    MongoDB and integrated ML metadata extraction
                  </li>
                  <li>
                    • Implemented Firebase Auth, rate limiting, encrypted
                    storage with zero reported data breaches
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-sm md:text-base">
                  LEAD TEACHING ASSISTANT
                </h4>
                <p className="text-green-400 text-sm md:text-base">
                  EpicQuest Learning | May 2024 - May 2025
                </p>
                <ul className="mt-2 space-y-1 text-sm md:text-base">
                  <li>
                    • Designed app development curriculum for 10+ students,
                    achieving 20% increase in engagement
                  </li>
                  <li>
                    • Conducted SDG research and implemented design thinking
                    strategies for student leadership projects
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-2 border-white p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-green-400">
                EDUCATION:
              </h3>
              <div className="mb-4">
                <h4 className="font-bold text-sm md:text-base">
                  B.TECH COMPUTER SCIENCE ENGINEERING
                </h4>
                <p className="text-green-400 text-xs md:text-sm break-words">
                  Indraprastha Institute of Information Technology, Delhi | Aug
                  2022 – Jun 2026
                </p>
                <p className="text-xs md:text-sm">CGPA: 7.11/10</p>
              </div>
              <div className="mb-4">
                <h4 className="font-bold text-sm md:text-base">
                  CBSE CLASS 12 (PCM + CS)
                </h4>
                <p className="text-green-400 text-xs md:text-sm">
                  Tinu Public School | Apr 2021 – Feb 2022
                </p>
                <p className="text-xs md:text-sm">Percentage: 93.2%</p>
              </div>
              <div className="mb-4">
                <h4 className="font-bold text-sm md:text-base">
                  CBSE CLASS 10
                </h4>
                <p className="text-green-400 text-xs md:text-sm">
                  Tinu Public School | Apr 2019 – Mar 2020
                </p>
                <p className="text-xs md:text-sm">Percentage: 77%</p>
              </div>

              <h3 className="text-lg md:text-xl font-bold mb-4 text-green-400 mt-6">
                CERTIFICATIONS:
              </h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li>• Machine Learning Specialization</li>
                <li>• Data Structures and Algorithms</li>
                <li>• Ethical Hacking Essentials</li>
              </ul>

              <div className="mt-6 md:mt-8">
                <a
                  href="/resume.pdf"
                  download="Anish_Resume.pdf"
                  className="border-2 border-green-400 bg-green-400 text-black px-4 py-2 hover:bg-black hover:text-green-400 flex items-center gap-2 justify-center text-sm md:text-base w-full"
                >
                  <Download size={16} />
                  DOWNLOAD_RESUME.PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-white pb-2 flex items-center gap-3">
            <AtSign className="text-green-400" size={28} />
            CONTACT.SH
          </h2>

          {isClient && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="border-2 border-white p-4 md:p-6 flex flex-col h-full">
                <div className="flex-grow flex flex-col items-center justify-center text-center border-b-2 border-gray-700 pb-6 mb-4">
                  {activeContact === "email" && (
                    <div className="flex flex-col items-center justify-center">
                      <Mail size={48} className="text-green-400 mb-4" />
                      <p className="text-sm text-gray-400">Email Address</p>
                      <p className="text-lg font-bold break-all">
                        anishdewat@gmail.com
                      </p>
                      <a
                        href="mailto:anishdewat@gmail.com"
                        className="mt-6 border-2 border-green-400 bg-green-400 text-black px-6 py-2 hover:bg-black hover:text-green-400 flex items-center gap-2 transition-colors duration-200"
                      >
                        <ExternalLink size={16} />
                        <span>Initiate Transmission</span>
                      </a>
                    </div>
                  )}
                  {activeContact === "github" && (
                    <div className="flex flex-col items-center justify-center">
                      <Github size={48} className="text-green-400 mb-4" />
                      <p className="text-sm text-gray-400">GitHub Profile</p>
                      <p className="text-lg font-bold break-all">
                        github.com/devan1shX
                      </p>
                      <a
                        href="https://github.com/devan1shX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 border-2 border-green-400 bg-green-400 text-black px-6 py-2 hover:bg-black hover:text-green-400 flex items-center gap-2 transition-colors duration-200"
                      >
                        <ExternalLink size={16} />
                        <span>View Source Code</span>
                      </a>
                    </div>
                  )}
                  {activeContact === "linkedin" && (
                    <div className="flex flex-col items-center justify-center">
                      <Linkedin size={48} className="text-green-400 mb-4" />
                      <p className="text-sm text-gray-400">LinkedIn Profile</p>
                      <p className="text-lg font-bold break-all">
                        linkedin.com/in/devan1shX
                      </p>
                      <a
                        href="https://www.linkedin.com/in/devan1shX/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 border-2 border-green-400 bg-green-400 text-black px-6 py-2 hover:bg-black hover:text-green-400 flex items-center gap-2 transition-colors duration-200"
                      >
                        <ExternalLink size={16} />
                        <span>View Professional Network</span>
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-center text-sm text-gray-400 mb-3 tracking-wider">
                    Open a direct channel
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setActiveContact("email")}
                      className={`p-2 border-2 text-sm font-bold transition-colors duration-200 ${
                        activeContact === "email"
                          ? "bg-white text-black"
                          : "border-white text-white hover:bg-gray-700"
                      }`}
                    >
                      EMAIL
                    </button>
                    <button
                      onClick={() => setActiveContact("github")}
                      className={`p-2 border-2 text-sm font-bold transition-colors duration-200 ${
                        activeContact === "github"
                          ? "bg-white text-black"
                          : "border-white text-white hover:bg-gray-700"
                      }`}
                    >
                      GITHUB
                    </button>
                    <button
                      onClick={() => setActiveContact("linkedin")}
                      className={`p-2 border-2 text-sm font-bold transition-colors duration-200 ${
                        activeContact === "linkedin"
                          ? "bg-white text-black"
                          : "border-white text-white hover:bg-gray-700"
                      }`}
                    >
                      LINKEDIN
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-2 border-white p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-bold mb-6 text-green-400">
                  SEND_MESSAGE:
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm md:text-base font-bold mb-2">
                      NAME*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border-2 border-white p-2 md:p-3 text-white focus:border-green-400 focus:outline-none text-sm md:text-base"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base font-bold mb-2">
                      EMAIL*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border-2 border-white p-2 md:p-3 text-white focus:border-green-400 focus:outline-none text-sm md:text-base"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base font-bold mb-2">
                      SUBJECT*
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border-2 border-white p-2 md:p-3 text-white focus:border-green-400 focus:outline-none text-sm md:text-base"
                      placeholder="Enter subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm md:text-base font-bold mb-2">
                      MESSAGE*
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                      className="w-full bg-gray-800 border-2 border-white p-2 md:p-3 text-white focus:border-green-400 focus:outline-none resize-none text-sm md:text-base"
                      placeholder="Enter your message"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === "success"}
                    className={`w-full px-4 py-3 font-bold flex items-center gap-2 justify-center text-sm md:text-base transition-all duration-300 ease-in-out ${
                      isSubmitting
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed border-gray-600"
                        : submitStatus === "success"
                        ? "bg-green-500 text-black border-green-500 cursor-default"
                        : "bg-green-400 text-black border-2 border-green-400 hover:bg-black hover:text-green-400"
                    }`}
                  >
                    {isSubmitting ? (
                      "SENDING..."
                    ) : submitStatus === "success" ? (
                      <>
                        <Check size={18} className="checkmark-icon" />
                        MESSAGE SENT
                      </>
                    ) : (
                      <>
                        <Mail size={16} />
                        SEND_MESSAGE
                      </>
                    )}
                  </button>
                </form>

                {submitStatus && submitStatus !== "success" && (
                  <div className="mt-4 p-3 border-2 text-center text-sm md:text-base border-red-400 text-red-400">
                    {submitStatus}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 md:mt-8 text-center">
            <p className="text-green-400 font-bold text-sm md:text-base">
              $ echo "Let's build something that works."
            </p>
          </div>
        </div>
      </section>

      <SystemFooter />

      {showGraphModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-gray-900 border-4 border-green-400 max-w-7xl w-full h-[95vh] md:h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b-2 border-green-400 p-3 md:p-4 flex justify-between items-center bg-green-400 text-black">
              <h3 className="text-sm md:text-xl font-bold">
                HYBRID DECEPTION DETECTION MODEL ARCHITECTURE
              </h3>
              <button
                onClick={() => setShowGraphModal(false)}
                className="hover:bg-black hover:text-green-400 p-1 border-2 border-black"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-grow bg-gray-800">
              <InteractiveModelDiagram />
            </div>
          </div>
        </div>
      )}

      {showScannerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-gray-900 border-4 border-green-400 max-w-4xl w-full h-auto max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b-2 border-green-400 p-3 md:p-4 flex justify-between items-center bg-green-400 text-black">
              <h3 className="text-sm md:text-xl font-bold ">
                DOCUMENT_SCANNER_APP GALLERY
              </h3>
              <button
                onClick={() => setShowScannerModal(false)}
                className="hover:bg-black hover:text-green-400 p-1 border-2 border-black"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 md:p-6 flex-grow overflow-y-auto">
              <div className="text-center mb-2 text-green-400 font-bold tracking-widest text-sm md:text-base ">
                {`IMAGE ${currentScannerImage.replace(
                  /[^0-9]/g,
                  ""
                )} OF ${scannerImageCount}`}
              </div>
              <div className="mb-4 border-2 border-white">
                <img
                  src={currentScannerImage}
                  alt={`Document Scanner Screenshot ${currentScannerImage.replace(
                    /[^0-9]/g,
                    ""
                  )}`}
                  className="w-full h-auto object-contain max-h-[50vh] md:max-h-[60vh] bg-gray-800"
                  draggable="false"
                />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1 md:gap-2">
                {Array.from({ length: scannerImageCount }, (_, i) => i + 1).map(
                  (num) => (
                    <div
                      key={num}
                      onClick={() => setCurrentScannerImage(`/${num}.jpg`)}
                      className={`border-2 cursor-pointer transition-all ${
                        currentScannerImage === `/${num}.jpg`
                          ? "border-green-400 scale-105"
                          : "border-white hover:border-green-400"
                      }`}
                    >
                      <img
                        src={`/${num}.jpg`}
                        alt={`Thumbnail ${num}`}
                        className="w-full h-auto object-cover aspect-square bg-gray-700"
                        draggable="false"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
