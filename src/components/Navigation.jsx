import React from 'react';
import { FaBookMedical } from 'react-icons/fa6';

function Navigation() {
  return (
    <header className="w-full top-0 sticky z-50 bg-surface dark:bg-on-background border-b border-outline-variant dark:border-outline shadow-sm">
      <nav className="flex justify-between items-center h-16 px-container-margin max-w-[1200px] mx-auto">
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-primary text-[28px]"><FaBookMedical /></span>
          <span className="text-headline-lg font-display font-bold text-primary dark:text-inverse-primary">Teralit</span>
        </div>
        <div className="hidden md:flex items-center gap-lg">
          <ul className="flex flex-row items-center gap-5">
            <li><a className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors cursor-pointer">How It Works</a></li>
            <li><a className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors cursor-pointer">Accuracy</a></li>
            <li><button className="bg-primary text-on-primary font-label-bold text-label-bold px-lg py-sm rounded-full h-[48px] flex items-center hover:bg-on-primary-fixed-variant transition-colors cursor-pointer">Start Scan</button></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
