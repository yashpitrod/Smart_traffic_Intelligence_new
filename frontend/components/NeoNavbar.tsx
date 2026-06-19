import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { List as Menu, X } from '@phosphor-icons/react';

export default function NeoNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b-3 border-neo-border">
            <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative">
                <div className="flex items-center justify-between h-16 md:h-20 relative">

                    {/* Left Section: Hamburger (mobile/tablet) */}
                    <div className="flex items-center gap-3 relative z-10">
                        {/* Hamburger Menu - Mobile & Tablet, on left */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="min-[780px]:hidden w-12 h-12 border-3 border-neo-border bg-white flex items-center justify-center shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-secondary transition-all"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X weight="bold" className="w-6 h-6" /> : <Menu weight="bold" className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Desktop Navigation - Absolutely Centered - Visible only on 780px+ */}
                    <div className="hidden min-[780px]:flex items-center gap-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link href="/" className="group cursor-pointer">
                            <div className="w-16 h-10 border-3 border-neo-border bg-primary flex items-center justify-center shadow-[4px_4px_0px_0px_var(--neo-shadow)] group-hover:translate-x-[4px] group-hover:translate-y-[4px] group-hover:shadow-none transition-all duration-200">
                                <span className="font-mono font-bold text-xl text-neo-text uppercase">STI</span>
                            </div>
                        </Link>
                        {[
                            { href: '/architecture', label: 'Architecture' },
                            { href: '/agents', label: 'Agents' },
                            { href: '/dashboard', label: 'Dashboard' },
                            { href: '/pipeline', label: 'Pipeline' },
                            { href: '/team', label: 'Team' },
                        ].map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.href}
                                className="px-4 py-2 font-mono text-xl font-bold border-2 border-neo-border bg-white shadow-[4px_4px_0px_0px_var(--neo-shadow)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none hover:bg-primary text-neo-text transition-all duration-200 uppercase"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section: Hidden or Empty for now to maintain layout */}
                    <div className="flex items-center gap-3 relative z-10 lg:w-[150px] justify-end">
                        {/* AI Button Removed */}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="min-[780px]:hidden absolute top-full left-0 w-full h-[calc(100vh-67px)] md:h-[calc(100vh-83px)] bg-neo-bg bg-grid p-8 flex flex-col gap-5 overflow-y-auto z-40 border-t-3 border-neo-border">
                    {[
                        { href: '/', label: 'Home' },
                        { href: '/architecture', label: 'Architecture' },
                        { href: '/agents', label: 'Agents' },
                        { href: '/dashboard', label: 'Dashboard' },
                        { href: '/pipeline', label: 'Pipeline' },
                        { href: '/team', label: 'Team' },
                    ].map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full py-4 px-6 text-center font-mono font-bold text-xl uppercase border-3 border-neo-border bg-white shadow-[6px_6px_0px_0px_var(--neo-shadow)] hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none hover:bg-primary text-neo-text transition-all duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
