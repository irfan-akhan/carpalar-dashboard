import React from 'react';
import { VStack, Button, Heading } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillCar, AiOutlineLogout } from 'react-icons/ai';
import { TbLayoutDashboard } from 'react-icons/tb';
import { MdQueryStats } from 'react-icons/md';
import { FaUserAlt, FaUserAltSlash } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';
import ModalDialog from './ModalDialog';
import Cookies from 'js-cookie';
const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <VStack
      py="2"
      mr={3}
      width="15vw"
      bg="#f5f5f5"
      position={'fixed'}
      minH="100vh"
    >
      <Heading
        as="h2"
        size="md"
        textAlign="center"
        mb="2"
        color="blue"
        width="100%"
      >
        CARPALAR
      </Heading>
      <Button
        onClick={e => navigate('/dashboard')}
        color={pathname.includes('dashboard') && 'blue'}
        bg={pathname.includes('dashboard') && '#fff'}
        _hover={{ bg: '#fff' }}
        width="100%"
        borderRadius={'0'}
        leftIcon={<TbLayoutDashboard />}
        variant="solid"
      >
        Home
      </Button>
      <Button
        onClick={e => navigate('/applications')}
        color={pathname.includes('applications') && 'blue'}
        borderRadius={'0'}
        bg={pathname.includes('applications') && '#fff'}
        _hover={{ bg: '#fff' }}
        width="100%"
        leftIcon={<MdQueryStats />}
        variant="solid"
      >
        Applications
      </Button>
      <Button
        onClick={e => navigate('/vehicles')}
        color={pathname.includes('vehicles') && 'blue'}
        borderRadius={'0'}
        bg={pathname.includes('vehicles') && '#fff'}
        _hover={{ bg: '#fff' }}
        width="100%"
        leftIcon={<AiFillCar />}
        variant="solid"
      >
        Inventory
      </Button>
      <Button
        onClick={e => navigate('/sales')}
        color={pathname.includes('sales') && 'blue'}
        borderRadius={'0'}
        bg={pathname.includes('sales') && '#fff'}
        _hover={{ bg: '#fff' }}
        width="100%"
        leftIcon={<FcSalesPerformance />}
        variant="solid"
      >
        Sales
      </Button>

      <Button
        onClick={e => navigate('/customers')}
        borderRadius={'0'}
        bg={pathname.includes('customers') && '#fff'}
        color={pathname.includes('customers') && 'blue'}
        _hover={{ bg: '#fff' }}
        width="100%"
        leftIcon={<FaUserAltSlash />}
        variant="solid"
      >
        Customers
      </Button>
      <Button
        onClick={e => navigate('/users')}
        borderRadius={'0'}
        bg={pathname.includes('users') && '#fff'}
        color={pathname.includes('users') && 'blue'}
        _hover={{ bg: '#fff' }}
        width="100%"
        leftIcon={<FaUserAlt />}
        variant="solid"
      >
        Users
      </Button>
      <ModalDialog
        label="Logout"
        icon={<AiOutlineLogout />}
        callback={e => {
          Cookies.remove('token');
          Cookies.remove('user');
          navigate('/');
        }}
      />
    </VStack>
  );
};

export default Navbar;
