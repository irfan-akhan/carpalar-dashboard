import { Flex } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <Flex>
      <Navbar />
      <Flex ml="16vw" mt="2">
        <div>Dashboard</div>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
