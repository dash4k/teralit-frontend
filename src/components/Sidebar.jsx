import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext.js';
import IconButton from './IconButton.jsx';
import {
  FaMoon,
  FaRegSun,
  FaAlignJustify,
  FaMattressPillow,
  FaCirclePlus,
  FaClock
} from 'react-icons/fa6';
import Button from './Button.jsx';
import BodyText from './BodyText.jsx';
import SidebarSettings from './SidebarSettings.jsx';

const Sidebar = ({
  toggleTheme,
  authedUser,
  logout,
  settingsVisibility,
  setSettingsVisibility,
  mobileSidebarVisibility,
  setMobileSidebarVisibility,
  collapsed,
  setCollapsed,
}) => {
  if (!authedUser) return null;

  const theme = useContext(ThemeContext);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <>
      <header className='lg:hidden w-auto h-auto top-0 left-0 fixed z-100 flex flex-row'>
        <aside
          onClick={(e) => e.stopPropagation()}
          className={`lg:hidden flex-col gap-lg flex z-50 pt-4 bg-surface dark:bg-inverse-surface border-r border-outline min-h-dvh text-on-surface transition-all duration-300 overflow-hidden ${mobileSidebarVisibility ? 'top-0 left-0 w-60 px-4' : 'w-0'}`}
        >
          <div className="flex flex-row items-center justify-between">
            <Link to='/'>
              <h2 className='text-headline-md font-display font-bold text-on-surface dark:text-inverse-on-surface whitespace-nowrap'>
                Teralit
              </h2>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-start gap-sm">
            <Link
              to='/new'
              className="w-full"
            >
              <Button
                variant="ghost"
                fullWidth
                startIcon={<FaCirclePlus />}
                className="justify-start pl-1 text-primary dark:text-inverse-primary whitespace-nowrap"
              >
                New Scanner
              </Button>
            </Link>
            <Link
              to='/results'
              className="w-full"
            >
              <Button
                variant="ghost"
                fullWidth
                startIcon={<FaClock />}
                className="justify-start pl-1 text-primary dark:text-inverse-primary whitespace-nowrap"
              >
                History
              </Button>
            </Link>
          </div>
          <div
            className="mt-auto -mx-4 border-t hover:bg-surface-container-highest dark:hover:bg-on-surface-variant hover:cursor-pointer dark:text-inverse-on-surface"
            onClick={(e) => {
              e.stopPropagation();
              setSettingsVisibility((prev) => !prev);
            }}
          >
            <div className="flex flex-row items-center justify-start gap-md p-4">
              <div className="w-6 h-6 p-4 rounded-full bg-primary flex items-center justify-center text-on-primary dark:text-primary dark:bg-inverse-primary font-headline-md text-headline-md shrink-0">
                {authedUser?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start justify-center gap-sm min-w-0 w-full">
                <BodyText className="truncate w-full">{authedUser?.name}</BodyText>
                <p className="text-label-bold font-label-bold truncate w-full">{authedUser?.email}</p>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex-1">
          <nav className="flex justify-between items-center h-16 px-container-margin max-w-250 mx-auto backdrop-blur-xs">
            <div className="lg:hidden">
              <ul className="flex flex-row items-center gap-5 text-headline-md">
                <li>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileSidebarVisibility((prev) => !prev);
                    }}
                  >
                    <FaAlignJustify />
                  </IconButton>
                </li>
                <li>
                  <IconButton
                    onClick={toggleTheme}
                  >
                    {theme === 'light' ? <FaMoon /> : <FaRegSun />}
                  </IconButton>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <aside className={`hidden lg:flex flex-col ${collapsed ? 'items-center' : ''} gap-lg fixed top-0 left-0 w-full ${!collapsed ? 'lg:w-60' : 'lg:w-10'} px-4 pt-4 bg-surface dark:bg-inverse-surface border-r border-outline min-h-dvh text-on-surface transition-all duration-300`}>
        {!collapsed && (
          <>
            <div className="flex flex-row items-center justify-between">
              <Link to='/'>
                <h2 className='text-headline-md font-display font-bold text-on-surface dark:text-inverse-on-surface'>
                    Teralit
                </h2>
              </Link>
              <IconButton onClick={toggleCollapsed}>
                <FaMattressPillow />
              </IconButton>
            </div>
            <div className="flex flex-col items-center justify-start gap-sm">
              <Link
                to='/new'
                className="w-full"
              >
                <Button
                  variant="ghost"
                  fullWidth
                  startIcon={<FaCirclePlus />}
                  className="justify-start pl-1 text-primary dark:text-inverse-primary"
                >
                    New Scanner
                </Button>
              </Link>
              <Link
                to='/results'
                className="w-full"
              >
                <Button
                  variant="ghost"
                  fullWidth
                  startIcon={<FaClock />}
                  className="justify-start pl-1 text-primary dark:text-inverse-primary"
                >
                    History
                </Button>
              </Link>
            </div>
            <div
              className="mt-auto -mx-4 border-t hover:bg-surface-container-highest dark:hover:bg-on-surface-variant hover:cursor-pointer dark:text-inverse-on-surface"
              onClick={(e) => {
                e.stopPropagation();
                setSettingsVisibility((prev) => !prev);
              }}
            >
              <div className="flex flex-row items-center justify-start gap-lg p-4">
                <div className="w-6 h-6 p-4 rounded-full bg-primary flex items-center justify-center text-on-primary dark:text-primary dark:bg-inverse-primary font-headline-md text-headline-md shrink-0">
                  {authedUser?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col items-start justify-center gap-sm min-w-0 w-full">
                  <BodyText className="truncate w-full">{authedUser?.name}</BodyText>
                  <p className="text-label-bold font-label-bold truncate w-full">{authedUser?.email}</p>
                </div>
              </div>
            </div>
          </>
        )}
        {collapsed && (
          <>
            <IconButton onClick={toggleCollapsed}>
              <FaMattressPillow />
            </IconButton>
            <div className="flex flex-col items-center justify-start gap-lg">
              <IconButton>
                <FaCirclePlus />
              </IconButton>
              <IconButton>
                <FaClock />
              </IconButton>
            </div>
            <div
              className="mt-auto self-stretch -mx-4 py-4 flex justify-center items-centerhover:bg-surface-container-highest dark:hover:bg-on-surface-varianthover:cursor-pointer dark:text-inverse-on-surface"
              onClick={(e) => {
                e.stopPropagation();
                setSettingsVisibility((prev) => !prev);
              }}
            >
              <div className="w-6 h-6 p-4 rounded-full bg-primary flex items-center justify-center text-on-primary dark:text-primary dark:bg-inverse-primary font-headline-md text-headline-md shrink-0">
                {authedUser.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </>
        )}
      </aside>
      <header className="top-0 right-0 w-auto hidden fixed lg:flex flex-row justify-end items-start px-10 pt-4">
        <IconButton onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaRegSun />}
        </IconButton>
      </header>
      <SidebarSettings
        settingsVisibility={settingsVisibility}
        logout={logout}
        setSettingsVisibility={setSettingsVisibility}
      />
    </>
  );
};

export default Sidebar;
