import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaRegSun, FaAlignJustify } from 'react-icons/fa6';
import ThemeContext from '../contexts/ThemeContext.js';
import Logo from './Logo.jsx';
import LinkText from './LinkText.jsx';
import Button from './Button.jsx';
import IconButton from './IconButton.jsx';

const Navbar = ({ toggleTheme, loggedIn }) => {
  const theme = React.useContext(ThemeContext);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [mobileNav, setMobileNav] = React.useState(false);
  const toggleMobileNav = () => setMobileNav((prev) => !prev);

  if (isActive('/check-email') || isActive('/verify-email')) return null;

  return (
    <header className='w-full h-auto top-0 sticky z-50 bg-surface dark:bg-on-background border-b border-outline-variant dark:border-outline shadow-sm'>
      <div className="w-full">
        <nav className="flex justify-between items-center h-16 px-container-margin max-w-250 mx-auto">
          <Link to="/"><Logo /></Link>
          <div className="hidden md:flex items-center">
            <ul className="flex flex-row items-center gap-5">
              {(isActive('/') || isActive('/how-it-works') || isActive('/accuracy')) && (
                <>
                  <li>
                    <Link
                      to='https://github.com/Liyang-A-O/Teralit---Capstone-Project'
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkText>Github</LinkText>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='https://app-teralit-fmn6grajjkiy2gntdy6sjt.streamlit.app/'
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkText>Dataset</LinkText>
                    </Link>
                  </li>
                  <li>
                    <Link to={loggedIn ? '/new' : '/login'}>
                      <Button
                        variant='filled'
                        size='sm'
                        className='rounded-2xl'
                      >
                        Start Scan
                      </Button>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <IconButton onClick={toggleTheme}>
                  {theme === 'light' ? <FaMoon /> : <FaRegSun />}
                </IconButton>
              </li>
            </ul>
          </div>
          <div className="md:hidden">
            <ul className="md:hidden flex flex-row items-center gap-5 text-headline-md">
              <li>
                <IconButton onClick={toggleTheme}>
                  {theme === 'light' ? <FaMoon /> : <FaRegSun />}
                </IconButton>
              </li>
              <li>
                {(isActive('/') || isActive('/how-it-works') || isActive('/accuracy')) && (
                  <IconButton onClick={toggleMobileNav}>
                    <FaAlignJustify />
                  </IconButton>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {mobileNav && (
        <div className="md:hidden flex items-center justify-center w-full py-md border-t border-outline-variant dark:border-outline">
          <ul className="flex flex-col items-center gap-xl">
            <li>
              <LinkText>How It Works</LinkText>
            </li>
            <li>
              <Link to=''>
                <LinkText>Accuracy</LinkText>
              </Link>
            </li>
            <li>
              <Link to={loggedIn ? '/new' : '/login'}>
                <Button
                  onClick={toggleMobileNav}
                  variant='filled'
                  size='sm'
                  className='rounded-2xl'
                >
                  Start Scan
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
