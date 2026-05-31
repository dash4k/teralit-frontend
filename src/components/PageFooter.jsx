import { Link } from 'react-router-dom';
import LinkText from '../components/LinkText.jsx';

const PageFooter = ({ onDashboard }) => {
  if (onDashboard) return null;

  return (
    <footer className='w-full pb-4 pt-6 bg-surface-container-highest dark:bg-inverse-surface'>
      <div className='flex flex-col gap-lg justify-between max-w-250 mx-auto px-container-margin'>
        <h2 className='text-headline-md font-display font-bold text-on-surface dark:text-inverse-on-surface'>
          Teralit
        </h2>
        <div className="w-full flex flex-col items-start justify-center gap-md">
          <div className='font-body-md text-body-md text-on-surface-variant dark:text-inverse-on-surface'>
            <ul className='flex flex-wrap gap-5 pt-1'>
              <li>
                <Link
                  to='https://github.com/dash4k/teralit-frontend'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkText>Frontend</LinkText>
                </Link>
              </li>
              <li>
                <Link
                  to='https://github.com/dash4k/teralit-backend'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkText>Backend</LinkText>
                </Link>
              </li>
              <li>
                <Link
                  to=''
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkText>AI Model</LinkText>
                </Link>
              </li>
              <li>
                <Link
                  to='https://github.com/dash4k/teralit-model-test'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkText>AI Inference</LinkText>
                </Link>
              </li>
            </ul>
          </div>
          <p className='font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface'>
            &#xA9; 2026 CC26-PSU247 Coding Camp
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
