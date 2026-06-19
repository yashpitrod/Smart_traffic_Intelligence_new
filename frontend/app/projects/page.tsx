'use client';

import { Brain, ArrowRight, TextOutdent, Target, ShieldCheck, ClipboardText, Database, CaretDown } from '@phosphor-icons/react';
import { DATA } from '@/components/constants';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AgentsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const flowRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const progressLineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Safety net: force everything visible after 2s
        const safety = setTimeout(() => {
            document.querySelectorAll('.flow-node, .agent-card-item, .agent-number, .agent-content').forEach(el => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'none';
            });
            if (progressLineRef.current) {
                progressLineRef.current.style.transform = 'scaleY(1)';
            }
        }, 2000);

        const ctx = gsap.context(() => {
            // Header animation
            gsap.from(headerRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                clearProps: 'all',
            });

            // Flow Diagram Pipeline Animation
            const flowNodes = gsap.utils.toArray('.flow-node');
            const flowTl = gsap.timeline({
                scrollTrigger: {
                    trigger: flowRef.current,
                    start: 'top 85%',
                }
            });

            flowTl.from(flowNodes, {
                y: 40,
                opacity: 0,
                scale: 0.8,
                duration: 0.6,
                stagger: 0.15,
                ease: 'back.out(1.5)',
                clearProps: 'all',
            });

            // Glowing traveling dot animation (Horizontal — desktop only)
            gsap.to('.traveling-dot-x', {
                left: "calc(100% - 4rem)",
                duration: 2.5,
                ease: "power1.inOut",
                repeat: -1,
            });

            // Mobile flow connectors + nodes stagger in
            const mobileNodes = gsap.utils.toArray('.flow-node, .flow-connector');
            gsap.from(mobileNodes, {
                y: 20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power2.out',
                clearProps: 'all',
            });

            // Vertical scroll progress line
            gsap.to(progressLineRef.current, {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: cardsContainerRef.current,
                    start: 'top 50%',
                    end: 'bottom 80%',
                    scrub: 1,
                }
            });

            // Agent Cards Scroll Animation
            const cards = gsap.utils.toArray('.agent-card-wrap');
            cards.forEach((card: any, i) => {
                const isEven = i % 2 === 0;
                
                // Card Entrance
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    x: isEven ? -80 : 80,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    clearProps: 'all',
                });

                // Parallax Number Watermark
                const numberWatermark = card.querySelector('.agent-number');
                if (numberWatermark) {
                    gsap.to(numberWatermark, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1,
                        },
                        y: 100,
                        ease: 'none'
                    });
                }
            });

            // CTA bounce
            gsap.from('.cta-btn', {
                scrollTrigger: {
                    trigger: '.cta-section',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(2)',
                clearProps: 'all'
            });

        }, containerRef);

        return () => {
            clearTimeout(safety);
            ctx.revert();
        };
    }, []);

    const getIconForAgent = (id: string) => {
        switch (id) {
            case 'nlp-parser': return <TextOutdent weight="bold" className="w-8 h-8" />;
            case 'prediction-engine': return <Target weight="bold" className="w-8 h-8" />;
            case 'anomaly-detector': return <ShieldCheck weight="bold" className="w-8 h-8" />;
            case 'action-planner': return <ClipboardText weight="bold" className="w-8 h-8" />;
            default: return <Brain weight="bold" className="w-8 h-8" />;
        }
    };

    const getColorClasses = (colorType: string) => {
        switch (colorType) {
            case 'primary': return 'bg-primary text-neo-text shadow-[8px_8px_0px_0px_#163300] hover:shadow-[12px_12px_0px_0px_#163300]';
            case 'accent': return 'bg-accent text-neo-text shadow-[8px_8px_0px_0px_#163300] hover:shadow-[12px_12px_0px_0px_#163300]';
            case 'secondary': return 'bg-white text-neo-text shadow-[8px_8px_0px_0px_#163300] hover:shadow-[12px_12px_0px_0px_#163300]';
            case 'dark': return 'bg-neo-text text-primary shadow-[8px_8px_0px_0px_#9FE870] hover:shadow-[12px_12px_0px_0px_#9FE870]';
            default: return 'bg-white text-neo-text shadow-neo';
        }
    };

    return (
        <div ref={containerRef} className="flex-1 w-full bg-grid pb-20 overflow-hidden">
            {/* Header */}
            <section ref={headerRef} className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-8">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="h-8 w-8 md:h-10 md:w-10 bg-primary border-2 border-neo-border flex items-center justify-center text-neo-text shadow-neo-sm flex-shrink-0">
                        <Brain weight="bold" className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight">Agentic Workflow</h1>
                </div>
                <p className="text-sm sm:text-base md:text-xl font-mono text-gray-600 max-w-3xl border-l-4 border-primary pl-4">
                    Four specialized AI agents operating in sequence. From raw citizen input to predictive modeling to deployment-ready action plans.
                </p>
            </section>

            {/* Pipeline Visualizer */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
                <div className="border-4 border-neo-border bg-white p-4 sm:p-6 md:p-8 shadow-[8px_8px_0px_0px_#163300] relative z-10 overflow-hidden">

                    {/* ── DESKTOP: horizontal row (md and up) ── */}
                    <div ref={flowRef} className="hidden md:flex items-center justify-center gap-6 lg:gap-10 xl:gap-14 relative py-4 px-4 mx-auto w-max">
                        {/* Horizontal dashed line */}
                        <div className="absolute top-1/2 left-16 right-16 h-0 border-t-[3px] border-dashed border-gray-300 -translate-y-1/2 z-0"></div>
                        {/* Traveling dot */}
                        <div className="traveling-dot-x absolute top-1/2 left-16 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#9FE870,0_0_30px_#9FE870] -translate-y-1/2 z-[1]"></div>

                        {/* Input Node */}
                        <div className="flow-node relative z-10 flex flex-col items-center gap-3 w-24">
                            <div className="w-14 h-14 rounded-full border-3 border-neo-border bg-gray-100 flex items-center justify-center shadow-[3px_3px_0px_0px_#163300] hover:scale-110 transition-transform">
                                <Database weight="fill" className="w-7 h-7" />
                            </div>
                            <span className="font-mono text-[10px] font-bold uppercase text-center bg-white px-2 py-0.5 border-2 border-neo-border">Raw Data</span>
                        </div>

                        {/* Agent Nodes */}
                        {DATA.agents.map((agent, idx) => (
                            <div key={idx} className="flow-node relative z-10 flex flex-col items-center gap-2 w-24">
                                <div className={`w-14 h-14 border-3 border-neo-border flex items-center justify-center shadow-[3px_3px_0px_0px_#163300] hover:scale-110 transition-transform ${agent.color === 'dark' ? 'bg-neo-text text-primary border-primary' : 'bg-primary text-neo-text'}`}>
                                    {getIconForAgent(agent.id)}
                                </div>
                                <div className="flex flex-col items-center text-center bg-white px-1.5 py-0.5 border-2 border-neo-border">
                                    <span className="font-mono text-[8px] font-bold text-gray-500">AGENT {agent.number}</span>
                                    <span className="font-mono text-[10px] font-bold uppercase leading-tight">{agent.shortName}</span>
                                </div>
                            </div>
                        ))}

                        {/* Output Node */}
                        <div className="flow-node relative z-10 flex flex-col items-center gap-2 w-24">
                            <div className="w-14 h-14 rounded-full border-3 border-neo-border bg-accent flex items-center justify-center shadow-[3px_3px_0px_0px_#163300] hover:scale-110 transition-transform">
                                <ClipboardText weight="fill" className="w-7 h-7" />
                            </div>
                            <span className="font-mono text-[10px] font-bold uppercase text-center bg-white px-2 py-0.5 border-2 border-neo-border">Action Plan</span>
                        </div>
                    </div>

                    {/* ── MOBILE: vertical stack (below md) ── */}
                    <div className="flex md:hidden flex-col items-center gap-0 relative py-2">

                        {/* Input Node */}
                        <div className="flow-node relative z-10 flex flex-col items-center gap-2 py-2">
                            <div className="w-14 h-14 rounded-full border-3 border-neo-border bg-gray-100 flex items-center justify-center shadow-[3px_3px_0px_0px_#163300]">
                                <Database weight="fill" className="w-7 h-7" />
                            </div>
                            <span className="font-mono text-xs font-bold uppercase bg-white px-3 py-1 border-2 border-neo-border">Raw Data</span>
                        </div>
                        {/* Arrow down */}
                        <div className="flow-connector flex flex-col items-center text-primary">
                            <div className="w-0.5 h-5 bg-gray-300"></div>
                            <CaretDown weight="bold" className="w-5 h-5 -mt-1 animate-bounce" />
                        </div>

                        {/* Agent Nodes — 2×2 grid */}
                        <div className="flow-node grid grid-cols-2 gap-3 w-full max-w-[280px] py-2">
                            {DATA.agents.map((agent, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2">
                                    <div className={`w-12 h-12 border-3 border-neo-border flex items-center justify-center shadow-[2px_2px_0px_0px_#163300] ${agent.color === 'dark' ? 'bg-neo-text text-primary border-primary' : 'bg-primary text-neo-text'}`}>
                                        {getIconForAgent(agent.id)}
                                    </div>
                                    <div className="flex flex-col items-center text-center bg-white px-1 py-0.5 border-2 border-neo-border">
                                        <span className="font-mono text-[7px] font-bold text-gray-500">AGENT {agent.number}</span>
                                        <span className="font-mono text-[9px] font-bold uppercase leading-tight">{agent.shortName}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Arrow down */}
                        <div className="flow-connector flex flex-col items-center text-primary">
                            <div className="w-0.5 h-5 bg-gray-300"></div>
                            <CaretDown weight="bold" className="w-5 h-5 -mt-1 animate-bounce" />
                        </div>

                        {/* Output Node */}
                        <div className="flow-node relative z-10 flex flex-col items-center gap-2 py-2">
                            <div className="w-14 h-14 rounded-full border-3 border-neo-border bg-accent flex items-center justify-center shadow-[3px_3px_0px_0px_#163300]">
                                <ClipboardText weight="fill" className="w-7 h-7" />
                            </div>
                            <span className="font-mono text-xs font-bold uppercase bg-white px-3 py-1 border-2 border-neo-border">Action Plan</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* Agent Details Grid with Progress Line */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 relative">
                {/* Scroll-linked Progress Line (Desktop only) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-2 bg-gray-200 border-x-2 border-neo-border -translate-x-1/2 z-0">
                    <div ref={progressLineRef} className="absolute top-0 left-0 w-full h-full bg-primary origin-top scale-y-0"></div>
                </div>

                <div ref={cardsContainerRef} className="flex flex-col gap-8 md:gap-16 relative z-10 py-6 md:py-10">
                    {DATA.agents.map((agent, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <div key={idx} className={`agent-card-wrap flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                
                                {/* Timeline Dot */}
                                <div className="hidden md:flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2 mt-12 z-20">
                                    <div className={`w-8 h-8 rounded-full border-4 border-neo-border flex items-center justify-center font-black text-xs shadow-neo ${agent.color === 'dark' ? 'bg-neo-text text-primary' : 'bg-primary text-neo-text'}`}>
                                        {agent.number}
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-[45%] agent-card-item border-3 md:border-4 border-neo-border p-4 sm:p-6 md:p-8 ${getColorClasses(agent.color)} relative overflow-hidden group transition-transform duration-300`}>
                                    
                                    {/* Number Watermark Parallax */}
                                    <div className="agent-number absolute -right-2 -top-4 text-[60px] md:text-[100px] font-black opacity-[0.05] leading-none pointer-events-none transition-transform">
                                        {agent.number}
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full gap-5">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className={`w-10 h-10 md:w-14 md:h-14 border-3 flex items-center justify-center shadow-neo-sm flex-shrink-0 ${agent.color === 'dark' ? 'border-primary bg-transparent text-primary' : 'border-neo-border bg-white text-neo-text'}`}>
                                                {getIconForAgent(agent.id)}
                                            </div>
                                            <div>
                                                <div className="font-mono text-[10px] md:text-xs font-bold tracking-widest opacity-70">AGENT {agent.number}</div>
                                                <h2 className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-tight leading-none">{agent.name}</h2>
                                            </div>
                                        </div>
                                        <p className={`font-mono text-xs sm:text-sm leading-relaxed flex-1 ${agent.color === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {agent.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {agent.techBadges.map((badge, bIdx) => (
                                                <span key={bIdx} className={`px-2 py-1 font-mono text-[10px] font-bold uppercase border-2 shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-default ${agent.color === 'dark' ? 'border-primary text-primary bg-black/30' : 'border-neo-border bg-white text-neo-text'}`}>
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        {/* I/O Reveal on Hover */}
                                        <div className={`mt-3 md:mt-4 p-3 md:p-4 border-2 md:border-3 transition-all duration-300 ${agent.color === 'dark' ? 'border-primary/50 bg-black/50' : 'border-neo-border/50 bg-white/70'}`}>
                                            <div className="mb-2 md:mb-3">
                                                <h4 className="font-black uppercase text-[10px] mb-1 flex items-center gap-1 opacity-70">
                                                    <ArrowRight weight="bold" /> Input
                                                </h4>
                                                <div className="font-mono text-[10px] md:text-xs opacity-90 break-words" title={agent.input}>{agent.input}</div>
                                            </div>
                                            <div>
                                                <h4 className="font-black uppercase text-[10px] mb-1 flex items-center gap-1 opacity-70">
                                                    Output <ArrowRight weight="bold" />
                                                </h4>
                                                <div className="font-mono text-[10px] opacity-90 break-words">{agent.output}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Empty space for alternating layout */}
                                <div className="hidden md:block w-[45%]"></div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section max-w-7xl mx-auto px-4 md:px-6 mt-10 md:mt-16 pb-8 md:pb-12 text-center relative z-10">
                <Link href="/dashboard" className="cta-btn inline-flex items-center gap-2 md:gap-3 bg-neo-text text-primary font-black uppercase text-sm sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 md:py-6 border-3 md:border-4 border-primary shadow-[6px_6px_0px_0px_#9FE870] md:shadow-[8px_8px_0px_0px_#9FE870] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-300 group">
                    Test Pipeline in Dashboard 
                    <ArrowRight weight="bold" className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
                </Link>
            </section>
        </div>
    );
}
