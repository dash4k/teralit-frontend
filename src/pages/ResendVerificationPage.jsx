import Logo from '../components/Logo';
import BodyText from '../components/BodyText';
import Heading from '../components/Heading';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { resendVerification } from '../utils/api/authentication';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useInput from '../hooks/useInput';

const ResendVerificationPage = () => {
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useInput('');
  const navigate = useNavigate();

  const onSending = async () => {
    setSending(true);
    if (!email) {
      toast.error('Please fill the email form');
      setSending(false);
      return;
    }

    try {
      await toast.promise(resendVerification({ email }), {
        loading: 'Sending verification link your email',
        success: 'Email sent successfully!',
        error: (err) => err?.message ?? 'Error while trying to send email',
      });
      navigate('/check-email');
    } catch (_error) {
      setSending(false);
    }
  };

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center mx-auto gap-lg text-center px-10">
      <Logo />
      <Heading>Resend Email Verification</Heading>
      <BodyText>Please enter your email address and press the button to continue.</BodyText>
      <div className="flex flex-row justify-between items-center h-auto">
        <input type="email" value={email} onChange={setEmail} className='font-body-lg text-body-lg px-1 py-2 border border-outline'/>
        <Button onClick={onSending} loading={sending} disabled={sending} variant='filled' size='md' className='rounded-none h-full'>Send</Button>
      </div>
      {sending && <BodyText>You will be redirected to login page soon!</BodyText>}
    </section>
  );
};

export default ResendVerificationPage;
