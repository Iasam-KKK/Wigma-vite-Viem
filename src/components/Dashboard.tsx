import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import '../styles.css';
import SideDrawer from './SideDrawer';
import TokenList from './TokenList';
import AddToken from './AddToken';


const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        console.log('Access token:', accessToken); // Debugging
        if (accessToken) {
          setIsLoggedIn(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndRedirect();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    navigate('/');
  };

  console.log('Is logged in:', isLoggedIn); // Debugging
  console.log('Is loading:', isLoading); // Debugging

  return (
    <div className="dashboard">
      <SideDrawer />
      <div className="dashboard-content">
        {isLoading ? (
          <p>Loading...</p>
        ) : isLoggedIn ? (
          <>
            <h1>Dashboard</h1>
            <Routes>
              
              <Route path="/tokenlist" element={<TokenList />} />
              <Route path="/addtoken" element={<AddToken />} />
            </Routes>
            <Outlet />
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>You need to be logged in to access the dashboard.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;