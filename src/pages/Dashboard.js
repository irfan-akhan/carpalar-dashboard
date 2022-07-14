import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import axiosInstance from '../utils/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    try {
      axiosInstance
        .get('/api/dashboard/stats')
        .then(data => {
          console.log('stats', data);
          setStats(data.data);
        })
        .catch(err => {
          console.log('stat err', err);
        });
    } catch (error) {
      console.log('stat catcg', error);
    }
  }, []);
  console.log('stata rererere', stats);
  return (
    <Flex>
      <Navbar />
      <Flex ml="16vw" mt="2" width="80vw" justifyContent="space-between">
        {Object.keys(stats).length > 0
          ? Object.keys(stats).map((key, idx) => (
              <Box
                width="30%"
                boxShadow="md"
                bg={`blue.${(idx + 2) * 100}`}
                borderRadius="5"
                p="4"
                minH="20vh"
              >
                <Text
                  textTransform="uppercase"
                  fontSize="1.2rem"
                  fontWeight="500"
                  color="#fff"
                >
                  {key}
                </Text>
                <Text
                  textTransform="uppercase"
                  fontSize="3rem"
                  fontWeight="600"
                  color="yellow.400"
                >
                  {stats[key]}
                </Text>
              </Box>
            ))
          : null}
      </Flex>
    </Flex>
  );
};

export default Dashboard;
