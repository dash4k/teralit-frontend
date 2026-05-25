function PageFooter() {
  return (
    <footer className='w-full pb-4 pt-6 bg-surface-container-highest dark:bg-inverse-surface'>
      <div className='flex flex-col gap-lg md:flex-row justify-between md:items-center max-w-250 mx-auto px-container-margin'>
        <h2 className='text-headline-md font-display font-bold text-on-surface dark:text-inverse-on-surface'>Teralit</h2>
        <div className='font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface'>
          <ul className='flex flex-row flex-wrap gap-5'>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Medical Disclaimer</li>
            <li>Contact Support</li>
          </ul>
        </div>
        <p className='font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface'>&#xA9; 2026 CC26-PSU247 Coding Camp</p>
      </div>
    </footer>
  );
}

export default PageFooter;
