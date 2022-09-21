import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Flex, Spacer, Button } from '@chakra-ui/react';
import { sequence } from '0xsequence';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { ABI, NFT_ABI, NFTCONTRACT_ADDRESS, CONTRACT_ADDRESS } from "../contractdata/config";

function Navbar({ setETHAddress, setSequenceWallet, setContractHeir, setContractNFT, setEthProvider }) {
  const changePage = useNavigate();

  const openMetaMask = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);  
    setEthProvider(provider);
    
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setETHAddress(address);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    setContractHeir(contract);

    const contractNFT = new ethers.Contract(NFTCONTRACT_ADDRESS, NFT_ABI, signer);
    setContractNFT(contractNFT);

    changePage("/dashboard");
  }

  const connectSequence = async () => {
    const wallet = await sequence.initWallet("mumbai", {
      networkRpcUrl: "https://matic-mumbai.chainstacklabs.com",
    });

    await wallet.connect();
    setSequenceWallet(wallet);
    const provider = wallet.getProvider();
    setEthProvider(provider);

    const signer = wallet.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    setContractHeir(contract);

    const contractNFT = new ethers.Contract(NFTCONTRACT_ADDRESS, NFT_ABI, signer);
    setContractNFT(contractNFT);
    
    const address = await wallet.getAddress();
    setETHAddress(address);
    changePage("/dashboard");
  }
  return (
    <Container maxW='1100px' p={2}>
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box p='2'>
          <Heading size='md'>PECUNIA</Heading>
        </Box>
        <Spacer />
        <Button colorScheme='teal' onClick={connectSequence}>
          Connect your Sequence
        </Button>
        <Button colorScheme='teal' onClick={openMetaMask}>
          Connect your MetaMask
        </Button>
      </Flex>
    </Container>
  )
}

export default Navbar;