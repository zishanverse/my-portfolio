"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Contact = () => {
    return (
        <section className="py-24 bg-transparent dark:bg-transparent w-full border-t border-border/40 dark:border-white/5">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground dark:text-white">
                        Ready to connect?
                    </h2>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                        I&apos;m currently open to new opportunities and collaborations. 
                        Check out my contact page to view my social links or send me a direct message!
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                                Get In Touch <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <footer className="pt-24 text-sm text-muted-foreground">
                        <p>&copy; {new Date().getFullYear()} Zishan Khan. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </section>
    );
};

export { Contact };
