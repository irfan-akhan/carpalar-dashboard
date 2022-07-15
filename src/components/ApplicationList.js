import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function renderApplications(applications) {
  return (
    <TableContainer border="1px solid #f3f3f3" width="98%">
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>By</Th>

            <Th>Applied For</Th>
            <Th>Application Status</Th>
            <Th>Applied on</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>

        <Tbody>
          {applications.map(app => (
            <Tr mb="4" key={app._id}>
              <Td textTransform="capitalize">
                {app.title} {app.first_name} {app.last_name}
              </Td>

              <Td textTransform="capitalize">{app.applied_vehicle_name}</Td>
              <Td
                fontWeight={'bold'}
                textTransform="capitalize"
                color={
                  app.status === 'pending'
                    ? 'blue'
                    : app.status === 'rejected'
                    ? 'red'
                    : app.status === 'under verification'
                    ? 'orange'
                    : 'green'
                }
              >
                {app.status}
              </Td>
              <Td>{app.createdAt.slice(0, 10)}</Td>
              <Td>
                <Link to={`/applications/${app._id}`}>
                  <Button colorScheme={'blue'} variant={'solid'}>
                    Details
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
const ApplicationList = ({ applications }) => {
  return renderApplications(applications);
};

export default ApplicationList;
