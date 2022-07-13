import { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Home = () => {
  const Toast = useToast();
  let navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  function onSubmitHandler(input) {
    console.log('input', input);
    Toast({
      title: 'Loggin in, Please wait!',
      status: 'info',
      duration: 500,
      isClosable: true,
    });
    login(input)
      .then(data => {
        console.log(data);
        Cookies.set('token', JSON.stringify(data?.token), { expires: 2 });
        Cookies.set('user', JSON.stringify(data?.user), { expires: 2 });
        if (data?.user?.role === 'admin' || data?.user?.role === 'superAdmin') {
          Toast({
            title: 'Logged in success!',
            status: 'success',
            duration: 1000,
            isClosable: true,
          });
          navigate('/dashboard');
        } else {
          Toast({
            title: "You don't have permissions to view this page in success!",
            status: 'warning',
            duration: 1000,
            isClosable: true,
          });
          Cookies.remove('token');
          Cookies.remove('user');
        }
      })
      .catch(err => {
        console.log('login err is', err);
        Toast({
          title: err.message,
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      });
  }
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
      bg="grey.300"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="blue.500" />
        <Heading color="blue.400">Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius={'10'}
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    isInvalid={errors.email}
                    name="email"
                    aria-label="email"
                    errorBorderColor="crimson"
                    {...register('email', { required: 'Email is required' })}
                    placeholder="email address"
                  />
                </InputGroup>
                {errors.email && (
                  <FormHelperText color="red">
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    name="password"
                    aria-label="password"
                    isInvalid={errors.password}
                    errorBorderColor="crimson"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password too short - 6 chars min',
                      },
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <FormHelperText color="red">
                    {errors.password.message}
                  </FormHelperText>
                )}
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      {/* <Box>
        New to us?{' '}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box> */}
    </Flex>
  );
};

export default Home;
