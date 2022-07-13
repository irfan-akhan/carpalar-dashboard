import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Field = ({ label, value, border, capitalize, reverse, color }) => {
  return !reverse ? (
    <Box
      p="2"
      width={border ? '50%' : '30%'}
      mr="2.5%"
      my={border ? 0 : '2'}
      border={border && '1px solid #80808038'}
    >
      <Text textTransform={'capitalize'} mb="1" color="gray.500">
        {label}
      </Text>
      <Text
        fontWeight={'500'}
        w="fit-content"
        textTransform={capitalize ? 'capitalize' : null}
        borderBottom="1px solid #0000ff54"
      >
        {value}
      </Text>
    </Box>
  ) : (
    <Box width={border ? '50%' : '30%'}>
      <Text
        fontWeight={'500'}
        w="fit-content"
        color={color ? color : 'inherit'}
        textTransform={capitalize ? 'capitalize' : null}
      >
        {value}
      </Text>
      <Text
        mb="5px"
        textTransform={'capitalize'}
        fontSize="smaller"
        color="gray.500"
      >
        {label}
      </Text>
    </Box>
  );
};

export default Field;
