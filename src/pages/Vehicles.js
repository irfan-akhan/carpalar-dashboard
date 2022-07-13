import React, { useEffect, useState } from 'react';
import ListCars from '../components/ListCars.js';
import { HiOutlineFolderAdd } from 'react-icons/hi';
import FilterCars from '../components/FilterCars.js';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
  Flex,
  Heading,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { getVehicles } from '../services/vehicle.services';
import Navbar from '../components/Navbar.js';

const Vehicles = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    try {
      getVehicles()
        .then(cars => setCars(cars))
        .catch(error => {
          console.log('all cars catch');
          setCars([]);
        });
    } catch (error) {
      setCars([]);

      console.log('get all cars error', error);
    }
  }, []);

  return (
    <Flex>
      <Navbar />
      <Flex flexDir={'column'} padding="4" ml="16vw" width="100%">
        <Flex justifyContent="space-between">
          <Heading
            as="h1"
            size="lg"
            textTransform="uppercase"
            textAlign="center"
            mb="4"
          >
            Vehicles
          </Heading>
          <Link to="/addvehicle">
            <Button
              leftIcon={<HiOutlineFolderAdd />}
              colorScheme="teal"
              variant="solid"
            >
              Add Vehicle
            </Button>
          </Link>
        </Flex>
        <InputGroup minW="90% ">
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineSearch color="red.300" />}
          />
          <Input type="text" placeholder="Search a car" />
        </InputGroup>
        <Flex width="100%">
          <ListCars cars={cars} />
          {cars && cars.length > 0 ? <FilterCars /> : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Vehicles;
