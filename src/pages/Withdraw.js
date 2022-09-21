import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, FormControl, FormLabel, Box, GridItem, Spinner, ButtonGroup, Input, Select, Heading, Button } from '@chakra-ui/react';
import { ethers } from 'ethers';

import { NFTCONTRACT_ADDRESS, CONTRACT_ADDRESS }  from '../contractdata/config';

function Withdraw({ ethaddress, contractHeir, contractNFT }) {
  const changePage = useNavigate();

  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [owner, setOwner] = useState("");
  const [nftid, setnftid] = useState("");
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const options = {method: 'GET', headers: {accept: 'application/json', 'X-API-Key': 'test'}};

    fetch(`https://deep-index.moralis.io/api/v2/${ethaddress}/nft?chain=mumbai&format=decimal&token_addresses=${NFTCONTRACT_ADDRESS}`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setNFTs(response.result);
      })
      .catch(err => console.error(err));
  }, [])

  const withdrawSignature = async () => {
    try{
      setLoading(true);
      const response = await fetch("https://pecunia-server.onrender.com/create-proof", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'psw': password,
          'owner': owner,
          'settingUpAmount': ethers.utils.parseEther(amount).toString()
        })
      });

      if (!response) {
        console.log('No response');
        return;
      }

      const { p } = await response.json();

      const transactionA = await contractNFT.approve(CONTRACT_ADDRESS, nftid);
      const txA = await transactionA.wait();
      console.log(txA);
      const transaction = await contractHeir.withdrawSignature(p.proof, p.pswHash, p.allHash, owner, { gasLimit: 1e6 });
      const tx = await transaction.wait();
      console.log(tx);
      changePage("/dashboard");
      setLoading(false);
    }
    catch(err) {
      console.error(err);
      setLoading(false);
    }
  }
  return (
    <GridItem colSpan={5}>
      <center maxw='1100px' mt="3">
        <Box borderWidth='1px' borderRadius='lg'  borderColor="teal" overflow='hidden' p="5" width="500px" mt="32">
          <Heading fontSize='2xl' mb="3">Withdraw</Heading>
          <FormControl mb="3">
            <FormLabel>Password</FormLabel>
            <Input type='password' onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <FormControl mb="3">
            <FormLabel>Amount to Redeem</FormLabel>
            <Input  onChange={(e) => setAmount(e.target.value)}/>
          </FormControl>
          <FormControl mb="3">
            <FormLabel>Owner</FormLabel>
            <Input onChange={(e) => setOwner(e.target.value)} />
          </FormControl>
          <FormControl mb="3">
            <FormLabel>NFT ID</FormLabel>
            <Select placeholder='Select Heir NFT' onChange={(e) => setnftid(e.target.value)}>
              {nfts.map(n => (
                <option key={n.token_id} value={n.token_id}>{n.token_id}</option>
              ))}
            </Select>
          </FormControl>
         
          {loading
            ? <Spinner color='teal' />
            :  <ButtonGroup spacing='6'>
                <Button colorScheme='teal' onClick={withdrawSignature}>
                  Withdraw
                </Button>
                <Button onClick={() => changePage("/dashboard")}>Cancel</Button>
              </ButtonGroup>
          }
        </Box>
      </center>
    </GridItem>
  )
}

export default Withdraw;