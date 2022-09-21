import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, GridItem, SimpleGrid, Box, Flex, InputGroup, Spinner, InputLeftElement, Input, Avatar, Image, Heading, Button, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { ethers } from 'ethers';
import { Web3Storage } from 'web3.storage';

import Chartex from '../images/chartex.png';
import { NFTCONTRACT_ADDRESS, CONTRACT_ADDRESS }  from '../contractdata/config';

const client = new Web3Storage({ token: "" });

function Dashboard({ ethaddress, ethProvider, contractHeir, contractNFT }) {
  const changePage = useNavigate();

  const [boxhash, setBoxhash] = useState("");
  const [maticBalance, setMaticBalance] = useState("0");
  const [isRegister, setIsRegister] = useState(false);
  const [heirAddress, setheirAddress] = useState("");
  const [heris, setheris] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIsHeir();
  }, [contractHeir])
  
  useEffect(() => {
    getBalance();
  }, [ethProvider])

  const getBalance = async () => {
    const balance = await ethProvider.getBalance(ethaddress);
    setMaticBalance(balance.toString());
  }

  const checkIsHeir = async () => {
    const bh = await contractHeir.user2boxhash(ethaddress);
    if(bh !== "0x0000000000000000000000000000000000000000000000000000000000000000") {
      setBoxhash(bh);
      setIsRegister(true);
    }
  }
  
  
  const addHeir = async () => {
    try{
      setLoading(true);
      const data = JSON.stringify({ 
        from: ethaddress,
        to: heirAddress,
        amount: amount,
        date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
      });
      const blob = new Blob([data], {type: 'text/plain'});
      const newFile = new File([ blob ], 'heir.json');

      const cid = await client.put([newFile], {
        onRootCidReady: localCid => {
          console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
          console.log('> 📡 sending files to web3.storage ')
        },
        onStoredChunk: bytes => console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
      })

      console.log(`https://dweb.link/ipfs/${cid}`);

      const transaction = await contractHeir.rechargeWithAddress(ethaddress, heirAddress, NFTCONTRACT_ADDRESS, [], { value: ethers.utils.parseEther(amount)});
      const tx = await transaction.wait();
      console.log(tx);
      setheris([...heris, { heirAddress, amount}]);
      setLoading(false);
    }
    catch(err) {
      console.error(err);
      setLoading(false);
    }
  }

  const cancelBoxAndTransferFundsToOwner = async () => {
    try{
      setLoading(true);
      const transaction = await contractHeir.cancelBoxAndTransferFundsToOwner({ gasLimit: 1e6 });
      const tx = await transaction.wait();
      console.log(tx);
      setLoading(false);
    }
    catch(err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <GridItem colSpan={5}>
      <Container maxW='1100px' mt="3" mb="2">
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='green.300' />}
          />
          <Input variant='filled' placeholder='Search' />
        </InputGroup>
      </Container>

      <Box bg="#43B89C" pt="1" pb="4">
        <Container maxW='1100px' mt="3">
          <Flex>
            <Avatar name='Person' mr="7" />
            <div>
              <Text fontSize='md' color="white">Hi</Text>
              <Text fontSize='md' color="white">Your last login was 8/21/22</Text>
            </div>
          </Flex>
        </Container>
      </Box>
      <Container maxW='1100px' mt="3">
        <SimpleGrid minChildWidth='300px' columns={[2]} spacing={10} mb="10">
          <Box bg="#17B58F" borderRadius='lg' overflow='hidden' p="4">
            <Heading fontSize='md' color="white" mb="3">WELCOME</Heading>
            <Text mb="2" fontSize='md' color="white">{ethaddress}</Text>
          </Box>
          <Flex justifyContent="space-between">
            {/* <div>
              <Heading fontSize='md' mb="3">Account Name:</Heading>
              <Text fontSize='md'>User</Text>
            </div> */}
            <div>
              <Heading fontSize='md' mb="3">Available Funds:</Heading>
              <Text fontSize='md'>{maticBalance / 10 ** 18} MATIC</Text>
              <br />
              <Button mr="3" colorScheme='teal' onClick={() => changePage("/register")}>
                Register
              </Button>
              <Button colorScheme='teal' onClick={() => changePage("/withdraw")}>
                Withdraw
              </Button>
            </div>
          </Flex>
        </SimpleGrid>

        <SimpleGrid minChildWidth='300px' columns={[2]} spacing={10} mb="10">
          <Box bg="#17B58F" borderRadius='lg' overflow='hidden' p="4">
            <Heading fontSize='md' color="white" mb="3">REGISTER HEIRS</Heading>
            {isRegister
              ? <>
                  <Heading fontSize='md' color="white" mb="3">Add HEIR </Heading>
                  <Input placeholder='Address' variant='filled' mb="3" onChange={(e) => setheirAddress(e.target.value)} />
                  <Input placeholder='MATIC' variant='filled' mb="3" onChange={(e) => setAmount(e.target.value)} />
                  {loading 
                    ? <Spinner color='yellow' />
                    : <>
                    <Button colorScheme='yellow' onClick={addHeir}>
                      Add Heir
                    </Button>
                    <hr/>
                    <Button colorScheme='red' onClick={cancelBoxAndTransferFundsToOwner}>
                      Cancel All
                    </Button>
                      </>}
                </>
              : <Text color="white" fontSize='md'>You need to resigter</Text>
            }
          </Box>
          <SimpleGrid minChildWidth='150px' columns={[2]} spacing={5} mb="10">
            {heris.map((h, i) => (
              <Box bg="#17B58F" borderRadius='lg' w='100%' p="4" mr="4" key={i}>
                <Heading fontSize='md' color="white" mb="3">HEIR {i + 1}</Heading>
                <Text fontSize='md' color="white">Wallet Address: {h.heirAddress}</Text>
                <Text fontSize='md' color="white">Total MATIC: {h.amount}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </SimpleGrid>

        <SimpleGrid minChildWidth='300px' columns={[2]} spacing={10}>
          <Image src={Chartex} alt="Chart"/>
          <Box bg="#17B58F" borderRadius='lg' w='100%' p="4" mr="4">
            <Heading fontSize='md' color="white" mb="3">LATEST TRANSACTIONS</Heading>
            
          </Box>
        </SimpleGrid>
      </Container>
    </GridItem>
  )
}

export default Dashboard;