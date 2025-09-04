import { Github, Linkedin } from "lucide-react";

const Neofetch = () => {
  return (
    <div className="flex gap-4 md:gap-8 text-xs md:text-sm">
      <pre className="text-green-400 font-bold">
        {`
      ,,,,,,,,,
    ,,,,,,,,,,,,,,
  ,,,,,,,  ,,,,,,,,,
 ,,,,,,,    ,,,,,,,,,,
,,,,,,,,    ,,,,,,,,,,,
,,,,,,,,    ,,,,,,,,,,,
,,,,,,,,    ,,,,,,,,,,,
 ,,,,,,,    ,,,,,,,,,,
  ,,,,,,,  ,,,,,,,,,
    ,,,,,,,,,,,,,,
      '''''''''
        `}
      </pre>
      <div className="flex flex-col gap-1">
        <p><span className="text-green-400 font-bold">anish</span>@<span className="text-green-400 font-bold">portfolio</span></p>
        <p>--------------------</p>
        <p><span className="text-green-400 font-bold">OS:</span> Web Browser</p>
        <p><span className="text-green-400 font-bold">Host:</span> Anish's Portfolio</p>
        <p><span className="text-green-400 font-bold">Kernel:</span> Next.js 14</p>
        <p><span className="text-green-400 font-bold">Uptime:</span> {Math.floor(Date.now() / 1000)}s</p>
        <p><span className="text-green-400 font-bold">Shell:</span> zsh</p>
        <p><span className="text-green-400 font-bold">Resolution:</span> Dynamic</p>
        <p><span className="text-green-400 font-bold">DE:</span> Tailwind CSS</p>
        <p><span className="text-green-400 font-bold">Terminal:</span> React</p>
        <p><span className="text-green-400 font-bold">CPU:</span> V8 Engine</p>
        <p><span className="text-green-400 font-bold">GPU:</span> Browser Renderer</p>
        <p><span className="text-green-400 font-bold">Memory:</span> RAM Negotiable</p>
        <div className="flex gap-4 mt-2">
            <a href="https://github.com/devan1shX" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Github size={16}/></a>
            <a href="https://www.linkedin.com/in/devan1shX/" target="_blank" rel="noopener noreferrer" className="hover:text-white"><Linkedin size={16}/></a>
        </div>
      </div>
    </div>
  );
};

export default Neofetch;