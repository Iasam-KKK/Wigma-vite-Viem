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
import { createWeb3Modal } from '@web3modal/wagmi/react'
import Home from './components/Home';
 
 
const queryClient = new QueryClient()
const projectId = '8e2b7c4243543d9124ee4170d438433a'
 

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Dashboard/*" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;