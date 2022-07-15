import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCustomers } from '../services/customers';

const Customers = () => {
  const [users, setUsers] = useState([]);
  let boxBg = useColorModeValue('white !important', '#111c44 !important');
  let mainText = useColorModeValue('gray.800', 'white');
  function getAllCustomers() {
    getCustomers()
      .then(customers => {
        setUsers(customers);
      })
      .catch(err => {
        console.log('customers catch err', err);
      });
  }
  useEffect(() => {
    getAllCustomers();
  }, []);
  console.log('Customers are', users);
  return (
    <Flex>
      <Navbar />
      <Flex flexDir={'column'} padding="4" ml="16vw" width="100%">
        <Flex justifyContent="space-between">
          <Heading
            as="h1"
            size="lg"
            textTransform="uppercase"
            textAlign="center"
            mb="4"
          >
            customers lis
          </Heading>
        </Flex>
        <Flex flexWrap={'wrap'}>
          {users.length > 0 ? (
            users.map(customer => (
              <Flex
                m="3"
                borderRadius="20px"
                bg={boxBg}
                p="20px"
                h="270px"
                w={{ base: '315px', md: '325px' }}
                alignItems="center"
                direction="column"
                boxShadow={'lg'}
                key={customer._id}
              >
                <Box
                  background="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,86,121,0.9640231092436975) 33%, rgba(1,198,243,1) 90%, rgba(0,212,255,1) 100%)"
                  width="100%"
                  height="70%"
                  borderRadius="10px"
                ></Box>
                <Flex flexDirection="column" mb="20px">
                  <Image
                    src="https://assets.materialup.com/uploads/b78ca002-cd6c-4f84-befb-c09dd9261025/preview.png"
                    border="5px solid red"
                    mx="auto"
                    borderColor={boxBg}
                    width="70px"
                    height="70px"
                    mt="-48px"
                    borderRadius="50%"
                  />
                  <Text
                    fontWeight="600"
                    color={mainText}
                    textAlign="center"
                    fontSize="md"
                  >
                    {`${customer?.title} 
                    ${customer?.firstName} 
                    ${customer?.lastName}`}
                  </Text>
                  {/* <Text
                    color={secondaryText}
                    textAlign="center"
                    fontSize="sm"
                    fontWeight="500"
                  >
                    {customer?.title} <br />
                  </Text> */}
                  <Text
                    color={mainText}
                    textAlign="center"
                    fontSize="sm"
                    fontWeight="500"
                  >
                    Status: {customer?.status || 'active'}
                  </Text>
                </Flex>

                <Flex justify="center">
                  <Link to={`/customers/${customer?._id}`}>
                    <Button varaint="outline" py="1" colorScheme="blue">
                      Details
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            ))
          ) : (
            <Text mr="16vw">No customers found</Text>
          )}{' '}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Customers;
