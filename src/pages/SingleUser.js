import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSingleUser, updateUser } from '../services/users';
import { Flex, Box, Text, Button, Select } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { AiOutlineCar } from 'react-icons/ai';
import { FaWpforms } from 'react-icons/fa';
import Field from '../components/Field';
import { MdArrowDropDown } from 'react-icons/md';

const SingleUser = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [detailStep, setDetailStep] = useState('About');

  console.log('user', user);
  let { id } = useParams();
  useEffect(() => {
    getSingleUser(id)
      .then(user => setUser(user))
      .catch(err => console.log('user err', err));
  }, [id]);
  function onSubmitHandler(e) {
    updateUser(id, { status })
      .then(data => {
        setUser(data.user);
        setStatus(null);
      })
      .catch(err => console.log('update err catch', err));
  }

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
              {user?.name}
            </Text>
            <Flex my="2" alignItems="center">
              Role: &nbsp; &nbsp; &nbsp;
              <Text
                bg="black"
                borderRadius={'5px'}
                p="1"
                fontSize={'sm'}
                w="fit-content"
                fontWeight="400"
                color={'#fff'}
                textTransform="capitalize"
              >
                {user?.role}
              </Text>
            </Flex>
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
          <Box>
            <Text textAlign="center" fontWeight="600">
              Action
            </Text>
            <Select
              size="sm"
              mt="1"
              variant="outline"
              name="status"
              onChange={e => setStatus(e.target.value)}
              placeholder="Change Status"
            >
              <option
                disabled={user?.status === 'active' ? true : false}
                value="active"
              >
                Active
              </option>
              <option
                disabled={user?.status === 'blocked' ? true : false}
                value="blocked"
              >
                Block
              </option>
            </Select>
            {status && (
              <Button
                onClick={onSubmitHandler}
                my="3"
                variant="solid"
                w="100%"
                p="5"
                colorScheme={'green'}
                size="sm"
              >
                Save Changes
              </Button>
            )}
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
            {/* <Flex
              flexDir={'column'}
              justifyContent={'center'}
              alignItems="center"
              mx="1"
            >
              <Button
                size="md"
                onClick={e => setDetailStep('Applications')}
                variant={detailStep === 'Applications' ? 'solid' : 'outline'}
                colorScheme={'blue'}
              >
                Applications &nbsp; <FaWpforms />
              </Button>
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
            </Flex> */}
          </Flex>
          {detailStep === 'About' ? (
            <Box my="2">
              <Text fontSize="lg" w="50%" border="1px solid #80808038" p="2">
                Personal Information
              </Text>
              <Field border={true} label="Name" value={user?.name} />
              <Field border={true} label="Email" value={user?.email} />
              <Field
                border={true}
                label="Joined On"
                value={user?.createdAt.slice(0, 10)}
              />
            </Box>
          ) : null}
        </Box>
      </Flex>
    </Flex>
  );
};

export default SingleUser;
