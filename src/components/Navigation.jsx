import { matchPath, useLocation } from "react-router-dom"
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Navigation = ({ 
  toggleTheme, 
  authedUser, 
  logout, 
  settingsVisibility, 
  setSettingsVisibility, 
  mobileSidebarVisibility, 
  setMobileSidebarVisibility 
}) => {
  const location = useLocation();
  const isActive = (path) => !!matchPath({ path, end: false }, location.pathname);
  if (
    isActive('/new') || isActive('/results/*') || isActive('/profile')
  ) return <Sidebar 
    settingsVisibility={settingsVisibility} 
    setSettingsVisibility={setSettingsVisibility} 
    toggleTheme={toggleTheme} 
    authedUser={authedUser} 
    logout={logout} 
    mobileSidebarVisibility={mobileSidebarVisibility} 
    setMobileSidebarVisibility={setMobileSidebarVisibility} 
  />;
  else return <Navbar toggleTheme={toggleTheme} loggedIn={(authedUser ? true : false)} />
}

export default Navigation;
