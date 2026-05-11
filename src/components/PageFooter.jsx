import React from 'react';

function PageFooter() {
  return (
    <footer className='flex flex-row justify-between items-center w-full px-12 pb-3 pt-6 bg-surface-container-highest'>
      <div className='flex flex-col items-center md:items-start gap-xs'>
        <h2 className='text-headline-md font-display font-bold text-on-surface'>Teralit</h2>
        <p className='font-body-sm text-body-sm text-on-surface-variant'>&#xA9; 2026 CC26-PSU247 Coding Camp</p>
      </div>
      <div className='font-body-sm text-body-sm text-on-surface-variant'>
        <ul className='flex flex-row gap-5'>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Medical Disclaimer</li>
          <li>Contact Support</li>
        </ul>
      </div>
    </footer>
  );
}

export default PageFooter;
