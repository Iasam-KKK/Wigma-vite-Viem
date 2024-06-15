import { useState } from 'react';
import axios from 'axios';

const AddToken = () => {
  const [tokenId, setTokenId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);  

  const handleAddToken = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();  

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
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error adding token:', error);
    }
  };

 
  if (formSubmitted) {
    return <AddToken />;
  }

  return (
    <div className="add-token-container">
      <h2>Add Token</h2>
      <form onSubmit={handleAddToken}>
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
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddToken;