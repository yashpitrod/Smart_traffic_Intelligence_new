import { SystemData } from '../types';
import { GithubLogo as Github, LinkedinLogo as Linkedin, Code as Code2, InstagramLogo as Instagram, Envelope as Mail, TwitterLogo as Twitter, Calendar } from '@phosphor-icons/react/ssr';

export const DATA: SystemData = {
  name: "Neo AI Platform",
  contact: {
    email: "ops@neo-ai.com",
    portfolio: "https://neo-ai.com",
    links: [
      { name: "GitHub", url: "https://github.com/neo-ai", icon: Github },
      { name: "LinkedIn", url: "https://www.linkedin.com/company/neo-ai", icon: Linkedin },
      { name: "Twitter", url: "https://x.com/neo_ai_platform", icon: Twitter },
      { name: "Docs", url: "https://docs.neo-ai.com", icon: Code2 },
      { name: "Discord", url: "https://discord.gg/neo-ai", icon: Instagram },
      { name: "Support", url: "mailto:ops@neo-ai.com", icon: Mail },
      { name: "Demo", url: "https://cal.com/sugarytreat/demo", icon: Calendar },
    ],
  },
  summary: "Neo is a next-generation agentic platform designed for autonomous orchestration. We provide the infrastructure for building, deploying, and scaling multi-agent systems that solve complex business logic through recursive reasoning and tool-integrated workflows.",
  workExperience: [
    {
      title: "Core Platform v1.0",
      company: "Neo Systems",
      place: "Global Node",
      date: "Q1 2026 - Present",
      description: "Laying the foundation for autonomous agentic orchestration.",
      points: [
        "Architected the recursive reasoning engine for multi-agent coordination.",
        "Implemented high-concurrency tool integration layer for real-time API execution."
      ]
    },
    {
      title: "Agentic Alpha",
      company: "Neo Research",
      place: "Distributed",
      date: "2025 - 2026",
      description: "Initial research into long-context reasoning and memory management.",
      points: [
        "Developed proprietary RAG strategies for sub-second knowledge retrieval.",
        "Fine-tuned character-level transformers for specialized agent personas."
      ]
    }
  ],
  education: [
    {
      degree: "Neural Architecture & Logic",
      institution: "Neo University",
      date: "Infinite Loop",
      details: "Specialization in Multi-Agent Systems and Recursive Task Decomposition."
    }
  ],
  projects: [
    {
      title: "Guardian: Autonomous Security Agent",
      tech: ["LangGraph", "Python", "ShieldCheck", "NetworkX"],
      description: "An agentic system designed to monitor, detect, and mitigate real-time security threats in distributed infrastructure.",
      points: [
        "Achieves 99.9% uptime in threat detection using recursive log analysis.",
        "Automated mitigation pipelines reduce incident response time by 85%."
      ],
      url: "https://neo-ai.com/solutions/guardian",
      image: "/images/projects/xgen-ai.webp"
    },
    {
      title: "Analyst: Financial Intelligence Agent",
      tech: ["Next.js", "FastAPI", "Pandas", "LLM-RAG"],
      description: "High-frequency financial analysis agent capable of processing millions of data points for market sentiment.",
      points: [
        "Processes real-time market feeds with sub-100ms latency.",
        "Generates comprehensive risk assessment reports with 94% accuracy."
      ],
      url: "https://neo-ai.com/solutions/analyst",
      image: "/images/projects/mira.webp"
    },
    {
      title: "Architect: Infra-as-Code Agent",
      tech: ["Terraform", "Go", "GPT-4o", "Neo-SDK"],
      description: "Self-healing infrastructure agent that generates and applies cloud configurations based on natural language intent.",
      points: [
        "Automates complex multi-cloud deployments through natural language.",
        "Self-corrects configuration drifts in real-time."
      ],
      url: "https://neo-ai.com/solutions/architect",
      image: "/images/projects/xadmin.webp"
    },
    {
      title: "Concierge: Enterprise Voice AI",
      tech: ["Pipecat", "WebRTC", "VAD", "Neo-Voice"],
      description: "Low-latency voice agentic system for enterprise-level customer interaction and automated support.",
      points: [
        "Reduces average call handling time by 40% through intelligent routing.",
        "Achieves human-like latency in complex query resolution."
      ],
      url: "https://neo-ai.com/solutions/concierge",
      image: "/images/projects/grand-plaza.webp"
    }
  ],
  skills: {
    programming: ["Python", "TypeScript", "Go", "Rust", "C++", "SQL"],
    ai_ml: ["Multi-Agent Orchestration", "Recursive Reasoning", "RAG Strategies", "Prompt Engineering", "Fine-tuning", "Transformers"],
    data: ["Vector Databases", "Graph Theory", "Semantic Search", "Real-time Analytics"],
    misc: ["Distributed Systems", "Cloud Native", "Edge Computing"],
    soft: ["Autonomous Logic", "Recursive Problem Solving", "Systemic Thinking"]
  },
  achievements: [
    {
      title: "Turing Grade Reasoning Certification",
      organization: "Neo Ethics Board",
      date: "Jan 2026",
      points: [
        "Validated agentic reasoning capabilities across 50+ complex benchmarks.",
        "Verified safe-failure protocols for autonomous decision making."
      ]
    },
    {
      title: "Global Scalability Award",
      organization: "Agentic Infrastructure Summit",
      date: "Dec 2025",
      points: [
        "Recognized for handling 1M+ concurrent agent instances with minimal overhead.",
        "Innovation award for distributed memory management."
      ]
    }
  ],
};
