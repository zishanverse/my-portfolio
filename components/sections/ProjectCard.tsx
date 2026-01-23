"use client";

import { ArrowUpRight } from "lucide-react";
import React from "react";

export interface ProjectData {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    link?: string;
    imageColor: string; // Placeholder for image
}

interface ProjectCardProps {
    project: ProjectData;
    onClick: (project: ProjectData) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    return (
        <div
            onClick={() => onClick(project)}
            className="group relative bg-card border border-border rounded-xl p-6 cursor-pointer hover:border-indigo-500/50 transition-colors duration-300 overflow-hidden"
        >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.imageColor} opacity-10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110`} />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-indigo-400 transition-colors">
                            {project.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>

                    <p className="mt-4 text-muted-foreground line-clamp-3">
                        {project.description}
                    </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-secondary rounded-md text-secondary-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { ProjectCard };
