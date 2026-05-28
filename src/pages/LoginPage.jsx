import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useInput from '../hooks/useInput.js';
import { login } from '../utils/api/authentication.js';
import toast from 'react-hot-toast';
import { FaArrowsRotate } from "react-icons/fa6";
import Input from '../components/Input.jsx';
import BodyText from '../components/BodyText.jsx';
import Button from '../components/Button.jsx';
import Heading from '../components/Heading.jsx';

const LoginPage = ({ loginSuccess }) => {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [logining, setLogining] = useState(false);
  const [resend, setResend] = useState(false);
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    setLogining(true);
    setResend(false);

    if (email === '' || password === '') {
      setLogining(false);
      return;
    } 

    try {
      const { error, data } = await toast.promise(login({ email, password }), {
        loading: 'Trying to login',
        success: 'Login success!',
        error: (err) => err?.message ?? 'Error while trying to login',
      });
      loginSuccess(data);

      toast.loading('Redirecting you to dashboard...', {
        duration: 1000,
      });
      
      setTimeout(() => {
        navigate('/new')
      }, 1500);
    } catch (error) {
      if (error.message === 'Please verify your email address first') setResend(true);
      setLogining(false);
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center md:justify-between mx-auto">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <form onSubmit={onLogin} className="flex flex-col gap-container-margin px-10 max-w-250 w-full">
          {resend && <div className='flex flex-row justify-start items-center gap-2'>
            <BodyText>Not receiving verification email?</BodyText>
            <Link to='/resend-verification-email'>
              <Button variant='ghost' color='tertiary' size='sm'>
                  Resend Here
                </Button>
              </Link>
          </div>}
          <Heading>Login to Teralit</Heading>
          <BodyText>Please enter your credentials:</BodyText>
          <div className='flex flex-col gap-container-margin'>
            <Input 
              id='email' 
              type='email' 
              value={email} 
              setValue={setEmail} 
              label='Email' 
              placeholder='user@email.domain' 
            />
            <Input 
              id='password' 
              type='password' 
              value={password} 
              setValue={setPassword} 
              label='Password' 
              placeholder='••••••••••••••' 
            />
          </div>
          <Button color='primary' type="submit" disabled={logining} loading={logining}>Login</Button>
          <div className='flex flex-row justify-between items-center'>
            <BodyText>Don't have an account?</BodyText>
            <Link to='/register'><Button variant='tonal' size='sm'>Register Here</Button></Link>
          </div>
        </form>
      </div>
      <aside className="hidden md:flex w-1/2 h-full bg-secondary">
        <img src="./authpage.svg" alt="Graphic" className='w-full h-full object-cover'/>
      </aside>
    </section>
  );
};

export default LoginPage;
