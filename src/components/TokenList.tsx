import { useState, useEffect } from 'react';
import axios from 'axios';

interface Token {
  symbol: string;
  name: string;
  quantity: number;
  token_id: number;
}

const TokenList = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          const response = await axios.get('http://localhost:8000/tokens', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log('Tokens response:', response.data); // Log the response data
          setTokens(response.data);
        } else {
          setError('You need to be logged in to view the token list.');
        }
      } catch (error) {
        console.error('Error fetching tokens:', error);
        setError('An error occurred while fetching the token list.');
      }
    };

    fetchTokens();
  }, []);

  return (
    <div>
      <h2>Token List</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {tokens.map((token) => (
            <li key={token.token_id}>
              {token.name} ({token.symbol}): {token.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenList;