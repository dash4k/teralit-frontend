import { Link } from 'react-router-dom';
import { FaAddressCard, FaPowerOff } from 'react-icons/fa6';
import Button from './Button';
import toast from 'react-hot-toast';

const SidebarSettings = ({
  settingsVisibility,
  logout,
  setSettingsVisibility
}) => {
  const onlogout = () => {
    setSettingsVisibility(false);
    toast.promise(logout(), {
      loading: 'Logging off your account...',
      success: 'Logout success!',
      error: (err) => err?.message ?? 'Error while trying to logout',
    });

  };
  return (
    <div
      className={`${settingsVisibility ? '' : 'hidden'} fixed bottom-15 left-5 z-100 rounded-md bg-background dark:bg-on-background w-50 h-auto flex flex-col justify-center items-center transition-opacity duration-75 border-outline border`}
    >
      <Link
        to='/profile'
        onClick={() => setSettingsVisibility(false)}
        className="w-full"
      >
        <Button
          startIcon={<FaAddressCard />}
          variant="ghost"
          fullWidth
          className="justify-start pl-1 text-on-surfacedark:text-inverse-on-surface rounded-t-mdrounded-b-none"
        >
          View Profile
        </Button>
      </Link>
      <Button
        startIcon={<FaPowerOff />}
        onClick={onlogout}
        variant="ghost"
        fullWidth
        className="justify-start pl-1 dark:text-inverse-on-surface rounded-b-md rounded-t-none"
      >
        Logout
      </Button>
    </div>
  );
};

export default SidebarSettings;
