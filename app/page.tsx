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
  Award
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

export default function Portfolio() {
  const [showGraphModal, setShowGraphModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [currentScannerImage, setCurrentScannerImage] = useState("/1.jpg");
  const scannerImageCount = 9;

  useEffect(() => {
    if (showGraphModal || showScannerModal) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showGraphModal, showScannerModal]);

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
    <div className="min-h-screen bg-gray-900 text-white font-mono">
      <header className="border-b-4 border-green-400 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="border-2 border-white p-3 md:p-4 mb-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">ANISH</h1>
            <p className="text-base md:text-xl text-green-400">
              SOFTWARE ENGINEER
            </p>
          </div>
          <nav className="flex flex-col sm:flex-row gap-3 md:gap-6">
            <a
              href="#about"
              className="border-2 border-white px-3 py-2 md:px-4 md:py-2 hover:bg-white hover:text-black transition-none text-center text-sm md:text-base"
            >
              [ABOUT]
            </a>
            <a
              href="#projects"
              className="border-2 border-white px-3 py-2 md:px-4 md:py-2 hover:bg-white hover:text-black transition-none text-center text-sm md:text-base"
            >
              [PROJECTS]
            </a>
            <a
              href="#resume"
              className="border-2 border-white px-3 py-2 md:px-4 md:py-2 hover:bg-white hover:text-black transition-none text-center text-sm md:text-base"
            >
              [RESUME]
            </a>
            <a
              href="#contact"
              className="border-2 border-white px-3 py-2 md:px-4 md:py-2 hover:bg-white hover:text-black transition-none text-center text-sm md:text-base"
            >
              [CONTACT]
            </a>
          </nav>
        </div>
      </header>

      <section id="about" className="border-b-4 border-green-400 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-white pb-2 flex items-center gap-3">
            <FileText className="text-green-400" size={28} />
            ABOUT_ME.TXT
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="border-2 border-white p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-green-400">
                DESCRIPTION:
              </h3>
              <p className="mb-4 leading-relaxed text-sm md:text-base">
                Final year Computer Science student at IIIT-Delhi with hands-on
                experience building production systems that solve real problems.
                From secure research portals to AI-powered chatbots, I focus on
                creating applications that work reliably in the real world.
              </p>
              <p className="mb-4 leading-relaxed text-sm md:text-base">
                Currently leading development projects including the OTMT
                platform ecosystem and advanced ML research in deception
                detection using Transformers and Graph Neural Networks. Also
                mentoring students as a Teaching Assistant at EPICQUEST
                LEARNING, designing curriculum and teaching app development
                fundamentals.
              </p>
              <h3 className="text-lg md:text-xl font-bold mb-4 text-green-400 mt-6">
                PHILOSOPHY:
              </h3>
              <p className="leading-relaxed text-sm md:text-base">
                "The best code is code that doesn't need to exist. The second
                best is code that's so simple it obviously has no bugs."
              </p>
            </div>
            <div className="border-2 border-white p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-green-400">
                SKILLS.JSON:
              </h3>
              <pre className="text-xs md:text-sm leading-relaxed overflow-x-auto">
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

      <section id="coding" className="border-b-4 border-green-400 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-white pb-2 flex items-center gap-3">
            <Terminal className="text-green-400" size={28} />
            PROBLEM_SOLVING.LOG
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="border-2 border-white p-4 md:p-6 space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-green-400">
                  LEETCODE_PROFILE:
                </h3>
                <p className="text-sm md:text-base mt-2 mb-3">
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
                <h3 className="text-lg md:text-xl font-bold text-green-400">
                  GEEKSFORGEEKS_PROFILE:
                </h3>
                <p className="text-sm md:text-base mt-2 mb-3">
                  Practicing diverse data structures and core concepts.
                  <br />
                  <span className="text-white font-bold">100+</span> Problems
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

            <div className="border-2 border-white p-4 md:p-6">
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-white pb-2 flex items-center gap-3">
            <FolderKanban className="text-green-400" size={28} />
            PROJECTS.DIR
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border-2 border-white">
              <div className="border-b-2 border-white p-3 md:p-4 bg-green-400 text-black">
                <h3 className="text-lg md:text-xl font-bold">
                  DOCUMENT_SCANNER_APP
                </h3>
              </div>
              <div className="p-4 md:p-6">
                <img
                  src="/docuScan.png"
                  alt="Document Scanner App Interface"
                  className="w-full h-32 md:h-48 object-cover border-2 border-white mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    setShowScannerModal(true);
                    setCurrentScannerImage("/1.jpg");
                  }}
                />
                <p className="mb-4 text-sm md:text-base">
                  Native Android document scanning app achieving 98% OCR
                  accuracy and 90% text-to-speech clarity using Google ML Kit.
                  Automated edge detection and enhancement, reducing manual crop
                  time by 75%.
                </p>
                <div className="mb-4 text-sm md:text-base">
                  <span className="text-green-400 font-bold">STACK:</span>
                  <code className="ml-2">
                    Kotlin, Jetpack Compose, C++, Google ML Kit
                  </code>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <a
                    href="https://github.com/devan1shX/DocuScan"
                    className="border-2 border-white px-3 py-1 hover:bg-white hover:text-black flex items-center gap-2 justify-center text-sm md:text-base"
                  >
                    <Github size={16} />
                    CODE
                  </a>
                  <a
                    href="/base.apk"
                    download="base.apk"
                    className="border-2 border-white px-3 py-1 hover:bg-white hover:text-black flex items-center gap-2 justify-center text-sm md:text-base"
                  >
                    <ExternalLink size={16} />
                    INSTALL
                  </a>
                </div>
              </div>
            </div>

            <div className="border-2 border-white">
              <div className="border-b-2 border-white p-3 md:p-4 bg-green-400 text-black">
                <h3 className="text-lg md:text-xl font-bold">
                  DECEPTION_DETECTION_AI
                </h3>
              </div>
              <div className="p-4 md:p-6">
                <div
                  onClick={() => setShowGraphModal(true)}
                  className="w-full h-32 md:h-48 border-2 border-white mb-4 bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  <div className="text-center p-4">
                    <div className="text-green-400 text-base md:text-lg font-bold mb-2">
                      NEURAL ARCHITECTURE
                    </div>
                    <div className="text-xs md:text-sm">
                      Click to view interactive model diagram
                    </div>
                  </div>
                </div>
                <p className="mb-4 text-sm md:text-base">
                  Hybrid deep learning model combining Transformer encoders with
                  Graph Convolutional Networks for deception detection in
                  diplomacy dialogues. Preprocessed 17,000+ messages, achieving
                  85.8% accuracy and 0.60 Macro F1-score.
                </p>
                <div className="mb-4 text-sm md:text-base">
                  <span className="text-green-400 font-bold">STACK:</span>
                  <code className="ml-2">
                    Python, TensorFlow, GCNs, NLP, Transformers
                  </code>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Beingstupid4me/Deception-detection"
                    className="border-2 border-white px-3 py-1 hover:bg-white hover:text-black flex items-center gap-2 text-sm md:text-base"
                  >
                    <Github size={16} /> CODE
                  </a>
                </div>
              </div>
            </div>

            <div className="border-2 border-white">
              <div className="border-b-2 border-white p-3 md:p-4 bg-green-400 text-black">
                <h3 className="text-lg md:text-xl font-bold">
                  STICK_HERO_GAME
                </h3>
              </div>
              <div className="p-4 md:p-6">
                <img
                  src="/stick_hero.png"
                  alt="Stick Hero Game Screenshot"
                  className="w-full h-32 md:h-48 object-contain border-2 border-white mb-4 bg-gray-800"
                />
                <p className="mb-4 text-sm md:text-base">
                  JavaFX stick-man arcade game with cherry collection mechanics
                  running at 60 FPS with less than 5ms input latency. Features
                  multithreading for 100 concurrent animations and 90% JUnit
                  test coverage.
                </p>
                <div className="mb-4 text-sm md:text-base">
                  <span className="text-green-400 font-bold">STACK:</span>
                  <code className="ml-2">
                    Java, JavaFX, FXML, Multithreading, JUnit
                  </code>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/devan1shX/Stick-Hero-Game"
                    className="border-2 border-white px-3 py-1 hover:bg-white hover:text-black flex items-center gap-2 text-sm md:text-base"
                  >
                    <Github size={16} />
                    CODE
                  </a>
                </div>
              </div>
            </div>

            <div className="border-2 border-white">
              <div className="border-b-2 border-white p-3 md:p-4 bg-green-400 text-black">
                <h3 className="text-lg md:text-xl font-bold">
                  MINI_OPERATING_SYSTEM
                </h3>
              </div>
              <div className="p-4 md:p-6">
                <img
                  src="/operating_system.png"
                  alt="Operating System Interface"
                  className="w-full h-32 md:h-48 object-contain border-2 border-white mb-4 bg-gray-800"
                />
                <p className="mb-4 text-sm md:text-base">
                  Custom operating system with priority-based CPU scheduler in
                  C, decreasing average process turnaround time by 15% under
                  heavy workloads. Streamlined shell and ELF loader with 100%
                  lazy-loading success, reducing memory footprint by 30%.
                </p>
                <div className="mb-4 text-sm md:text-base">
                  <span className="text-green-400 font-bold">STACK:</span>
                  <code className="ml-2">C, Linux, Git, Java, WSL</code>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/devan1shX/OS-Assignment"
                    className="border-2 border-white px-3 py-1 hover:bg-white hover:text-black flex items-center gap-2 text-sm md:text-base"
                  >
                    <Github size={16} />
                    CODE
                  </a>
                </div>
              </div>
            </div>

            <div className="border-2 border-white">
              <div className="border-b-2 border-white p-3 md:p-4 bg-green-400 text-black">
                <h3 className="text-lg md:text-xl font-bold">
                  ADVANCED_NOC_DESIGN
                </h3>
              </div>
              <div className="p-4 md:p-6">
                <img
                  src="/noc.png"
                  alt="Network on Chip Design"
                  className="w-full h-32 md:h-48 object-contain border-2 border-white mb-4 bg-gray-800"
                />
                <p className="mb-4 text-sm md:text-base">
                  Designed and implemented novel Network-on-Chip configurations
                  from scratch using HeteroGarnet. Benchmarked system
                  performance in Gem5 under diverse traffic patterns, informing
                  scalable architecture decisions.
                </p>
                <div className="mb-4 text-sm md:text-base">
                  <span className="text-green-400 font-bold">STACK:</span>
                  <code className="ml-2">
                    Gem5, HeteroGarnet, Python, SystemC
                  </code>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Beingstupid4me/NOC_Config"
                    className="border-2 border-white px-3 py-1 hover:bg-white hover:text-black flex items-center gap-2 text-sm md:text-base"
                  >
                    <Github size={16} />
                    CODE
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="setup" className="border-b-4 border-green-400 p-4 md:p-6">
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

      <section id="leadership" className="border-b-4 border-green-400 p-4 md:p-6">
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
                  Designed and delivered app development curriculum for 10+ students.
                </li>
                <li>
                  Mentored students on leadership projects using design thinking strategies.
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
                  Organized class-wide academic initiatives and communicated feedback.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="resume" className="border-b-4 border-green-400 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-white pb-2 flex items-center gap-3">
            <FolderKanban className="text-green-400" size={28} />
            PROJECTS.DIR
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
          <div className="border-2 border-white p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <Mail size={48} className="mx-auto mb-4 text-green-400" />
                <h3 className="font-bold mb-2 text-sm md:text-base">EMAIL</h3>
                <a
                  href="mailto:anishdewat@gmail.com"
                  className="border-2 border-white px-3 md:px-4 py-2 hover:bg-white hover:text-black inline-block text-xs md:text-sm break-all"
                >
                  anishdewat@gmail.com
                </a>
              </div>

              <div className="text-center">
                <Github size={48} className="mx-auto mb-4 text-green-400" />
                <h3 className="font-bold mb-2 text-sm md:text-base">GITHUB</h3>
                <a
                  href="https://github.com/devan1shX"
                  className="border-2 border-white px-3 md:px-4 py-2 hover:bg-white hover:text-black inline-block text-xs md:text-sm break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/devan1shX
                </a>
              </div>

              <div className="text-center">
                <Linkedin size={48} className="mx-auto mb-4 text-green-400" />
                <h3 className="font-bold mb-2 text-sm md:text-base">
                  LINKEDIN
                </h3>
                <a
                  href="https://www.linkedin.com/in/devan1shX/"
                  className="border-2 border-white px-3 md:px-4 py-2 hover:bg-white hover:text-black inline-block text-xs md:text-sm break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/devan1shX
                </a>
              </div>
            </div>

            <div className="mt-6 md:mt-8 text-center">
              <p className="text-green-400 font-bold text-sm md:text-base">
                $ echo "Let's build something that works."
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-4 border-green-400 p-4 md:p-6 text-center">
        <p className="text-green-400 text-xs md:text-sm">
          © 2025 Anish | Crafted with Next.js & Tailwind | Deployed on Github
        </p>
      </footer>

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
              <h3 className="text-sm md:text-xl font-bold">
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
              <div className="text-center mb-2 text-green-400 font-bold tracking-widest text-sm md:text-base">
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
