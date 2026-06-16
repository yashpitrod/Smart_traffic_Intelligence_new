'use client';

import { DATA } from "@/components/constants";
import { User, Envelope as Mail, Stack as Layers, Globe, ArrowUpRight, RocketLaunch as Rocket, Terminal, ShieldCheck } from '@phosphor-icons/react';
import Link from "next/link";
import { motion } from '@/components/motion-client';

export default function AboutPage() {
    const { summary } = DATA;

    return (
        <div className="flex-1 w-full bg-grid">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-16 pb-32">
                <main className="w-full flex flex-col gap-12">
                    
                    {/* Consistent Header Style */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="flex flex-col lg:flex-row gap-8 lg:items-end justify-between mb-8"
                    >

                            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                                The <span className="text-primary terminal-invert inline-block relative px-2">Vision</span>
                            </h1>


                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Bio Section */}
                        <motion.section 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: 0.1 }}
                            className="col-span-12 lg:col-span-8 neo-brutal-box border-neo-border bg-white p-6 md:p-12 shadow-neo relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                <Rocket weight="bold" className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="inline-block px-3 py-1 bg-primary border-2 border-black font-mono text-xs mb-6 uppercase tracking-widest font-bold shadow-neo-sm">
                                    Status: Operational
                                </div>
                                <div className="prose prose-lg max-w-none">
                                    <p className="font-mono text-lg md:text-2xl leading-relaxed mb-8 border-l-4 border-black pl-6 bg-secondary p-6">
                                        Neo is designed to handle complex systemic problems predictably and autonomously. We focus on the intersection of long-context reasoning and real-time execution.
                                    </p>
                                    <p className="font-display font-medium text-lg text-gray-800 mb-6 whitespace-pre-wrap leading-relaxed">
                                        {summary}
                                    </p>
                                    <p className="font-display text-gray-600">
                                        Our architecture leverages distributed nodes and recursive feedback loops to ensure that agents don&apos;t just follow instructions—they reason through them.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Sidebar / Stats Card */}
                        <motion.section 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: 0.2 }}
                            className="col-span-12 lg:col-span-4 flex flex-col gap-6"
                        >
                            <div className="neo-brutal-box border-neo-border bg-secondary p-8 shadow-neo flex-1">
                                <div className="flex items-center gap-4 mb-8">
                                    <Terminal weight="bold" className="w-10 h-10 bg-black text-white p-2 border-2 border-black" />
                                    <h2 className="text-2xl font-black uppercase tracking-tight">System Core</h2>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-4 border-2 border-black bg-white shadow-neo-sm">
                                        <p className="font-mono text-[10px] uppercase text-gray-500 mb-1">Architecture</p>
                                        <p className="font-bold text-lg">Agentic-First</p>
                                    </div>
                                    <div className="p-4 border-2 border-black bg-white shadow-neo-sm">
                                        <p className="font-mono text-[10px] uppercase text-gray-500 mb-1">Deployment</p>
                                        <p className="font-bold text-lg">Global Node Network</p>
                                    </div>
                                    <div className="p-4 border-2 border-black bg-white shadow-neo-sm">
                                        <p className="font-mono text-[10px] uppercase text-gray-500 mb-1">Reasoning</p>
                                        <p className="font-bold text-lg">Recursive Chains</p>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Capabilities */}
                        <section className="col-span-12 flex flex-col gap-6" id="stack">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-black flex items-center justify-center text-white border-2 border-black">
                                    <Layers weight="bold" className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight">Core Capabilities</h2>
                                <div className="h-1 flex-1 bg-black"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { id: '01', title: 'Orchestration', desc: 'Autonomous systems configured for high-concurrency outputs.', features: ['Recursive Reasoning', 'Dynamic Task Routing', 'Multi-Agent Sync'] },
                                    { id: '02', title: 'Intelligence', desc: 'End-to-end cognitive workflows for enterprise data.', features: ['Sub-second RAG', 'Specialized LLMs', 'Context Memory'] },
                                    { id: '03', title: 'Resilience', desc: 'Self-healing infrastructure and secure execution layers.', features: ['Auth_Secure Layer', 'Config Drift Correction', 'Distributed Nodes'] }
                                ].map((area, index) => (
                                    <motion.div 
                                        key={area.id} 
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="neo-brutal-box border-neo-border bg-white p-8 shadow-neo hover:bg-secondary transition-colors group"
                                    >
                                        <h4 className="font-mono font-black text-black bg-primary inline-block px-3 py-1 border-2 border-black mb-6 shadow-neo-sm">{area.id}.</h4>
                                        <h3 className="text-2xl font-black uppercase mb-4 group-hover:text-primary transition-colors">{area.title}</h3>
                                        <p className="text-sm font-bold text-gray-600 mb-6 leading-relaxed">{area.desc}</p>
                                        <ul className="text-xs font-mono space-y-2 border-t-2 border-gray-100 pt-4">
                                            {area.features.map(f => (
                                                <li key={f} className="flex items-center gap-2">
                                                    <span className="text-primary font-bold">▶</span> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* CTA */}
                        <motion.section 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="col-span-12 mt-8 bg-primary border-3 border-neo-border p-12 text-center shadow-neo relative overflow-hidden"
                        >
                            <div className="absolute inset-0 pattern-diagonal opacity-10 pointer-events-none"></div>
                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter">Ready to Deploy?</h2>
                                <p className="font-mono text-lg font-bold mb-10 max-w-2xl mx-auto uppercase tracking-tight">We are currently onboarding select partners for the Neo Alpha program. Secure your node today.</p>
                                <Link
                                    href="/contact"
                                    className="inline-block bg-black text-white px-10 py-5 font-black text-xl uppercase tracking-widest hover:bg-white hover:text-black border-3 border-black transition-all shadow-neo hover:shadow-none translate-x-[-4px] translate-y-[-4px] hover:translate-x-0 hover:translate-y-0"
                                >
                                    Initiate Onboarding
                                </Link>
                            </div>
                        </motion.section>
                    </div>
                </main>
            </div>
        </div>
    );
}
