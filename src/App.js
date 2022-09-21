import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Grid } from '@chakra-ui/react';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Register from './pages/Register';
import Withdraw from './pages/Withdraw';

function App() {
  const [ethaddress, setETHAddress] = useState("");
  const [ethProvider, setEthProvider] = useState(null);
  const [sequenceWallet, setSequenceWallet] = useState(null);
  const [contractHeir, setContractHeir] = useState(null);
  const [contractNFT, setContractNFT] = useState(null);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/withdraw"
          element={
          <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(6, 1fr)'
          >
            <Sidebar />
            <Withdraw
              ethaddress={ethaddress}
              sequenceWallet={sequenceWallet}
              ethProvider={ethProvider}
              contractHeir={contractHeir}
              contractNFT={contractNFT} />
          </Grid> } />
        <Route
          path="/register"
          element={
          <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(6, 1fr)'
          >
            <Sidebar />
            <Register
              ethaddress={ethaddress}
              sequenceWallet={sequenceWallet}
              contractHeir={contractHeir}
              contractNFT={contractNFT} />
          </Grid> } />
        <Route
          path="/dashboard"
          element={
          <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(6, 1fr)'
          >
            <Sidebar />
            <Dashboard
              ethaddress={ethaddress}
              ethProvider={ethProvider}
              sequenceWallet={sequenceWallet}
              contractHeir={contractHeir}
              contractNFT={contractNFT} />
          </Grid> } />
        <Route
          path="/"
          element={
            <>
             <Navbar setETHAddress={setETHAddress} setSequenceWallet={setSequenceWallet} setContractHeir={setContractHeir} setContractNFT={setContractNFT} setEthProvider={setEthProvider} />
             <Home />
            </>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
