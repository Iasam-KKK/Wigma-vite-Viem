import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import '../styles.css';

const StartupPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  const handleToggleRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="startup-page">
      <div className="overlay">
        <div className="form-container">
          {!showRegister ? (
            <LoginForm />
          ) : (
            <RegisterForm onRegisterSuccess={() => {}} />
          )}
        </div>
        <div className="toggle-button">
          <button onClick={handleToggleRegister}>
            {showRegister ? 'Login' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartupPage;