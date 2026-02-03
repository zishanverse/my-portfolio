"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

import { ContactModal } from "@/components/ui/contact-modal";

export const Navbar = () => {
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (current) => {
        if (typeof current === "number") {
            let direction = current - scrollY.getPrevious()!;

            if (current < 50) {
                setVisible(true);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
            setLastScrollY(current);
        }
    });

    const navItems = [
        { name: "Home", link: "/" },
        { name: "About", link: "#about" },
        { name: "Projects", link: "#projects" },
        { name: "Contact", link: "#contact" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: visible ? 0 : -100 }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "fixed top-0 inset-x-0 mx-auto z-50 w-full px-6 py-4 transition-all duration-300",
                    lastScrollY > 50 ? "glass" : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
                        Portfolio<span className="text-indigo-500">.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <div >
                                <button
                                    onClick={() => setIsContactOpen(true)}
                                    className="cursor-pointer pointer-events-auto relative z-50 px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    Hire Me
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? (
                                <X className="!text-black dark:!text-white" />
                            ) : (
                                <Menu className="!text-black dark:!text-white" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsContactOpen(true);
                            }}
                            className="w-full py-3 mt-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            Hire Me
                        </button>
                    </motion.div>
                )}
            </motion.nav>

            {isContactOpen && (
                <ContactModal onClose={() => setIsContactOpen(false)} />
            )}
        </>
    );
};
