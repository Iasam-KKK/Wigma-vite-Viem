import { useState } from 'react';
import axios from 'axios';

const AddToken = () => {
  const [tokenId, setTokenId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

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

  return (
    <div className="add-token-container">
      <h2>Add Token</h2>
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
    </div>
  );
};

export default AddToken;