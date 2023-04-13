import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { signOutUser } from '../../services/users';

export default function Header() {
  const { user, setUser } = useUser();
  const handleLogout = () => {
    signOutUser();
    setUser();
  };

  return (
    <header>
      <Link to="/home">
        <h1>To-Do List</h1>
      </Link>
      {user ? (
        <Link to="/">
          <button onClick={handleLogout}>Sign Out</button>
        </Link>
      ) : (
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
      )}
    </header>
  );
}
