import { matchPath, useLocation } from "react-router-dom";

const PageFooter = () => {
  const location = useLocation();
  const isActive = (path) => !!matchPath({ path, end: false }, location.pathname);
  if (isActive('/new') || isActive('/results/*') || isActive('/profile')) return null;

  return (
    <footer className='w-full pb-4 pt-6 bg-surface-container-highest dark:bg-inverse-surface'>
      <div className='flex flex-col gap-lg md:flex-row justify-between max-w-250 mx-auto px-container-margin'>
        <h2 className='text-headline-md font-display font-bold text-on-surface dark:text-inverse-on-surface'>Teralit</h2>
        <div className='font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface'>
          <ul className='flex md:flex-col flex-wrap gap-5'>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
        </div>
        <div className='font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface'>
          <ul className='flex md:flex-col flex-wrap gap-5'>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
        </div>
        <div className='font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface'>
          <ul className='flex md:flex-col flex-wrap gap-5'>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
        </div>
        <p className='font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface'>
          &#xA9; 2026 CC26-PSU247 Coding Camp
        </p>
      </div>
    </footer>
  );
}

export default PageFooter;
