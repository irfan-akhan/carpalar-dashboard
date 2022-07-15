import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    <Flex flexDir="column">
      <Flex>
        <Navbar />
        <Flex ml="16vw" mt="2" width="80vw" justifyContent="space-between">
          <Box
            width="30%"
            boxShadow="md"
            bg={`blue.${(1 + 2) * 100}`}
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
              Sales
            </Text>
            <Text
              textTransform="uppercase"
              fontSize="3rem"
              fontWeight="600"
              color="yellow.400"
            >
              {stats?.orders || ''}
            </Text>
          </Box>
          <Box
            width="30%"
            boxShadow="md"
            bg={`blue.${(1 + 2) * 100}`}
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
              Vehicles
            </Text>
            <Text
              textTransform="uppercase"
              fontSize="3rem"
              fontWeight="600"
              color="yellow.400"
            >
              {stats?.vehicles}
            </Text>
          </Box>
          <Box
            width="30%"
            boxShadow="md"
            bg={`blue.${(1 + 2) * 100}`}
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
              Applications
            </Text>
            <Text
              textTransform="uppercase"
              fontSize="3rem"
              fontWeight="600"
              color="yellow.400"
            >
              {stats.applications || ''}
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Flex w="100%" justifyContent="space-evenly" flexWrap="wrap">
        <TableContainer
          // borderRadius="10"
          border="0.61px solid #71cdcd88"
          boxShadow="lg"
          ml="16vw"
          my="8"
          p="0"
        >
          <Text
            mt="3"
            fontWeight="600"
            fontSize="1.4rem"
            textTransform="uppercase"
            textAlign="center"
          >
            Latest sales
          </Text>
          <Table size="md" variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>user</Th>
                <Th>vehicle</Th>
                <Th>Date</Th>
                <Th>status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stats?.latestSales?.map((sale, idx) => {
                return (
                  <Tr key={sale._id}>
                    <Td textTransform="capitalize" textDecoration={'underline'}>
                      <Link to={`/customers/${sale.customer._id}`}>
                        {`${sale.customer.firstName} ${sale.customer.lastName}`}
                      </Link>
                    </Td>
                    <Td textTransform="capitalize" textDecoration={'underline'}>
                      <Link to={`/vehicles/${sale.vehicle._id}`}>
                        {sale.vehicle?.title?.slice(0, 18)}
                      </Link>
                    </Td>
                    <Td>{sale.createdAt?.slice(0, 10)}</Td>
                    <Td textTransform="capitalize">{sale.status}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer
          mt="2"
          my="8"
          p="0"
          border="0.61px solid #71cdcd99"
          boxShadow="lg"
        >
          <Text
            mt="3"
            fontWeight="600"
            fontSize="1.4rem"
            textTransform="uppercase"
            textAlign="center"
          >
            Latest Applications
          </Text>
          <Table size="md" variant="striped" colorScheme="twitter">
            <Thead>
              <Tr>
                <Th>By</Th>
                <Th>vehicle</Th>
                <Th>Date</Th>
                <Th>status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stats?.latestApplications?.map((sale, idx) => {
                return (
                  <Tr key={sale._id}>
                    <Td textTransform="capitalize" textDecoration={'underline'}>
                      <Link to={`/applications/${sale._id}`}>
                        {`${sale.first_name} ${sale.last_name}`}
                      </Link>
                    </Td>
                    <Td textTransform="capitalize" textDecoration={'underline'}>
                      <Link to={`/vehicles/${sale.applied_vehicle?._id}`}>
                        {sale.applied_vehicle?.title?.slice(0, 10)}
                      </Link>
                    </Td>
                    <Td>{sale.createdAt?.slice(0, 10)}</Td>
                    <Td textTransform="capitalize">{sale.status}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer
          mt="2"
          my="8"
          p="0"
          ml="16vw"
          border="0.61px solid #71cdcd99"
          boxShadow="lg"
        >
          <Text
            mt="3"
            fontWeight="600"
            fontSize="1.4rem"
            textTransform="uppercase"
            textAlign="center"
          >
            Latest Payments
          </Text>
          <Table size="md" variant="striped" colorScheme="twitter">
            <Thead>
              <Tr>
                <Th>By</Th>
                <Th>car</Th>
                <Th>Date</Th>
                <Th>status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stats?.latestApplications?.map((sale, idx) => {
                return (
                  <Tr key={sale._id}>
                    <Td textTransform="capitalize" textDecoration={'underline'}>
                      <Link to={`/applications/${sale._id}`}>
                        {`${sale.title} ${sale.first_name} ${sale.last_name}`}
                      </Link>
                    </Td>
                    <Td textTransform="capitalize" textDecoration={'underline'}>
                      <Link to={`/vehicles/${sale._id}`}>
                        {sale.applied_for}
                      </Link>
                    </Td>
                    <Td>{sale.createdAt?.slice(0, 10)}</Td>
                    <Td textTransform="capitalize">{sale.status}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer
          mt="2"
          my="8"
          p="0"
          border="0.61px solid #71cdcd99"
          boxShadow="lg"
        >
          <Text
            mt="3"
            fontWeight="600"
            fontSize="1.4rem"
            textTransform="uppercase"
            textAlign="center"
          >
            Late Payments
          </Text>
          <Table size="md" variant="striped" colorScheme="twitter">
            <Thead>
              <Tr>
                <Th>By</Th>
                <Th>car</Th>
                <Th>Date</Th>
                <Th>status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stats?.latestApplications?.map((sale, idx) => {
                return (
                  <Tr key={sale._id}>
                    <Td textTransform="capitalize" textDecoration={'underline'}>
                      <Link to={`/applications/${sale._id}`}>
                        {`${sale.title} ${sale.first_name} ${sale.last_name}`}
                      </Link>
                    </Td>
                    <Td textTransform="capitalize" textDecoration={'underline'}>
                      <Link to={`/vehicles/${sale._id}`}>
                        {sale.applied_for}
                      </Link>
                    </Td>
                    <Td>{sale.createdAt?.slice(0, 10)}</Td>
                    <Td textTransform="capitalize">{sale.status}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
