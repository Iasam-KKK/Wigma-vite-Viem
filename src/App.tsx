// src/App.tsx
"use client";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Dashboard from './components/Dashboard';
import StartupPage from './components/StartupPage';
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './config/wagmi';

const queryClient = new QueryClient()

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<StartupPage />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;