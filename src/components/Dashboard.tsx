import  { useEffect } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, checkAuthStatus } from '../store/userSlice';
import { RootState, AppDispatch } from '../store';
import '../styles.css';
import SideDrawer from './SideDrawer';
import TokenList from './TokenList';
import AddToken from './AddToken';
import DashboardChart from './DashboardChart';

const Dashboard = () => {
  const { isLoggedIn, isLoading, error, userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn && !isLoading && !error) {
      navigate('/');
    }
  }, [isLoggedIn, isLoading, error, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="dashboard">
      <SideDrawer />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        {userData && <p>Welcome, {userData.username}!</p>}
        <Routes>
          <Route path="/" element={<DashboardChart />} />
          <Route path="/tokenlist" element={<TokenList />} />
          <Route path="/addtoken" element={<AddToken />} />
        </Routes>
        <Outlet />
      </div>
      <button style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;