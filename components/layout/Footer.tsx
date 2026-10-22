import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";

export const Footer = () => {
    return (

        <footer className="w-full bg-[linear-gradient(to_bottom,transparent,black_40%)] py-12 px-6 relative z-50">

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-12">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <h3 className="text-xl font-bold text-white">Zishan Khan</h3>
                    <p className="text-gray-400 text-sm">Backend & AI Systems Engineer • Architecting intelligent distributed runtimes.</p>
                </div>

                <div className="flex items-center gap-6">
                    <Link
                        href="https://github.com/zishanverse"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub profile"
                        className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                    >
                        <Github size={20} />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/zishan-khan-/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                        className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                    >
                        <Linkedin size={20} />
                    </Link>
                    <Link
                        href="https://leetcode.com/u/zishverse/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LeetCode profile"
                        className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                    >
                        <Code2 size={20} />
                    </Link>
                    <Link
                        href="mailto:zishanverse@gmail.com"
                        aria-label="Send email"
                        className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                    >
                        <Mail size={20} />
                    </Link>
                </div>

                <div className="text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Zishan Khan. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
