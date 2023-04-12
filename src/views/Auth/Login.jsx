import { useHistory, Link } from 'react-router-dom';
import React from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import { useUser } from '../../context/UserContext';
import { signInUser, signUpUser } from '../../services/users';

export default function Login({ isSigningup = false }) {
  const history = useHistory();
  const { setUser } = useUser();

  const handleSubmit = async (email, password) => {
    try {
      if (isSigningup) {
        await signUpUser(email, password);
      } else {
        const loggedIn = await signInUser(email, password);
        setUser({ id: loggedIn.id, email: loggedIn.email });
        history.replace('/home');
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <h2>{isSigningup ? 'Welcome!' : 'Welcome Back!'}</h2>
      <br />
      <LoginForm
        onSubmit={handleSubmit}
        label={isSigningup ? 'Sign up' : 'Sign In'}
      />
      {isSigningup ? (
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      ) : (
        <p>
          Need an account? <Link to="/signup">Sign Up</Link>
        </p>
      )}
    </>
  );
}
