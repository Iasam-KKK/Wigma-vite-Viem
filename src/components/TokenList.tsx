import { useState, useEffect } from 'react';
import axios from 'axios';

interface CoinData {
  id: number; // Used as the cmcid
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      market_cap: number;
      volume_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
    };
  };
  last_updated: string;
}

const TokenList = () => {
  const [coinData, setCoinData] = useState<CoinData[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          const response = await axios.get('http://localhost:8000/tokens', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = response.data;
          const sortedData = data.sort((a: CoinData, b: CoinData) => a.id - b.id);
          console.log('Sorted Coin Data:', sortedData);
          setCoinData(sortedData);
        } else {
          setError('You need to be logged in to view the coin data.');
        }
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError('An error occurred while fetching the coin data.');
      }
    };

    fetchCoinData();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : coinData.length > 0 ? (
        <div className="scrollable-container">
          <table>
            <thead>
              <tr>
                
                <th>Name</th>
                <th>Symbol</th>
                <th>Price (USD)</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {coinData.map((coin) => (
                <tr key={coin.id}>
                  <td>{coin.name}</td>
                  <td>{coin.symbol}</td>
                  <td>{coin.quote.USD.price}</td>
                  <td>{coin.last_updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TokenList;