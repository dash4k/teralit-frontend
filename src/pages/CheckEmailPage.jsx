import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import BodyText from '../components/BodyText';
import Heading from '../components/Heading';

const CheckEmailPage = () => {
  return (
    <section className="w-full h-dvh flex flex-col items-center justify-center mx-auto gap-lg text-center px-10">
      <Logo />
      <Heading>One more step to join!</Heading>
      <BodyText>Please check your email and click the verification link to continue!</BodyText>
      <div className="flex flex-row items-center gap-lg">
        <BodyText>Already verified?</BodyText>
        <Link to='/login'><Button>Login</Button></Link>
      </div>
    </section>
  );
};

export default CheckEmailPage;
