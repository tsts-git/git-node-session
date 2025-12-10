import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const clearLocalStorage = () => {
    localStorage.setItem('Token', null);
    localStorage.clear();
    navigate('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem 2rem',
        backgroundColor: '#000000',
        color: 'white',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Button
        label="Login"
        onClick={() => navigate('/login')}
        className="p-button-text p-button-plain"
        style={{ color: 'white' }}
      />
      <Button
        label="Register"
        onClick={() => navigate('/register')}
        className="p-button-text p-button-plain"
        style={{ color: 'white' }}
      />
      {localStorage.getItem('Token') ? (
        <>
          <Button
            label="LogOut"
            onClick={clearLocalStorage}
            className="p-button-text p-button-plain"
            style={{ color: 'white' }}
          />
          <Button
            label="Basket"
            onClick={() => navigate('/basket')}
            className="p-button-text p-button-plain"
            style={{ color: 'white' }}
          />
        </>
      ) : null}
      <Button
        label="Products"
        onClick={() => navigate('/')}
        className="p-button-text p-button-plain"
        style={{ color: 'white' }}
      />
    </div>
  );
};

export default Layout;