import React from 'react';
import { Link } from 'react-router-dom';

import {
  Flex,
  Box,
  Image,
  Heading,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
import { BiDetail } from 'react-icons/bi';
function rendercars(cars) {
  return cars.map(car => (
    <Box
      boxShadow="lg"
      key={car._id}
      p="3"
      mb="5"
      borderRadius="10px"
      //   border="1px solid grey"
    >
      <Flex alignItems="flex-start">
        <Image
          borderRadius="5px"
          boxSize="150px"
          objectFit="cover"
          src="https://www.indiacarnews.com/wp-content/uploads/2020/12/New-Car-Launches-In-January-2021-1000x600.jpg"
          alt="Dan Abramov"
        />
        <Box marginLeft="5">
          <Heading as="h4" size="md">
            {car.title}
          </Heading>
          <Box>
            <Text>
              status: {car.status === 'active' ? 'active' : 'Not Active'}
            </Text>
            <Text>Make: {car.make}</Text>
            <Text>Model: {car.model}</Text>
            <Text>Year: {car.manufacturing_year?.slice(0, 10)}</Text>
            <Text>Color: Silver</Text>
          </Box>
          <Heading as="h4" size="md">
            total: ${car.total_cost}
          </Heading>
          <Heading as="h4" my="2" size="xs">
            Weekly $ {car.weekly_payment}
          </Heading>
        </Box>
        <VStack marginLeft="auto">
          <Link to={`/vehicles/${car._id}`}>
            <Button
              width="100%"
              leftIcon={<BiDetail />}
              colorScheme="green"
              variant="solid"
            >
              Details
            </Button>
          </Link>
        </VStack>
      </Flex>
    </Box>
  ));
}
const ListCars = ({ cars }) => {
  return (
    <Flex flexDir="column" p="2" width="80% ">
      {cars && cars.length > 0 ? rendercars(cars) : <Box>No cars found</Box>}
    </Flex>
  );
};

export default ListCars;
