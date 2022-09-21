import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, SimpleGrid, Box, Heading, Text, Image, ButtonGroup, Button } from '@chakra-ui/react';

import Hero1 from '../images/top-hero.png';
import Hero2 from '../images/hero2.png';
import HowItWork1 from '../images/howitwork1.png';
import HowItWork2 from '../images/howitwork2.png';
import HowItWork3 from '../images/howitwork3.png';
import Profile1 from '../images/profile1.png';
import Profile2 from '../images/profile2.png';
import Profile3 from '../images/profile3.png';
import Footer1 from '../images/footer1.png';
import Footer2 from '../images/footer2.png';

function Home() {
  const changePage = useNavigate();

  return (
    <>
      <Image src={Hero1} alt="City" style={{ width: "100%", height: "300px" }}/>
      <Container maxW='1100px'>
        <SimpleGrid minChildWidth='500px' columns={2} spacing={10}>
          <div>
            <Heading as='h1' size='2xl' mt={14}>
              Safe and Secure Cryptocurrency Estate Planning using ZK Snarks and Chainlink Keepers
            </Heading>
            <ButtonGroup variant='outline' spacing='3' mt={4}>
              <Button colorScheme='teal' variant='solid' size='lg' onClick={() => changePage("/dashboard")}>
                Get Started
              </Button>
              <Button size='lg'>Learn More</Button>
            </ButtonGroup>
          </div>
         
          <Image src={Hero2} alt="People" style={{ width: "100%" }}/>
        </SimpleGrid>

        <Heading as='h2' size='2xl' mt={14}  mb={14} align="center">
          How it works
        </Heading>

        <SimpleGrid minChildWidth='300px' columns={[3]} spacing={10}>
          <center>
            <Image src={HowItWork3} alt="Connect Wallet" style={{ width: "300px", height: '200px' }}/>
            <Text fontSize='2xl' mt={2}>Connect Wallet</Text>
          </center>
          <center>
            <Image src={HowItWork1} alt="Register Heirs" style={{ width: "300px", height: '200px' }}/>
            <Text fontSize='2xl' mt={2}>Register Heirs</Text>
          </center>
          <center>
            <Image src={HowItWork2} alt="Set up Funds and Details" style={{ width: "300px", height: '200px' }}/>
            <Text fontSize='2xl' mt={2}>Set up Funds and Details</Text>
          </center>
        </SimpleGrid>
      </Container>

      <Box bg="#1CD4A8" pt={1} pb={10} mt={20} mb={16}>
        <Container maxW='1100px'>
          <Heading as='h2' size='2xl' mt={14}  mb={14} align="center">
            Who we are
          </Heading>

          <SimpleGrid minChildWidth='300px' columns={[3]} spacing={10}>
            <center>
              <Image src={Profile1} alt="People" style={{ width: "175px" }}/>
              <Text fontSize='2xl' mt={2}>Song</Text>
            </center>
            <center>
              <Image src={Profile2} alt="People" style={{ width: "175px" }}/>
              <Text fontSize='2xl' mt={2}>Louell Sala</Text>
            </center>
            <center>
              <Image src={Profile3} alt="People" style={{ width: "175px" }}/>
              <Text fontSize='2xl' mt={2}>Rishabh Gupta</Text>
            </center>
          </SimpleGrid>
        </Container>
      </Box>

      <Container maxW='1100px'>
        <SimpleGrid minChildWidth='200px' columns={[4]} spacing={12}>
          <Box>
            <Heading size='md' mb={3}>
              Pecunia
            </Heading>
            <Text fontSize='xl'>
              We enable safe and secure crypto estate planning services
            </Text>
          </Box>
          <Box>
            <Heading size='md' mb={3}>
              Latest News
            </Heading>
            <Image mt={6} src={Footer1} alt="Space"/>
            <Image mt={2} src={Footer2} alt="Space"/>
          </Box>
          <Box>
            <Heading size='md' mb={3}>
              Quick Links
            </Heading>
            <Text fontSize='xl' mb={1}>
              Home
            </Text>
            <Text fontSize='xl' mb={1}>
              About
            </Text>
            <Text fontSize='xl' mb={1}>
              Services
            </Text>
            <Text fontSize='xl' mb={1}>
              Blog
            </Text>
          </Box>
          <Box>
            <Heading size='md' mb={3}>
              Have a Question?
            </Heading>
            <Text fontSize='xl' mb={1}>
              Queens New York
            </Text>
            <Text fontSize='xl' mb={1}>
              +1 347 545 6769
            </Text>
            <Text fontSize='xl' mb={1}>
              pecuniaxyz@gmail.com
            </Text>
          </Box>
        </SimpleGrid>
        <Text fontSize='xl' align="center" mt="10" mb="10">
          Copyright 2022, All rights reserved 
        </Text>
      </Container>
    </>
  )
}

export default Home;