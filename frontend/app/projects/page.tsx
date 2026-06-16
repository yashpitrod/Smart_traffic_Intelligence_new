'use client';

import Image from 'next/image';
import { DATA } from '@/components/constants';
import { ArrowUpRight, Terminal, RocketLaunch } from '@phosphor-icons/react';
import { motion } from '@/components/motion-client';

export default function ProjectsPage() {
    return (
      <div className="flex-1 w-full bg-grid">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-16 pb-32">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              Selected{" "}
              <span className="text-primary terminal-invert inline-block relative">
                Works
              </span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
            {/* Intro / Featured Project Card */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1 }}
              className="col-span-12 md:col-span-8 neo-brutal-box border-neo-border bg-white text-neo-text p-6 md:p-10 shadow-neo flex flex-col justify-between relative overflow-hidden group hover:shadow-neo-hover-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <RocketLaunch
                  weight="bold"
                  className="w-24 h-24 md:w-32 md:h-32 text-[var(--neo-text)]"
                />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 border-3 border-[var(--neo-border)] px-3 py-1 mb-6 bg-secondary w-fit">
                  <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--neo-text)]">
                    Engineering Portfolio
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight mb-6">
                  Building for the <br />
                  Autonomous Future
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl border-l-4 border-primary pl-6">
                  A curated selection of high-performance applications,
                  engineering challenges, and digital experiments focused on AI
                  and systemic design.
                </p>
              </div>
              <div className="flex flex-col gap-6 mt-10 relative z-10 border-t-3 border-[var(--neo-text)]/10 pt-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs md:text-sm text-gray-500 uppercase tracking-widest mb-2">
                      Primary Domain
                    </p>
                    <p className="font-bold text-lg sm:text-xl inline-block bg-primary px-3 py-1 border-2 border-[var(--neo-border)] shadow-neo-sm">
                      AGENTIC SYSTEMS / WEB
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Meta Card */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 }}
              className="col-span-12 md:col-span-4 neo-brutal-box border-neo-border bg-primary p-6 md:p-10 shadow-neo flex flex-col relative group transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tight">
                  Project
                  <br />
                  Philosophy
                </h2>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--neo-text)] text-white flex items-center justify-center border-3 border-transparent transition-all">
                  <Terminal weight="bold" className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
              <div className="mt-auto space-y-4">
                <div className="bg-white p-4 border-3 border-[var(--neo-border)] shadow-neo">
                  <p className="font-bold text-sm sm:text-base">
                    Recursive Logic
                  </p>
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    Solving complex logic through systemic decomposition.
                  </p>
                </div>
                <div className="bg-[var(--neo-text)] text-white p-4 border-3 border-[var(--neo-border)] shadow-neo">
                  <p className="font-bold text-sm sm:text-base text-primary">
                    High Fidelity
                  </p>
                  <p className="text-xs text-primary/60 font-mono mt-1">
                    Zero compromise on performance and aesthetic integrity.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Projects Grid Header */}
            <div className="col-span-12 mt-8 mb-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 bg-[var(--neo-text)] flex items-center justify-center text-white">
                  <Terminal weight="bold" className="w-4 h-4" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight">
                  All Implementations
                </h2>
                <div className="h-1 flex-1 bg-[var(--neo-border)]"></div>
              </div>
            </div>

            {/* Project Cards */}
            {DATA.projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1 * index }}
                className="col-span-12 md:col-span-6 neo-brutal-box flex flex-col border-neo-border bg-white shadow-neo hover:shadow-neo-hover-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 group overflow-hidden"
              >
                <div className="relative w-full h-64 border-b-3 border-neo-border overflow-hidden bg-gray-100">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover img-bw-to-color transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Terminal
                        weight="bold"
                        className="w-16 h-16 text-gray-400 group-hover:text-primary transition-colors"
                      />
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-2xl font-black uppercase leading-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border-2 border-neo-border bg-white flex items-center justify-center shadow-neo-sm group-hover:bg-primary transition-all"
                      >
                        <ArrowUpRight weight="bold" className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  <div className="pt-4 border-t-2 border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="font-mono text-[10px] font-bold uppercase text-gray-400">
                        Deployed & Verified
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 border border-neo-border flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                        <Terminal size={12} weight="bold" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    );
}
