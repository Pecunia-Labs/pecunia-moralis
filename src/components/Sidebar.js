import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, GridItem, Button, Text } from '@chakra-ui/react';

function Sidebar() {
  const changePage = useNavigate();

  return (
    <GridItem rowSpan={2} colSpan={1} bg='#074536' color="white" height="800px">
      <Container>
        <Button bg="red" onClick={() => changePage("/")} mt="4">Logout</Button>
        <Text fontSize='xl' color="white" style={{ marginTop: "6rem"}}>
          ACCOUNTS
        </Text>
        <Text fontSize='lg' color="white" mt="1">
          Account Summary Accounts
        </Text>

        <Text fontSize='xl' color="white" mt="20">
          TRANSACTIONS
        </Text>
        <Text fontSize='lg' color="white" mt="1">
          Fund Transfer Bills
        </Text>

        <Text fontSize='xl' color="white" mt="20">
          SERVICES
        </Text>
        <Text fontSize='lg' color="white" mt="1">
          Account Statements
        </Text>
        <Text fontSize='lg' color="white">
          Enroll New Account
        </Text>
        <Text fontSize='lg' color="white">
          Enroll Staking
        </Text>
      </Container>
    </GridItem>
  )
}

export default Sidebar