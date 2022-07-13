import {
  Button,
  Flex,
  Heading,
  Text,
  Toast,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getSingleSale } from '../services/sale.service';

function renderSale(sale) {
  return (
    <>
      <Flex
        p="5"
        py="2"
        w="100%"
        bg="#000"
        color="#fff"
        justifyContent="space-between"
      >
        <Flex>
          <Heading as="h4" fontWeight={'600'} fontSize="1.6rem">
            {sale.vehicle?.title}
          </Heading>
          <Button
            mx="2"
            variant="solid"
            size={'xs'}
            textTransform="capitalize"
            colorScheme="telegram"
          >
            {sale.type}
          </Button>
        </Flex>
        <Link to={`/vehicles/${sale.vehicle?._id}`}>
          <Button variant="solid" colorScheme="green">
            Car details
          </Button>
        </Link>
      </Flex>
      <Flex minH="55vh" width="80vw" justifyContent="space-between">
        <Flex
          bg="#eff2fd"
          w="100%"
          p="3"
          m="2"
          boxShadow="lg"
          borderRadius="6"
          alignItems="center"
          flexDir="column"
          justifyContent="space-evenly"
          position="relative"
        >
          <Text
            // position="absolute"
            bg="#68ac82"
            fontWeight="black"
            color="#fff"
            p="2"
            borderRadius="10"
            top="5"
            justifySelf="flex-start"
          >
            CUSTOMER
          </Text>
          <Flex>
            <Text textTransform="capitalize">{sale.customer?.title}</Text>{' '}
            &nbsp;
            <Text textTransform="capitalize">{sale.customer?.firstName}</Text>
            &nbsp;
            <Text textTransform="capitalize">{sale.customer?.lastName}</Text>
          </Flex>
          <Text mt="3" textTransform="capitalize" color="grey">
            {sale.customer?.email}
          </Text>
          <Text textTransform="capitalize">{sale.customer?.mobile}</Text>
          <Flex mt="3">
            <a href={`mailto: ${sale.customer?.email}`}>
              <Button
                leftIcon={<HiOutlineMail fontSize="15px" />}
                variant="solid"
                colorScheme="teal"
              >
                Email
              </Button>
            </a>

            <Link to={`/customers/${sale.customer?._id}`}>
              <Button
                leftIcon={<FaUserAlt fontSize="15px" />}
                mx="4"
                variant="outline"
                colorScheme="twitter"
              >
                Details
              </Button>
            </Link>
          </Flex>
        </Flex>
        <Flex
          bg="#eff2fd"
          w="100%"
          p="3"
          m="2"
          boxShadow="lg"
          borderRadius="10"
          alignItems="center"
          flexDir="column"
          textAlign="center"
          position="relative"
          justifyContent="space-evenly"
        >
          <Text
            // position="absolute"
            bg="#433e79"
            fontWeight="black"
            borderRadius="10px"
            top="5"
            color="#fff"
            justifySelf="flex-start"
            p="2"
          >
            Transactions
          </Text>
          {sale.type === 'finance' ? (
            <>
              <Text
                borderRadius="6"
                bg="#fff"
                fontWeight="500"
                w="100%"
                p="1"
                px="3"
                width="100%"
                textTransform="capitalize"
                mb="2"
                color="green.400"
              >
                successfull transactions
                <span
                  style={{
                    marginLeft: '5px',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    color: 'green',
                  }}
                >
                  &nbsp;{sale.paid_transactions}
                </span>
              </Text>

              <Text
                bg="#fff"
                fontWeight="500"
                borderRadius="6"
                w="100%"
                p="1"
                px="3"
                textTransform="capitalize"
                mb="2"
                color="red.400"
              >
                pending transactions
                <span
                  style={{
                    marginLeft: '5px',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    color: 'red',
                  }}
                >
                  &nbsp; {sale.pending_transactions}
                </span>
              </Text>
              <Text
                bg="#fff"
                fontWeight="500"
                borderRadius="6"
                p="1"
                px="3"
                textTransform="capitalize"
                w="100%"
                mb="2"
              >
                total transactions
                <span
                  style={{
                    marginLeft: '5px',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    color: '#000',
                  }}
                >
                  &nbsp;{sale.total_transactions}
                </span>
              </Text>
            </>
          ) : (
            <Text>Sale is not finance</Text>
          )}
        </Flex>
        <Flex
          bg="#eff2fd"
          w="100%"
          p="3"
          m="2"
          boxShadow="lg"
          borderRadius="6"
          alignItems="center"
          flexDir="column"
          justifyContent="space-evenly"
          textAlign="center"
          position="relative"
        >
          <Text
            // position="absolute"
            bg="#cd663f"
            p="2"
            borderRadius="10"
            color="#fff"
            fontWeight="black"
            top="5"
            justifySelf="flex-start"
          >
            Money
          </Text>
          <Text
            bg="#fff"
            fontWeight="500"
            borderRadius="6"
            p="1"
            px="3"
            textTransform="capitalize"
            mb="2"
            w="100%"
            color="grey"
          >
            installment amount
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: '#000',
              }}
            >
              &nbsp; ${sale.installment_amount}
            </span>
          </Text>
          <Text
            borderRadius="6"
            p="1"
            px="3"
            bg="#fff"
            fontWeight="500"
            textTransform="capitalize"
            w="100%"
            mb="2"
            color="grey"
          >
            total amount
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: '#000',
              }}
            >
              &nbsp; ${sale.total_amount}
            </span>
          </Text>
          <Text
            borderRadius="6"
            p="1"
            w="100%"
            px="3"
            bg="#fff"
            fontWeight="500"
            textTransform="capitalize"
            mb="2"
            color="grey"
          >
            Paid Upfront
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: '#000',
              }}
            >
              &nbsp; ${sale.upfront_fee}
            </span>
          </Text>
          <Text
            borderRadius="6"
            p="1"
            px="3"
            bg="#fff"
            w="100%"
            fontWeight="500"
            textTransform="capitalize"
            mb="2"
            color="green.400"
          >
            paid amount
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: 'green',
                marginRight: 'auto',
              }}
            >
              &nbsp; ${sale.paid_amount}
            </span>
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" mt="2" w="100%" bg="#f4f4f4" p="2">
        <Heading
          as="h3"
          textTransform="capitalize"
          fontWeight="600"
          fontSize="1.6rem"
          my="3"
        >
          transaction History
        </Heading>
        <TableContainer w="100%" bg="#fff">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>IDX</Th>
                <Th>Status</Th>
                <Th isNumeric>AMOUNT</Th>
                <Th>reciept</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontWeight="bold">15</Td>
                <Td>inches</Td>
                <Td isNumeric>25.4</Td>
                <Td>Successfull</Td>
                <Td>Reciept URL</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>10</Th>
                <Th></Th>
                <Th color="green" isNumeric>
                  50000
                </Th>
                <Th></Th>
                <Th>total paid</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}

const SingleSale = () => {
  const router = useNavigate();
  let { id } = useParams();
  const [sale, setSale] = useState(null);

  useEffect(() => {
    if (id) {
      getSingleSale(id)
        .then(data => {
          console.log('get sale succ', data);
          setSale(data.sale);
        })
        .catch(err => {
          console.log('single ssale err', err);
          Toast({
            title: 'Failed to get car! ' + err,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
  }, [id]);

  return (
    <Flex>
      <Navbar />
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        ml="16vw"
      >
        {console.log('sale', sale)}
        {sale ? (
          <Flex flexDir="column" alignItems="flex-start" bg="#f7f7f7">
            {renderSale(sale, router)}
          </Flex>
        ) : (
          <Text>NO sale</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default SingleSale;
