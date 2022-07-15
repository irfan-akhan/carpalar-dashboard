import React, { useEffect, useState } from 'react';
import ListCars from '../components/ListCars.js';
import { HiOutlineFolderAdd } from 'react-icons/hi';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
  Flex,
  Heading,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { getVehicles, searchVehicles } from '../services/vehicle.services';
import Navbar from '../components/Navbar.js';
import { useRef } from 'react';

const Vehicles = () => {
  const [cars, setCars] = useState([]);
  const searchRef = useRef(null);
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

  function searchCars(e) {
    console.log('searcj for', searchRef.current.value);
    searchVehicles(searchRef.current.value)
      .then(data => {
        console.log('succ', data);
        setCars(data);
      })
      .catch(err => console.log('catch err', err));
  }

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
        <form
          onSubmit={e => {
            e.preventDefault();
            searchCars();
          }}
        >
          <InputGroup minW="90% ">
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch color="red.300" />}
            />
            <Input
              ref={searchRef}
              type="text"
              placeholder="Search:- Name Make or Model"
            />
          </InputGroup>
        </form>
        <Text color="green" my="2" mx="3" textTransform="uppercase">
          results: {cars.length}
        </Text>
        <Flex width="100%">
          <ListCars cars={cars} />
          {/* {cars && cars.length > 0 ? <FilterCars /> : null} */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Vehicles;
