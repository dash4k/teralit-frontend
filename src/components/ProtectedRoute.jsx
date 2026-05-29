import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  authedUser,
  children
}) => {
  if (authedUser === null) return (
    <Navigate
      to='/login'
      replace
    />
  );
  return children;
};

export default ProtectedRoute;
