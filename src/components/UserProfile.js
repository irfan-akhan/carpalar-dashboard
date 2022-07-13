// Chakra imports
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
function UserProfile({ user }) {
  //   const [user, setUser] = useState(user);
  let boxBg = useColorModeValue('white !important', '#111c44 !important');
  let mainText = useColorModeValue('gray.800', 'white');
  let secondaryText = useColorModeValue('gray.400', 'gray.400');
  //   useEffect(() => {
  //     const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  //     setUser(user);
  //   }, []);

  return (
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
          {user?.name}
        </Text>
        <Text
          color={secondaryText}
          textAlign="center"
          fontSize="sm"
          fontWeight="500"
        >
          {user?.role} <br />
        </Text>
        <Text
          color={mainText}
          textAlign="center"
          fontSize="sm"
          fontWeight="500"
        >
          Status: {user?.status || 'active'}
        </Text>
      </Flex>

      <Flex justify="center">
        <Link to={`/users/${user?._id}`}>
          <Button varaint="outline" py="1" colorScheme="blue">
            Details
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}

export default UserProfile;
