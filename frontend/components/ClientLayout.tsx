'use client';

import { usePathname } from 'next/navigation';
import NeoNavbar from './NeoNavbar';
import NeoFooter from './NeoFooter';
import { useEffect } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <NeoNavbar />
      <main id="main-content" className="w-full min-h-screen bg-neo-bg overflow-x-hidden">
        <div key={pathname} className="route-fade">
          {children}
        </div>
      </main>
      <NeoFooter />
    </>
  );
}
