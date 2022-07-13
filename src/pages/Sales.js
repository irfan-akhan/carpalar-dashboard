import React, { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Button,
  Text,
  useToast,
  Box,
  Image,
  Divider,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { AiOutlineBank } from 'react-icons/ai';
import { GiReceiveMoney } from 'react-icons/gi';
import { getAllSales } from '../services/sale.service';
import { Link } from 'react-router-dom';
import Field from '../components/Field';

function generateSalesList(salesList) {
  console.log(salesList[0]);
  return salesList.map(sale => (
    <Flex
      w="48%"
      m="1%"
      ml="0"
      // boxShadow="2xl"
      border={'2px solid #e9e9e9'}
      p="2"
      borderRadius="7px"
      key={sale?._id}
      justifyContent="flex-start"
      alighItems="center"
      _hover={{ transform: 'scale(1.01)', transition: 'all .2s linear' }}
    >
      <Image
        borderRadius="5px"
        boxSize="150px"
        objectFit="cover"
        src="https://www.indiacarnews.com/wp-content/uploads/2020/12/New-Car-Launches-In-January-2021-1000x600.jpg"
        alt="Dan Abramov"
      />
      <Flex flexDir={'column'} ml="3" w="100%">
        <Flex flexWrap={'wrap'} justifyContent="space-between" w="100%">
          <Text fontWeight={'bolder'} as="h2">
            {sale.vehicle?.title}
          </Text>
          <Flex alignItems="center">
            <span style={{ fontWeight: '300', fontSize: '12px' }}>
              by:&nbsp;{' '}
            </span>

            {sale.customer?.firstName + ' ' + sale.customer?.lastName}
          </Flex>
        </Flex>
        <Divider my="1" />

        <Flex flexWrap={'wrap'} justifyContent="space-between" w="100%">
          <Field
            label="sale type"
            value={sale.type}
            capitalize={true}
            reverse={true}
          />

          <Field
            label="sale type"
            value={sale.type}
            capitalize={true}
            reverse={true}
          />
        </Flex>
        <Flex justifyContent="space-between" w="100%">
          <Field
            label="price"
            value={'$ ' + sale.total_amount}
            capitalize={true}
            reverse={true}
          />

          <Field
            label="paid"
            color={sale.paid_amount > 0 ? 'green' : 'red'}
            value={'$ ' + sale.paid_amount}
            capitalize={true}
            reverse={true}
          />
        </Flex>
        <Divider mb="2" />
        <Flex justifyContent="space-between">
          <Link to={`/sales/${sale?._id}`}>
            <Button
              mr="30px"
              size="sm"
              variant="outline"
              colorScheme="telegram"
            >
              Details
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  ));
}

const Sales = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [sales, setSales] = useState();
  const toast = useToast();
  useEffect(() => {
    getAllSales(filterQuery)
      .then(data => {
        setSales(data.sales);
      })
      .catch(err => {
        console.log('err is a', err);
        toast({
          title: 'somwthing went wrong',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }, [filterQuery]);
  console.log('first', filterQuery);
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
            Sales
          </Heading>
        </Flex>
        <Flex alignItems={'center'}>
          <Text fontWeight={'semibold'}>
            Filter Sales by: <br />
            <button
              style={{ color: 'green', fontSize: '14px' }}
              onClick={e => setFilterQuery('')}
            >
              Clear Filters
            </button>
          </Text>
          <Button
            onClick={e => {
              setFilterQuery('finance');
            }}
            variant={filterQuery === 'finance' ? 'solid' : 'outline'}
            colorScheme="messenger"
            leftIcon={<AiOutlineBank />}
            m="3"
          >
            Finance
          </Button>
          <Button
            onClick={e => {
              setFilterQuery('buy-out');
            }}
            colorScheme="messenger"
            variant={filterQuery === 'buy-out' ? 'solid' : 'outline'}
            leftIcon={<GiReceiveMoney />}
            m="3"
          >
            Sale
          </Button>
        </Flex>
        <Flex flexWrap={'wrap'}>
          {sales && sales.length > 0 ? (
            generateSalesList(sales)
          ) : (
            <Text>No sales found</Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sales;
