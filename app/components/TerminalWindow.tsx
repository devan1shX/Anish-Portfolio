"use client";

import Draggable from 'react-draggable';
import Terminal from './Terminal';
import { TerminalSquare } from 'lucide-react';
import { useState, useRef } from 'react';

const TerminalWindow = () => {
    const [isOpen, setIsOpen] = useState(false);
    const nodeRef = useRef(null);

    const handleClose = () => setIsOpen(false);

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-5 left-5 z-50 bg-gray-900 border-2 border-green-400 p-3 text-green-400 hover:bg-green-400 hover:text-black transition-colors"
                aria-label="Open Terminal"
            >
                <TerminalSquare size={24} />
            </button>
        );
    }

    return (
        <Draggable handle=".terminal-header" nodeRef={nodeRef}>
            <div ref={nodeRef} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] h-[50vh] md:w-[600px] md:h-[400px] border-2 border-green-400 shadow-lg shadow-green-500/20">
                <div className="terminal-header bg-gray-800 p-2 flex justify-between items-center cursor-move">
                    <span className="text-xs text-green-400">/bin/bash -- anish@portfolio</span>
                    <button onClick={handleClose} className="bg-red-500 rounded-full w-4 h-4 hover:bg-red-700"></button>
                </div>
                <Terminal onClose={handleClose} />
            </div>
        </Draggable>
    );
}

export default TerminalWindow;
