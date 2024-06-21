import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 16px;
  width: 400px;
  color: white;
`;

const Title = styled.h2`
  color: #ffd700;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #ffffff;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  color: #999999;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Label = styled.span`
  font-size: 16px;
`;

const Value = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CounterButton = styled.button`
  background-color: #3a3a3a;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 4px;
`;

const CounterValue = styled.span`
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background-color: #3a3a3a;
  color: white;
`;

const MintButton = styled(Button)`
  background-color: #4169e1;
  color: white;
`;

interface MintModalProps {
  onClose: () => void;
  onMint: (amount: number) => void;
}

const MintModal: React.FC<MintModalProps> = ({ onClose, onMint }) => {
  const [amount, setAmount] = useState(1);
  const pricePerNFT = 0.03;

  const incrementAmount = () => setAmount(amount + 1);
  const decrementAmount = () => setAmount(Math.max(1, amount - 1));

  const totalPrice = (amount * pricePerNFT).toFixed(2);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>MINT AN NFT</Title>
        <Subtitle>Join the Paladins Community!</Subtitle>
        <InfoText>You are going to mint a NFT</InfoText>
        
        <Row>
          <Label>NFT Price</Label>
          <Value>{pricePerNFT} ETH</Value>
        </Row>
        
        <Row>
          <Label>Amount</Label>
          <CounterContainer>
            <CounterButton onClick={decrementAmount}>-</CounterButton>
            <CounterValue>{amount}</CounterValue>
            <CounterButton onClick={incrementAmount}>+</CounterButton>
          </CounterContainer>
        </Row>
        
        <Row>
          <Label>Your Total</Label>
          <Value>{totalPrice} ETH</Value>
        </Row>
        
        <ButtonContainer>
          <CancelButton onClick={onClose}>CANCEL</CancelButton>
          <MintButton onClick={() => onMint(amount)}>MINT</MintButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MintModal;