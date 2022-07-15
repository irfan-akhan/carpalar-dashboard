import { Flex, Text, Box, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AddUserModal from '../components/AddUserModal';
import Navbar from '../components/Navbar';
import UserProfile from '../components/UserProfile';
import { getUsers } from '../services/users';

function Users() {
  const [users, setUsers] = useState([]);
  function getAllUsers() {
    getUsers()
      .then(users => {
        setUsers(users);
      })
      .catch(err => {
        console.log('users catch err', err);
      });
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Flex flexDir={'column'}>
      <Navbar />
      <Box ml="16vw" mt="5px">
        <Flex w="80vw" justifyContent="space-between">
          <Heading as="h5" fontWeight="500" fontSize="2rem">
            Admin user
          </Heading>
          {/* <Button
                leftIcon={<HiOutlineFolderAdd />}
                colorScheme="teal"
                variant="solid"
              >
                Add user
              </Button> */}
          <AddUserModal
            label="Add User"
            reload={() => {
              getAllUsers();
            }}
          />
        </Flex>
        <Flex flexWrap={'wrap'}>
          {users.length > 0 ? (
            users.map(user => <UserProfile key={user._id} user={user} />)
          ) : (
            <Text mr="16vw">No users found</Text>
          )}{' '}
        </Flex>
      </Box>
    </Flex>
  );
}

export default Users;
