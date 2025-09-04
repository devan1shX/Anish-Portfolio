"use client";

import { useState, useRef, useEffect } from 'react';
import Neofetch from './Neofetch';

const CommandOutput = ({ command, output }: { command: string, output: React.ReactNode }) => (
  <div>
    <div className="flex items-center gap-2">
      <span className="text-green-400">$</span>
      <span className="flex-1">{command}</span>
    </div>
    <div className="pl-2">{output}</div>
  </div>
);

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string, output: React.ReactNode }[]>([]);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  const commandMap: { [key: string]: React.ReactNode } = {
    help: (
      <ul className="list-disc list-inside">
        <li><span className="font-bold text-green-400">about</span> - Scroll to the About Me section.</li>
        <li><span className="font-bold text-green-400">projects</span> - Scroll to the Projects section.</li>
        <li><span className="font-bold text-green-400">contact</span> - Scroll to the Contact section.</li>
        <li><span className="font-bold text-green-400">socials</span> - Display my social media links.</li>
        <li><span className="font-bold text-green-400">neofetch</span> - Display system information.</li>
        <li><span className="font-bold text-green-400">clear</span> - Clear the terminal history.</li>
      </ul>
    ),
    whoami: "You are visiting the portfolio of Anish, an AI Engineer & Full Stack Developer from New Delhi, India.",
    neofetch: <Neofetch />,
    socials: (
      <p>You can find me on <a href="https://github.com/devan1shX" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">GitHub</a> and <a href="https://www.linkedin.com/in/devan1shX/" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">LinkedIn</a>.</p>
    ),
  };

  const handleCommand = () => {
    const command = input.trim().toLowerCase();
    let output: React.ReactNode;

    if (command === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (['about', 'projects', 'resume', 'contact'].includes(command)) {
      document.getElementById(command)?.scrollIntoView({ behavior: 'smooth' });
      output = `Scrolling to ${command}...`;
    } else if (command in commandMap) {
      output = commandMap[command];
    } else {
      output = `command not found: ${command}. Type 'help' for a list of commands.`;
    }
    
    setHistory([...history, { command: input, output }]);
    setInput('');
  };

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);
  
  return (
    <div className="w-full h-full bg-black bg-opacity-75 text-white font-mono text-sm p-2 overflow-y-auto" onClick={() => document.getElementById('terminal-input')?.focus()}>
        <CommandOutput command="neofetch" output={<Neofetch />} />
        {history.map((item, index) => <CommandOutput key={index} command={item.command} output={item.output} />)}
      
      <div className="flex items-center gap-2">
        <span className="text-green-400">$</span>
        <input
          id="terminal-input"
          type="text"
          className="bg-transparent border-none text-white focus:outline-none w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
          autoFocus
        />
      </div>
      <div ref={endOfTerminalRef} />
    </div>
  );
};

export default Terminal;