import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full bg-black border-t border-white/10 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-white">Portfolio.</h3>
                    <p className="text-gray-400 text-sm">Building digital experiences that matter.</p>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Github size={20} />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Twitter size={20} />
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Linkedin size={20} />
                    </Link>
                    <Link href="mailto:hello@example.com" className="text-gray-400 hover:text-white transition-colors">
                        <Mail size={20} />
                    </Link>
                </div>

                <div className="text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </div>
            </div>
        </footer>
    );
};
