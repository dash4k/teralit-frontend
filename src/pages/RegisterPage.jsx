import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useInput from '../hooks/useInput.js';
import { register } from '../utils/api/authentication.js';
import Input from '../components/Input.jsx';
import BodyText from '../components/BodyText.jsx';
import Button from '../components/Button.jsx';
import Heading from '../components/Heading.jsx';
import { useState } from 'react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [confirmPassword, setConfirmPassword] = useInput('');
  const [name, setName] = useInput('');
  const [registering, setRegistering] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    setRegistering(true);

    if (email === '' || password === '' || name === '' || confirmPassword === '') {
      toast.error('Each input must be filled!');
      setRegistering(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password does not match!');
      setRegistering(false);
      return;
    }

    try {
      await toast.promise(register({ email, password, name }), {
        loading: 'Registering your account...',
        success: 'Account registered successfully!',
        error: (err) => err?.message ?? 'Error while trying to register your account!',
      });
      navigate('/check-email');
    } catch (_error) {
      setRegistering(false);
    }
  };

  return (
    <section className="w-full h-dvh flex items-center justify-center md:justify-between mx-auto">
      <aside className="hidden md:flex w-1/2 h-full bg-secondary">
        <img
          src="./authpage.svg"
          alt="Graphic"
          className='w-full h-full object-cover'
        />
      </aside>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <form
          onSubmit={onLogin}
          className="flex flex-col gap-container-margin px-10 max-w-250 w-full"
        >
          <Heading>Welcome to Teralit!</Heading>
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
            <Input
              id='confirmPassword'
              type='password'
              value={confirmPassword}
              setValue={setConfirmPassword}
              label='Confirm Password'
              placeholder='••••••••••••••'
            />
            <Input
              id='name'
              type='text'
              value={name}
              setValue={setName}
              label='Name'
              placeholder='Full Name'
            />
          </div>
          <Button
            color='primary'
            type="submit"
            disabled={registering}
            loading={registering}
          >Register</Button>
          <div className='flex flex-row justify-between items-center'>
            <BodyText>Already have an account?</BodyText>
            <Link to='/login'><Button
              variant='tonal'
              size='sm'
            >Login Here</Button></Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
