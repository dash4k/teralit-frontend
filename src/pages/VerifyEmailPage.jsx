import Logo from '../components/Logo';
import BodyText from '../components/BodyText';
import Heading from '../components/Heading';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { verifyEmail } from '../utils/api/authentication';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const VerifyEmailPage = () => {
  const [verifying, setVerifying] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const onVerify = async () => {
    setVerifying(true);
    if (!token) {
      toast.error('Invalid verification link');
      setVerifying(false);
      return;
    }

    try {
      await toast.promise(verifyEmail(token), {
        loading: 'Verifying your email',
        success: 'Account verified successfully! Please proceed to login!',
        error: (err) => err?.message ?? 'Error while trying to verify your account',
      });
      navigate('/login');
    } catch (_error) {
      setVerifying(false);
    }
  };

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center mx-auto gap-lg text-center px-10">
      <Logo />
      <Heading>Email Verification</Heading>
      <BodyText>Press the button below to verify your email!</BodyText>
      <Button
        onClick={onVerify}
        loading={verifying}
        disabled={verifying}
        variant='outlined'
        size='lg'
        className='rounded-4xl'
      >
          Verify
      </Button>
      {verifying && <BodyText>You will be redirected to login page soon!</BodyText>}
    </section>
  );
};

export default VerifyEmailPage;
