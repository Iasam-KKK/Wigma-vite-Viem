import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

interface CryptoInfoData {
  id: number;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume: number;
}

const CryptoInfo = () => {
  const [cryptoInfo, setCryptoInfo] = useState<CryptoInfoData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCryptoInfo = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          const response = await axios.get('http://localhost:8000/cryptoinfo', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log('CryptoInfo response:', response.data); // Log the response data
          setCryptoInfo(response.data);
        } else {
          setError('You need to be logged in to view the crypto info.');
        }
      } catch (error) {
        console.error('Error fetching crypto info:', error);
        setError('An error occurred while fetching the crypto info.');
      }
    };

    fetchCryptoInfo();
  }, []);

  return (
    <div className="crypto-info">
      {error ? (
        <p>{error}</p>
      ) : cryptoInfo ? (
        <div className="scrollable-container">
          <pre>
            {JSON.stringify(cryptoInfo, null, 2)}
          </pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CryptoInfo;