import React from 'react';
import { Flex, Box, Text, Select } from '@chakra-ui/react';
import { GoSettings } from 'react-icons/go';
const FilterCars = () => {
  return (
    <Box>
      <Flex justifyContent="center">
        <GoSettings />
        <Text ml="2" fontSize="lg">
          Filter
        </Text>
      </Flex>

      <Select placeholder="Model" mb="2">
        <option value="option1">Tesla X</option>
        <option value="option2">BMW 4 </option>
        <option value="option3">Option 3</option>
      </Select>
      <Select placeholder="Make" mb="2">
        <option value="option1">Tesla</option>
        <option value="option2">BMW 2</option>
        <option value="option3">Ferrari</option>
      </Select>
      <Select placeholder="Year" mb="2">
        <option value="option1">2018</option>
        <option value="option2">2019</option>
        <option value="option3">2022</option>
      </Select>
    </Box>
  );
};

export default FilterCars;
