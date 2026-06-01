import { useNavigate, Link } from 'react-router-dom';
import { FaCamera, FaClipboardList, FaHouse, FaX, FaChevronRight } from 'react-icons/fa6';
import Heading from '../components/Heading.jsx';
import BodyText from '../components/BodyText.jsx';
import Logo from '../components/Logo.jsx';

const LINKS = [
  { icon: <FaHouse />, label: 'Home', desc: 'Landing page', path: '/' },
  { icon: <FaCamera />, label: 'New scan', desc: 'Analyse a skin image', path: '/new' },
  { icon: <FaClipboardList />, label: 'My results', desc: 'View past sessions', path: '/results' },
];

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-dvh px-container-margin mx-auto flex flex-col items-center justify-center">
      <div className="w-full max-w-100 flex flex-col items-center text-center gap-lg">
        <Link to='/'>
            <Logo />
        </Link>
        <div>
          <p className="text-display font-display text-primary dark:text-inverse-primary" style={{ letterSpacing: '-0.04em' }}>404</p>
          <Heading>Page not found</Heading>
        </div>
        <BodyText>
          Looks like this page doesn't exist or was moved. Let's get you back on track.
        </BodyText>
        <div className="w-full border border-outline rounded-lg overflow-hidden">
          <div className="bg-surface-container-low dark:bg-inverse-surface px-md py-xs border-b border-outline">
            <p className="text-label-bold font-label-bold text-primary dark:text-inverse-primary uppercase tracking-widest">
              Where would you like to go?
            </p>
          </div>
          <div className="flex flex-col gap-xs p-sm">
            {LINKS.map(({ icon, label, desc, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="w-full flex items-center gap-md p-sm rounded border border-transparent hover:border-outline transition-all text-left cursor-pointer"
              >
                <div className="w-8 h-8 rounded bg-surface-container-low dark:bg-inverse-surface border border-outline flex items-center justify-center text-primary dark:text-inverse-primary shrink-0">
                  {icon}
                </div>
                <div className="flex-1">
                  <p className="text-body-sm font-medium text-on-surface dark:text-inverse-on-surface">{label}</p>
                  <p className="text-label-md font-label-md text-on-surface-variant dark:text-inverse-on-surface">{desc}</p>
                </div>
                <span className="text-on-surface-variant dark:text-inverse-on-surface">
                    <FaChevronRight />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
