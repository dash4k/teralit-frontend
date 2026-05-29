import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Navigation = ({
  toggleTheme,
  authedUser,
  logout,
  settingsVisibility,
  setSettingsVisibility,
  mobileSidebarVisibility,
  setMobileSidebarVisibility,
  collapsed,
  setCollapsed,
  onDashboard,
}) => {
  if (onDashboard) return (
    <Sidebar
      settingsVisibility={settingsVisibility}
      setSettingsVisibility={setSettingsVisibility}
      toggleTheme={toggleTheme}
      authedUser={authedUser}
      logout={logout}
      mobileSidebarVisibility={mobileSidebarVisibility}
      setMobileSidebarVisibility={setMobileSidebarVisibility}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
    />
  );
  else return (
    <Navbar
      toggleTheme={toggleTheme}
      loggedIn={(authedUser ? true : false)}
    />
  );
};

export default Navigation;
