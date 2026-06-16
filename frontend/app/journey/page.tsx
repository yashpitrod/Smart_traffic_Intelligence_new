"use client";

import { DATA } from "@/components/constants";
import { 
    Download, 
    Briefcase, 
    GraduationCap as School, 
    Trophy, 
    Code as Code2, 
    ArrowUpRight,
    Star,
    Sparkle,
    Terminal
} from '@phosphor-icons/react';
import { motion } from '@/components/motion-client';

export default function JourneyPage() {
    const { summary, workExperience, education, skills, achievements } = DATA;

    // Flatten skills for display
    const coreSkills = [...skills.programming, ...skills.ai_ml];
    const otherSkills = [...skills.data, ...skills.misc, ...skills.soft];

    return (
        <div className="flex-1 w-full bg-grid">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-16 pb-32">

                {/* Header Section - Journey Rebrand */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="mb-12"
                >
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                        My <span className="text-primary terminal-invert inline-block relative">Journey</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">

                    {/* Intro / Summary Card */}
                    <motion.section 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.1 }}
                        className="col-span-12 md:col-span-8 neo-brutal-box border-neo-border bg-white text-neo-text p-6 md:p-10 shadow-neo flex flex-col justify-between relative overflow-hidden group hover:shadow-neo-hover-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                            <Terminal weight="bold" className="w-24 h-24 md:w-32 md:h-32 text-[var(--neo-text)]" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-3 border-3 border-[var(--neo-border)] px-3 py-1 mb-6 bg-secondary w-fit">
                                <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--neo-text)]">Mission Statement</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight mb-6">
                                Engineering <br />Intelligent Systems
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl border-l-4 border-primary pl-6">
                                {summary}
                            </p>
                        </div>
                    </motion.section>

                    {/* Quick Stats / Tech Stack Card */}
                    <motion.section 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2 }}
                        className="col-span-12 md:col-span-4 neo-brutal-box border-neo-border bg-primary p-6 md:p-10 shadow-neo flex flex-col relative group transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black uppercase tracking-tight">Core<br />Stack</h2>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--neo-text)] text-white flex items-center justify-center border-3 border-transparent transition-all">
                                <Code2 weight="bold" className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {skills.programming.slice(0, 6).map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-white border-2 border-[var(--neo-border)] font-mono text-[10px] font-bold uppercase">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <div className="mt-auto space-y-4">
                            <div className="bg-white p-4 border-3 border-[var(--neo-border)] shadow-neo">
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkle weight="bold" className="w-4 h-4 text-primary" />
                                    <span className="font-mono text-[10px] sm:text-xs font-bold uppercase">Primary Focus</span>
                                </div>
                                <p className="font-bold text-sm sm:text-base">AI & Autonomous Agents</p>
                            </div>
                            <div className="bg-[var(--neo-text)] text-white p-4 border-3 border-[var(--neo-border)] shadow-neo">
                                <div className="flex items-center gap-2 mb-1 text-primary">
                                    <Star weight="bold" className="w-4 h-4" />
                                    <span className="font-mono text-[10px] sm:text-xs font-bold uppercase text-white">Experience</span>
                                </div>
                                <p className="font-bold text-sm sm:text-base">Multiple High-Impact Projects</p>
                            </div>
                        </div>
                    </motion.section>
                </div>

                {/* Experience Header */}
                <div className="mt-16 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 bg-[var(--neo-text)] flex items-center justify-center text-white">
                            <Briefcase weight="bold" className="w-4 h-4" />
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tight">Professional Experience</h2>
                        <div className="h-1 flex-1 bg-[var(--neo-border)]"></div>
                    </div>
                </div>

                {/* Experience Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
                    {workExperience.map((job, index) => (
                        <motion.section 
                            key={job.company}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: 0.1 * index }}
                            className="col-span-12 md:col-span-6 neo-brutal-box border-neo-border bg-white p-6 md:p-8 shadow-neo group hover:shadow-neo-hover-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-black uppercase leading-tight mb-1">{job.title}</h3>
                                    <p className="font-mono font-bold text-gray-500 uppercase tracking-widest text-xs">{job.company}</p>
                                </div>
                                <div className="bg-secondary border-2 border-[var(--neo-border)] px-3 py-1 font-mono text-[10px] font-bold">
                                    {job.date}
                                </div>
                            </div>
                            <ul className="space-y-3 mb-6">
                                {job.points.slice(0, 3).map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="min-w-[6px] h-[6px] mt-[6px] bg-primary"></span>
                                        <span className="text-sm leading-relaxed text-gray-700">{point}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto pt-4 border-t-2 border-gray-100 flex justify-between items-center">
                                <span className="font-mono text-[10px] font-bold uppercase opacity-50">{job.place}</span>
                                <div className="w-8 h-8 rounded-full border-2 border-[var(--neo-border)] flex items-center justify-center group-hover:bg-primary transition-colors">
                                    <ArrowUpRight weight="bold" className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* Education & Achievements Header */}
                <div className="mt-16 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 bg-secondary flex items-center justify-center text-[var(--neo-text)] border-2 border-[var(--neo-border)]">
                            <School weight="bold" className="w-4 h-4" />
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tight">Education & Recognition</h2>
                        <div className="h-1 flex-1 bg-[var(--neo-border)]"></div>
                    </div>
                </div>

                {/* Education & Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
                    {/* Education Cards */}
                    {education.map((edu) => (
                        <motion.section 
                            key={edu.institution}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="col-span-12 md:col-span-4 neo-brutal-box border-neo-border bg-white p-6 shadow-neo group hover:bg-secondary transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <School weight="bold" className="w-6 h-6 text-primary" />
                                <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-[var(--neo-text)] text-white px-2 py-0.5">Education</span>
                            </div>
                            <h3 className="text-xl font-black uppercase mb-1">{edu.degree}</h3>
                            <p className="font-mono text-xs font-bold text-gray-500 mb-4">{edu.institution}</p>
                            <p className="text-sm text-gray-600 mb-4">{edu.details}</p>
                            <div className="mt-auto font-mono text-[10px] font-bold">{edu.date}</div>
                        </motion.section>
                    ))}

                    {/* Achievement Cards */}
                    {achievements.map((award) => (
                        <motion.section 
                            key={award.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="col-span-12 md:col-span-4 neo-brutal-box border-neo-border bg-white p-6 shadow-neo group hover:bg-primary transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Trophy weight="bold" className="w-6 h-6 text-[var(--neo-text)]" />
                                <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-secondary px-2 py-0.5 border-2 border-[var(--neo-border)]">Award</span>
                            </div>
                            <h3 className="text-xl font-black uppercase mb-1">{award.title}</h3>
                            <p className="font-mono text-xs font-bold text-gray-500 mb-4">{award.organization}</p>
                            <p className="text-sm text-gray-600 mb-4">{award.points[0]}</p>
                            <div className="mt-auto font-mono text-[10px] font-bold">{award.date}</div>
                        </motion.section>
                    ))}
                </div>
            </div>
        </div>
    );
}
