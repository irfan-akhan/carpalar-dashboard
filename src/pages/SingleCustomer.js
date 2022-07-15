import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Flex,
  Box,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { AiOutlineCar } from 'react-icons/ai';
import Field from '../components/Field';
import { MdArrowDropDown } from 'react-icons/md';
import { getSingleCustomer } from '../services/customers';
import { Link } from 'react-router-dom';

const SingleCustomer = () => {
  const [user, setUser] = useState(null);
  const [detailStep, setDetailStep] = useState('About');

  console.log('user', user);
  let { id } = useParams();
  console.log('user id pass', id);
  useEffect(() => {
    getSingleCustomer(id)
      .then(user => setUser(user))
      .catch(err => console.log('user err', err));
  }, [id]);

  return (
    <Flex>
      <Navbar />
      <Flex flexDir={'column'} p="5" ml="16vw" width={'100%'}>
        <Flex
          bg="f8f8f8"
          h="25vh"
          my="3"
          p="5"
          w="100%"
          boxShadow={'lg'}
          justifyContent="space-between"
        >
          <Box>
            <Text fontSize={'2xl'} fontWeight="600">
              {`${user?.title}  ${user?.firstName}${user?.lastName}`}
            </Text>
            <Flex my="2" alignItems="center"></Flex>
            <Flex alignItems="center">
              Status: &nbsp; &nbsp;
              <Text
                color="#fff"
                p="1"
                textTransform={'capitalize'}
                borderRadius="5"
                bg={user?.status === 'active' ? 'green' : 'red'}
                display={'inline-block'}
              >
                {user?.status}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Box px="3" py="2" w="100%" boxShadow="lg" minH={'65vh'}>
          <Flex>
            <Flex
              flexDir={'column'}
              justifyContent={'center'}
              alignItems="center"
              mx="1"
            >
              <Button
                size="md"
                onClick={e => setDetailStep('About')}
                variant={detailStep === 'About' ? 'solid' : 'outline'}
                colorScheme={'blue'}
              >
                About &nbsp; <BsFillPersonLinesFill />
              </Button>
              {detailStep === 'About' ? (
                <MdArrowDropDown
                  style={{ marginTop: '-16px', fontSize: '2.4rem' }}
                  fontSize={'30px'}
                  color="blue"
                />
              ) : (
                <MdArrowDropDown
                  style={{
                    marginTop: '-16px',
                    fontSize: '2.4rem',
                    visibility: 'hidden',
                  }}
                  color="blue"
                />
              )}
            </Flex>
            <Flex
              flexDir={'column'}
              justifyContent={'center'}
              alignItems="center"
              mx="1"
            >
              {detailStep === 'Applications' ? (
                <MdArrowDropDown
                  style={{ marginTop: '-16px', fontSize: '2.4rem' }}
                  fontSize={'30px'}
                  color="blue"
                />
              ) : (
                <MdArrowDropDown
                  style={{
                    marginTop: '-16px',
                    fontSize: '2.4rem',
                    visibility: 'hidden',
                  }}
                  color="blue"
                />
              )}
            </Flex>
            <Flex
              flexDir={'column'}
              justifyContent={'center'}
              alignItems="center"
              mx="1"
            >
              <Button
                size="md"
                onClick={e => setDetailStep('Orders')}
                variant={detailStep === 'Orders' ? 'solid' : 'outline'}
                colorScheme={'blue'}
              >
                Orders &nbsp; <AiOutlineCar />
              </Button>
              {detailStep === 'Orders' ? (
                <MdArrowDropDown
                  style={{ marginTop: '-16px', fontSize: '2.4rem' }}
                  fontSize={'30px'}
                  color="blue"
                />
              ) : (
                <MdArrowDropDown
                  style={{
                    marginTop: '-16px',
                    fontSize: '2.4rem',
                    visibility: 'hidden',
                  }}
                  color="blue"
                />
              )}
            </Flex>
          </Flex>
          {detailStep === 'About' ? (
            <Box my="2">
              <Text fontSize="lg" w="50%" border="1px solid #80808038" p="2">
                Personal Information
              </Text>
              <Field
                border={true}
                label="Name"
                value={`${user?.title}  ${user?.firstName} ${user?.lastName}`}
              />
              <Field border={true} label="Email" value={user?.email} />
              <Field border={true} label="Phone" value={user?.mobile} />
              <Field
                border={true}
                label="Address"
                value={`${user?.address?.area} ${user?.address?.street} ${user?.address?.country} ${user?.address?.postalCode}`}
              />
              <Field
                border={true}
                label="Joined On"
                value={user?.createdAt.slice(0, 10)}
              />
            </Box>
          ) : null}
          {detailStep === 'Orders' ? (
            <Box my="2">
              <TableContainer>
                <Table size="md" variant="striped">
                  <TableCaption>All Customer Orders</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>ID</Th>
                      <Th>Type</Th>
                      <Th>Status</Th>
                      <Th>View Details</Th>
                      <Th isNumeric>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {user.sales?.length === 0 ? (
                      <Text mt="5" fontWeight="bold">
                        No orders
                      </Text>
                    ) : (
                      user.sales.map((order, idx) => (
                        <Tr>
                          <Td fontWeight={'bold'}>{idx + 1}</Td>
                          <Td>{order._id}</Td>
                          <Td>{order.type}</Td>
                          <Td>{order.status || 'no'}</Td>

                          <Td>
                            <Link to={`/sales/${order._id}`}>
                              <Button colorScheme="telegram" variant="outline">
                                Details
                              </Button>
                            </Link>
                          </Td>
                          <Td isNumeric>{order.createdAt?.slice(0, 10)}</Td>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          ) : null}
        </Box>
      </Flex>
    </Flex>
  );
};

export default SingleCustomer;
