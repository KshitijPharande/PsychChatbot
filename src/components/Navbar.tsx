'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Wind } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-center pt-5 px-4 relative z-50 shrink-0">
      <div className="flex items-center gap-6 px-6 py-2.5 rounded-full border border-slate-800/80 bg-slate-900/65 backdrop-blur-xl shadow-lg shadow-black/35 select-none">
        <Link 
          href="/" 
          className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
            pathname === '/' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Heart className="w-3.5 h-3.5" /> Chat Sanctuary
        </Link>
        
        <div className="w-[1px] h-3.5 bg-slate-800/80" />
        
        <Link 
          href="/breathing" 
          className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
            pathname === '/breathing' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wind className="w-3.5 h-3.5" /> Breathing Space
        </Link>
      </div>
    </nav>
  );
}
