import { useState, useEffect } from 'react';
import TokenList from './TokenList';
import CryptoInfo from './CryptoInfo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Dashboard = () => {
  const [tokenId, setTokenId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showComponent, setShowComponent] = useState('tokenList');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          setIsLoggedIn(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndRedirect();
  }, [navigate]);

  const handleAddToken = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.post(
        'http://localhost:8000/addtoken/',
        { token_id: tokenId, quantity },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTokenId('');
      setQuantity('');
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className={`dashboard ${isLoggedIn ? 'blur' : ''}`}>
      {isLoading ? (
        <p>Loading...</p>
      ) : isLoggedIn ? (
        <div className="overlay">
          <h1>Dashboard</h1>
          <div className="token-input">
            <input
              type="text"
              placeholder="Token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={handleAddToken}>Add</button>
            {error && <p>{error}</p>}
          </div>
          <div className="nav-buttons">
            <button onClick={() => setShowComponent('tokenList')}>Token List</button>
            <button onClick={() => setShowComponent('cryptoInfo')}>Crypto Info</button>
          </div>
          {showComponent === 'tokenList' && <TokenList />}
          {showComponent === 'cryptoInfo' && <CryptoInfo />}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>You need to be logged in to access the dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;