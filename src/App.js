import React from 'react';
import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Vehicles from './pages/Vehicles';
import SingleCarList from './pages/SingleCarList';
import SingleUser from './pages/SingleUser';
import SingleCustomer from './pages/SingleCustomer';
import SingleSale from './pages/SingleSale';
import AddVehicle from './pages/AddVehicle';
import Applications from './pages/Applications';
import Users from './pages/Users';
import Customers from './pages/Customers';
import SingleApplication from './pages/SingleApplication';
import Sales from './pages/Sales';

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/addvehicle" element={<AddVehicle />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/:id" element={<SingleApplication />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<SingleCustomer />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/sales/:id" element={<SingleSale />} />
        <Route path="/vehicles/:id" element={<SingleCarList />} />
      </Routes>

      <Footer />
    </Box>
  );
}

export default App;
