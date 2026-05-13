import React from 'react';

function PageFooter() {
  return (
    <footer className='w-full pb-4 pt-6 bg-surface-container-highest dark:bg-inverse-surface'>
      <div className='flex flex-row justify-between items-center max-w-[1200px] mx-auto px-container-margin'>
        <div className='flex flex-col items-center md:items-start gap-xs'>
          <h2 className='text-headline-md font-display font-bold text-on-surface dark:text-inverse-on-surface'>Teralit</h2>
        </div>
        <div className='font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface'>
          <ul className='flex flex-row gap-5'>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Medical Disclaimer</li>
            <li>Contact Support</li>
          </ul>
        </div>
        <div className='flex flex-col items-center md:items-start gap-xs'>
          <p className='font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface'>&#xA9; 2026 CC26-PSU247 Coding Camp</p>
        </div>
      </div>
    </footer>
  );
}

export default PageFooter;
