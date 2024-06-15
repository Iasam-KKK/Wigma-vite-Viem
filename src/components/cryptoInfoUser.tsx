import React, { useState, useEffect } from 'react';
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

const CryptoInfoUser: React.FC = () => {
  const [cryptoInfo, setCryptoInfo] = useState<CryptoInfoData[]>([]);
  const [error, setError] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoInfoData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCryptoInfo = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          const response = await axios.get(`http://localhost:8000/cryptoinfo/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log('CryptoInfo response:', response.data);
          setCryptoInfo(response.data);
        } else {
          setError('You need to be logged in to view your crypto info.');
        }
      } catch (error) {
        console.error('Error fetching crypto info:', error);
        setError('An error occurred while fetching your crypto info.');
      }
    };

    fetchCryptoInfo();
  }, []);

  const openModal = (crypto: CryptoInfoData) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCrypto(null);
    setIsModalOpen(false);
  };

  return (
    <div className="crypto-info">
      {error ? (
        <p>{error}</p>
      ) : cryptoInfo.length > 0 ? (
        <div className="scrollable-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cryptoInfo.map((crypto) => (
                <tr key={crypto.id}>
                  <td>{crypto.name}</td>
                  <td>{crypto.symbol}</td>
                  <td>
                    <button onClick={() => openModal(crypto)}>Info</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {isModalOpen && selectedCrypto && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCrypto.name} ({selectedCrypto.symbol})</h2>
            <pre>{JSON.stringify(selectedCrypto, null, 2)}</pre>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoInfoUser;