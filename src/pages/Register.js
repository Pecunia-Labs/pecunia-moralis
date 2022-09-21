import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, FormControl, FormLabel, Box, GridItem, ButtonGroup, Spinner, Input, Avatar, Image, Heading, Button, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

function Register({ ethaddress, sequenceWallet, contractHeir }) {
  const changePage = useNavigate();

  const [password, setPassword] = useState("");
  const [timeAmount, setTimeAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState([]);
  const [payment, setPayment] = useState("");
  const [time, setTime] = useState("");

  const registerBox = async () => {
    try{
      setLoading(true);
      const response = await fetch("https://pecunia-server.onrender.com/create-proof", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'psw': password,
          'owner': ethaddress,
          'settingUpAmount': "0"
        })
      });

      if (!response) {
        console.log('No response');
        return;
      }

      const { p } = await response.json();
      console.log(p);
      setProof(p.proof);
      // let timeIntBetweenPayments = 5 //time interval between the payments done to heir
      // let numberOfPayments = 2 //number of payments done toheir
      const transaction = await contractHeir.register(p.boxhash, p.proof, p.pswHash, p.allHash, timeAmount, payment, time);
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
      <center>
        <Box borderWidth='1px' borderRadius='lg' borderColor="teal" overflow='hidden' p="5" width="500px" mt="32">
          <Heading fontSize='2xl' mb="3">Register </Heading>
          <FormControl mb="3">
            <FormLabel>Password</FormLabel>
            <Input type='password' onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <FormControl mb="3">
            <FormLabel>Time to Cancel Payment</FormLabel>
            <Input  onChange={(e) => setTimeAmount(e.target.value)}/>
          </FormControl>
          <FormControl mb="3">
            <FormLabel>Number of Payments</FormLabel>
            <Input onChange={(e) => setPayment(e.target.value)}/>
          </FormControl>
          <FormControl mb="3">
            <FormLabel>Time Interval between the payments</FormLabel>
            <Input onChange={(e) => setTime(e.target.value)}/>
          </FormControl>
          {loading
            ? <Spinner color='teal' />
            : <ButtonGroup spacing='6'>
                <Button colorScheme='teal' onClick={registerBox}>
                  Register
                </Button>
                <Button onClick={() => changePage("/dashboard")}>Cancel</Button>
              </ButtonGroup>
          }
          <br />
          <br />
          {/* {proof.length && <p><strong>Proof</strong></p>}
          {proof.map((p, i) => (
            <p key={i}>{p}</p>
          ))} */}
        </Box>
      </center>
    </GridItem>
  )
}

export default Register;