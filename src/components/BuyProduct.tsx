 
 
import ProductCard from './ProductCard';

 
const TokenList: React.FC = () => {
   

  return (
    
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <ProductCard product={{
           name: "Futuristic VR Headset",
           price: 0.00001
         }} 
       />
   
       </div>
       
  );
};

export default TokenList;