import React from 'react';
import { FaMoon, FaRegSun, FaAlignJustify } from 'react-icons/fa6';
import ThemeContext from '../contexts/ThemeContext.js';

function Navigation({ toggleTheme }) {
  const theme = React.useContext(ThemeContext);
  const [mobileNav, setMobileNav] = React.useState(false);
  const toggleNav = () => setMobileNav((prev) => !prev);

  return (
    <header className='w-full h-full top-0 sticky z-50 bg-surface dark:bg-on-background border-b border-outline-variant dark:border-outline shadow-sm'>
      <div className="w-full">
        <nav className="flex justify-between items-center h-16 px-container-margin max-w-250 mx-auto">
          <div className="flex items-center gap-md text-on-primary bg-primary-container rounded-sm px-3">
            <span className="text-headline-lg font-display font-bold">T</span>
          </div>
          <div className="hidden md:flex items-center">
            <ul className="flex flex-row items-center gap-5">
              <li><a className="text-on-surface-variant dark:text-inverse-on-surface font-label-md text-label-md hover:text-primary transition-colors cursor-pointer">How It Works</a></li>
              <li><a className="text-on-surface-variant dark:text-inverse-on-surface font-label-md text-label-md hover:text-primary transition-colors cursor-pointer">Accuracy</a></li>
              <li><button className="bg-primary text-on-primary font-label-bold text-label-bold px-lg py-sm rounded-full h-[48px] flex items-center hover:bg-on-primary-fixed-variant transition-colors cursor-pointer">Start Scan</button></li>
              <li>
                <button className='text-on-surface-variant dark:text-inverse-primary pt-2' onClick={toggleTheme}>
                  {theme === 'light' ? <FaMoon /> : <FaRegSun />}
                </button>
              </li>
            </ul>
          </div>
          <div className="md:hidden">
            <ul className="md:hidden flex flex-row items-center gap-5 text-headline-md">
              <li>
                <button className='text-on-surface-variant dark:text-inverse-primary pt-2' onClick={toggleTheme}>
                  {theme === 'light' ? <FaMoon /> : <FaRegSun />}
                </button>
              </li>
              <li>
                <button className='text-on-surface-variant dark:text-inverse-primary pt-2' onClick={toggleNav}>
                  <FaAlignJustify />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {mobileNav && <div className="md:hidden flex items-center justify-center w-full py-md border-t border-outline-variant dark:border-outline">
        <ul className="flex flex-col items-center gap-5">
          <li><a className="text-on-surface-variant dark:text-inverse-on-surface font-label-md text-label-md hover:text-primary transition-colors cursor-pointer">How It Works</a></li>
          <li><a className="text-on-surface-variant dark:text-inverse-on-surface font-label-md text-label-md hover:text-primary transition-colors cursor-pointer">Accuracy</a></li>
          <li><button className="bg-primary text-on-primary font-label-bold text-label-bold px-lg py-sm rounded-full h-[48px] flex items-center hover:bg-on-primary-fixed-variant transition-colors cursor-pointer">Start Scan</button></li>
        </ul>
      </div>}
    </header>
  );
}

export default Navigation;
