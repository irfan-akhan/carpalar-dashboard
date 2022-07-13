import { Flex, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ApplicationList from '../components/ApplicationList';
import Navbar from '../components/Navbar';
import { getAllApplications } from '../services/application.service';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    getAllApplications()
      .then(data => setApplications(data.applications))
      .catch(err => console.log(err));
  }, []);
  return (
    <Flex>
      <Navbar />
      {applications?.length === 0 ? (
        <Text ml="16vw">No Applications found</Text>
      ) : (
        <Flex ml="16vw" alignItems="center" mt="3" w="100%" flexDir={'column'}>
          <Heading as="h2" size="md">
            Applications
          </Heading>
          <ApplicationList applications={applications} />
        </Flex>
      )}
    </Flex>
  );
};

export default Applications;
