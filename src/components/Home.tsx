import React, { useState } from 'react';
import styled from 'styled-components';
import MintModal from './MintModal';

// Styled components
const AppContainer = styled.div`
  background-color: #1a1a1a;
  color: white;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2a2a2a;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavItem = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

 

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const CTAButton = styled.button`
  background-color: #00ff00;
  color: black;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
`;

const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const NFTCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const NFTImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const NFTInfo = styled.div`
  padding: 1rem;
`;

const NFTTitle = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const NFTButton = styled.button`
  background-color: #00ff00;
  color: black;
  border: none;
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;
  clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
`;



// Main component
const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleMint = (amount: number) => {
    console.log(`Minting ${amount} NFTs`);
    // Implement your minting logic here
   
    toggleModal();
  };

  return (
    <AppContainer>
      <Header>
        <Nav>
          <NavItem href="#">Home</NavItem>
          <NavItem href="#">Mint</NavItem>
          <NavItem href="#">Staking</NavItem>
          <NavItem href="#">Account</NavItem>
        </Nav>
        <div style={{
        "border": "none",
        "padding": "0.5rem 1rem",
        "cursor": "pointer",
        "clipPath": "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)"}}>
        <w3m-button/>
        </div>
      </Header>

      <HeroSection>
        <Title>Unlock Your Creativity with Paladins</Title>
        <Subtitle>Mint, Showcase, and Own Your Unique Creations in the World of NFTs</Subtitle>
        <CTAButton onClick={toggleModal}>Mint Your ERC404</CTAButton>
      </HeroSection>

      <NFTGrid>
        {[1, 2, 3, 4].map((item) => (
          <NFTCard key={item}>
            <NFTImage src={`https://via.placeholder.com/250x200?text=NFT+${item}`} alt={`NFT ${item}`} />
            <NFTInfo>
              <NFTTitle>Paladins #{item}</NFTTitle>
              <NFTButton onClick={toggleModal}>Buy NFT</NFTButton>
            </NFTInfo>
          </NFTCard>
        ))}
      </NFTGrid>

      {isModalOpen && (
        <MintModal onClose={toggleModal} onMint={handleMint} />
      )}
    </AppContainer>
  );
};

export default HomePage;