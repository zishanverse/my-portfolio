"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ContactModal } from "@/components/ui/contact-modal";
import GlassSurface from "@/components/ui/GlassSurface";

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
                    "fixed top-4 inset-x-0 mx-auto z-50 w-[95%] max-w-5xl rounded-full transition-all duration-300",
                    visible ? "translate-y-0" : "-translate-y-full"
                )}
            >
                <div className="absolute inset-0 w-full h-full -z-10 rounded-full overflow-hidden shadow-sm">
                    <GlassSurface
                        width="100%"
                        height="100%"
                        borderRadius={30}
                        borderWidth={0}
                        opacity={0.8}
                        blur={15}
                        saturation={1.5}
                        mixBlendMode="normal"
                        backgroundOpacity={lastScrollY > 20 ? 0.6 : 0.2}
                    />
                </div>
                <div className="w-full flex items-center justify-between px-6 py-3">
                    <Link href="/" className="text-xl font-bold tracking-tight text-foreground relative z-20">
                        Portfolio<span className="text-indigo-500">.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 relative z-20">
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

                    <div className="md:hidden flex items-center gap-4 relative z-20">
                        <ThemeToggle />
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu">
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
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:hidden flex flex-col gap-4 shadow-xl"
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
