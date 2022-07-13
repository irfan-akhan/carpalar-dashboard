import { useState } from 'react';
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
  useDisclosure,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { signUp } from '../services/auth.service';
import { useNavigate } from 'react-router';
import { HiOutlineFolderAdd } from 'react-icons/hi';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function AddUserModal({ callback, reload, label, icon }) {
  const Toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({});
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
    signUp({ ...input, role: 'admin' })
      .then(data => {
        console.log(data);
        reload();
        onClose();

        Toast({
          title: data,
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
      })
      .catch(err => {
        Toast({
          title: err.message,
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      });
  }
  return (
    <>
      <Button
        leftIcon={icon ? icon : <HiOutlineFolderAdd />}
        onClick={onOpen}
        colorScheme="teal"
        variant={'solid'}
        color="#fff"
      >
        {label ? label : 'Delete'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDirection="column"
              width="100%"
              py="4"
              //   height="100vh"
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
                <Box minW="60%">
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
                            {...register('email', {
                              required: 'Email is required',
                            })}
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
                            children={<CFaUserAlt color="gray.300" />}
                          />
                          <Input
                            type="name"
                            isInvalid={errors.name}
                            name="name"
                            aria-label="name"
                            errorBorderColor="crimson"
                            {...register('name', {
                              required: 'Name is required',
                            })}
                            placeholder="name address"
                          />
                        </InputGroup>
                        {errors.name && (
                          <FormHelperText color="red">
                            {errors.name.message}
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
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={handleShowClick}
                            >
                              {showPassword ? 'Hide' : 'Show'}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        {errors.password && (
                          <FormHelperText color="red">
                            {errors.password.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <Button
                        borderRadius={0}
                        type="submit"
                        variant="solid"
                        colorScheme="blue"
                        width="full"
                      >
                        Add User
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
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
