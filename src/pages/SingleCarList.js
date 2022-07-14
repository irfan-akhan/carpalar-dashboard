import { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  FormControl,
  Input,
  FormLabel,
  Stack,
  ButtonGroup,
  Button,
  RadioGroup,
  Radio,
  FormHelperText,
  Text,
  Textarea,
  useToast,
  Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import {
  getVehicle,
  updateVehicle,
  deleteVehicle,
} from '../services/vehicle.services';
import { useNavigate, useParams } from 'react-router';
import ModalDialog from '../components/ModalDialog';
import Navbar from '../components/Navbar';
import { FiEdit } from 'react-icons/fi';

const SingleCarList = () => {
  let navigate = useNavigate();
  const [car, setCar] = useState({});
  const [editMode, setEditMode] = useState(false);
  let { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const toast = useToast();
  useEffect(() => {
    getVehicle(id)
      .then(car => {
        if (car) {
          reset({
            ...car,
            manufacturing_year: car.manufacturing_year.slice(0, 10),
          });
        }
        setCar(car);
      })
      .catch(err => {
        toast({
          title: 'Failed to get car! ' + err,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }, [id, reset, toast]);

  function onSubmitHandler(data) {
    toast({
      title: 'Updating, Please wait!',
      status: 'info',
      duration: 500,
      isClosable: true,
    });
    updateVehicle(id, data)
      .then(data => {
        toast({
          title: 'Car Updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setCar(data);
      })
      .catch(err => {
        toast({
          title: 'Failed to update car!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }
  return (
    <Flex>
      <Navbar />
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        ml="16vw"
      >
        <Flex justifyContent="space-between" width="90%" mt="3">
          <Heading as="h1" size="lg" mb="5">
            {editMode ? 'Update Car' : ' Car Details'}
          </Heading>
          <ButtonGroup>
            <ModalDialog
              callback={() => {
                deleteVehicle(id)
                  .then(resp => {
                    console.log('delete resp', resp);
                    toast({
                      title: 'Car deleted successfully!',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                    navigate('/vehicles');
                  })
                  .catch(err => {
                    console.log('detele error', err.toString());
                    toast({
                      title: 'Failed to delete car!' + err.toString(),
                      status: 'error',
                      duration: 3000,
                      isClosable: true,
                    });
                  });
              }}
            />
            <Button
              colorScheme="green"
              variant="solid"
              onClick={e =>
                setEditMode(prev => {
                  if (prev) {
                    reset({
                      ...car,
                      manufacturing_year: car.manufacturing_year.slice(0, 10),
                    });
                  }
                  return !prev;
                })
              }
              leftIcon={<FiEdit />}
            >
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
          </ButtonGroup>
        </Flex>
        <Flex
          flexDir="column"
          justifyContent="flex-start"
          boxShadow="lg"
          borderRadius="15px"
          width="90%"
          p="5"
        >
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="title">Car Title </FormLabel>
                <Input
                  isInvalid={errors.title}
                  aria-label="title"
                  name="title"
                  errorBorderColor="crimson"
                  type="text"
                  placeholder="Title"
                  {...register('title', {
                    required: 'Please enter title',
                  })}
                />
                {errors.title && (
                  <FormHelperText color="red">
                    {errors.title.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="description">Description </FormLabel>
                <Textarea
                  isInvalid={errors.description}
                  aria-label="description"
                  name="description"
                  errorBorderColor="crimson"
                  placeholder="description"
                  {...register('description', {
                    required: 'Please enter description',
                  })}
                />
                {errors.description && (
                  <FormHelperText color="red">
                    {errors.description.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="tag_line"> Tag line </FormLabel>
                <Input
                  isInvalid={errors.tag_line}
                  aria-label="tag_line"
                  name="tag_line"
                  errorBorderColor="crimson"
                  type="text"
                  placeholder="Enter car Tag line"
                  {...register('tag_line', {
                    required: 'Please enter tag line',
                  })}
                />
                {errors.tag_line && (
                  <FormHelperText color="red">
                    {errors.tag_line.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="manufacturing_year">
                  Manufacturing year{' '}
                </FormLabel>
                <Input
                  isInvalid={errors.manufacturing_year}
                  aria-label="manufacturing_year"
                  name="manufacturing_year"
                  errorBorderColor="crimson"
                  type="date"
                  placeholder="manufacturing_year"
                  {...register('manufacturing_year', {
                    required: 'Please enter manufacturing year',
                  })}
                />
                {errors.manufacturing_year && (
                  <FormHelperText color="red">
                    {errors.manufacturing_year.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="make">Maker </FormLabel>
                <Input
                  isInvalid={errors.make}
                  aria-label="make"
                  name="make"
                  errorBorderColor="crimson"
                  type="text"
                  placeholder="make"
                  {...register('make', {
                    required: 'Please enter maker of the car',
                  })}
                />
                {errors.make && (
                  <FormHelperText color="red">
                    {errors.make.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="model">Model </FormLabel>
                <Input
                  isInvalid={errors.model}
                  aria-label="model"
                  name="model"
                  errorBorderColor="crimson"
                  type="text"
                  placeholder="model"
                  {...register('model', {
                    required: 'Please enter model of the car',
                  })}
                />
                {errors.model && (
                  <FormHelperText color="red">
                    {errors.model.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="fuel_type">Fuel type </FormLabel>
                <Input
                  isInvalid={errors.fuel_type}
                  aria-label="fuel_type"
                  name="fuel_type"
                  errorBorderColor="crimson"
                  type="text"
                  placeholder="fuel_type"
                  {...register('fuel_type', {
                    required: 'Please enter fuel type of the car',
                  })}
                />
                {errors.fuel_type && (
                  <FormHelperText color="red">
                    {errors.fuel_type.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="mileage">Mileage </FormLabel>
                <Input
                  isInvalid={errors.mileage}
                  aria-label="mileage"
                  name="mileage"
                  errorBorderColor="crimson"
                  type="text"
                  placeholder="mileage"
                  {...register('mileage', {
                    required: 'Please enter mileage of the car',
                  })}
                />
                {errors.mileage && (
                  <FormHelperText color="red">
                    {errors.mileage.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="status">Status </FormLabel>
                {/* <Input
                  isInvalid={errors.status}
                  aria-label="status"
                  name="status"
                  errorBorderColor="crimson"
                  type="text"
                  placeholder="status"
                  {...register('status', {
                    required: 'Please enter status of the car',
                  })}
                /> */}
                <Select
                  isInvalid={errors.status}
                  aria-label="status"
                  name="status"
                  errorBorderColor="crimson"
                  type="text"
                  placeholder="status"
                  {...register('status', {
                    required: 'Please enter status of the car',
                  })}
                >
                  <option value={1}>Active</option>
                  <option value={0}>De-active</option>
                </Select>
                {errors.status && (
                  <FormHelperText color="red">
                    {errors.status.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="horsepower">Horsepower </FormLabel>
                <Input
                  isInvalid={errors.horsepower}
                  aria-label="horsepower"
                  name="horsepower"
                  errorBorderColor="crimson"
                  type="text"
                  placeholder="horsepower"
                  {...register('horsepower', {
                    required: 'Please enter horsepower of the car',
                  })}
                />
                {errors.horsepower && (
                  <FormHelperText color="red">
                    {errors.horsepower.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="doors">Doors</FormLabel>
                <Input
                  isInvalid={errors.doors}
                  aria-label="doors"
                  name="doors"
                  errorBorderColor="crimson"
                  type="number"
                  placeholder="doors"
                  {...register('doors', {
                    required: 'Please enter  number of Doors',
                  })}
                />
                {errors.doors && (
                  <FormHelperText color="red">
                    {errors.doors.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="passengers">passengers</FormLabel>
                <Input
                  isInvalid={errors.passengers}
                  aria-label="passengers"
                  name="passengers"
                  errorBorderColor="crimson"
                  type="number"
                  placeholder="passengers"
                  {...register('passengers', {
                    required: 'Please enter number of passengers',
                  })}
                />
                {errors.passengers && (
                  <FormHelperText color="red">
                    {errors.passengers.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="total_cost">Total cost </FormLabel>
                <Input
                  isInvalid={errors.total_cost}
                  aria-label="total_cost"
                  name="total_cost"
                  errorBorderColor="crimson"
                  type="number"
                  placeholder="total_cost"
                  {...register('total_cost', {
                    required: 'Please enter total cost of the car',
                  })}
                />
                {errors.total_cost && (
                  <FormHelperText color="red">
                    {errors.total_cost.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="down_payment">Down payments </FormLabel>
                <Input
                  isInvalid={errors.down_payment}
                  aria-label="down_payment"
                  name="down_payment"
                  errorBorderColor="crimson"
                  type="number"
                  placeholder="down_payment"
                  {...register('down_payment', {
                    required: 'Please enter down payments of the car',
                  })}
                />
                {errors.down_payment && (
                  <FormHelperText color="red">
                    {errors.down_payment.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="weekly_payment">Weekly payments </FormLabel>
                <Input
                  isInvalid={errors.weekly_payment}
                  aria-label="weekly_payment"
                  name="weekly_payment"
                  errorBorderColor="crimson"
                  type="number"
                  placeholder="weekly_payment"
                  {...register('weekly_payment', {
                    required: 'Please enter weekly payments of the car',
                  })}
                />
                {errors.weekly_payment && (
                  <FormHelperText color="red">
                    {errors.weekly_payment.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="fm">
                  FM support{' '}
                  {getValues('fm') === 'false' ? (
                    <Text display="inline" color="red">
                      &nbsp; (No)
                    </Text>
                  ) : (
                    <Text display="inline" color="green">
                      &nbsp;(Yes)
                    </Text>
                  )}{' '}
                </FormLabel>
                {console.log('dd', getValues('fm')?.toString())}
                <RadioGroup
                  defaultValue={getValues('fm')?.toString()}
                  name="fm"
                >
                  <Stack spacing={4} direction="row">
                    <Radio
                      {...register('fm', {
                        required: 'Please enter FM support of the car',
                      })}
                      value="true"
                    >
                      Yes
                    </Radio>
                    <Radio
                      {...register('fm', {
                        required: 'Please enter FM support of the car',
                      })}
                      value="false"
                    >
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
                {errors.fm && (
                  <FormHelperText color="red">
                    {errors.fm.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="audio_input">
                  Audio input support{' '}
                  {getValues('audio_input') === 'false' ? (
                    <Text display="inline" color="red">
                      &nbsp; ( No)
                    </Text>
                  ) : (
                    <Text display="inline" color="green">
                      &nbsp; ( Yes)
                    </Text>
                  )}
                </FormLabel>
                <RadioGroup
                  defaultValue={getValues('audio_input')?.toString()}
                  name="audio_input"
                >
                  <Stack spacing={4} direction="row">
                    <Radio
                      {...register('audio_input', {
                        required:
                          'Please enter Audio inputs support of the car',
                      })}
                      value="true"
                    >
                      Yes
                    </Radio>
                    <Radio
                      {...register('audio_input', {
                        required:
                          'Please enter Audio inputs support of the car',
                      })}
                      value="false"
                    >
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
                {errors.audio_input && (
                  <FormHelperText color="red">
                    {errors.audio_input.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="air_condition">
                  Air condition support{' '}
                  {getValues('air_condition') === 'false' ? (
                    <Text display="inline" color="red">
                      &nbsp; (No)
                    </Text>
                  ) : (
                    <Text display="inline" color="green">
                      &nbsp;(Yes)
                    </Text>
                  )}
                </FormLabel>
                <RadioGroup
                  defaultValue={getValues('air_condition')?.toString()}
                  name="air_condition"
                >
                  <Stack spacing={4} direction="row">
                    <Radio
                      {...register('air_condition', {
                        required: 'Please enter air condition of the car',
                      })}
                      value="true"
                    >
                      Yes
                    </Radio>
                    <Radio
                      {...register('air_condition', {
                        required: 'Please enter air condition of the car',
                      })}
                      value="false"
                    >
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
                {errors.air_condition && (
                  <FormHelperText color="red">
                    {errors.air_condition.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isReadOnly={!editMode} mb="2">
                <FormLabel htmlFor="fog_lights">
                  Fog lights support{' '}
                  {getValues('fog_lights') === 'false' ? (
                    <Text display="inline" color="red">
                      &nbsp; (No)
                    </Text>
                  ) : (
                    <Text display="inline" color="green">
                      &nbsp;(Yes)
                    </Text>
                  )}
                </FormLabel>
                <RadioGroup
                  defaultValue={getValues('fog_lights')?.toString()}
                  name="fog_lights"
                >
                  <Stack spacing={4} direction="row">
                    <Radio
                      {...register('fog_lights', {
                        required: 'Please enter Fog lights of the car',
                      })}
                      value="true"
                    >
                      Yes
                    </Radio>
                    <Radio
                      {...register('fog_lights', {
                        required: 'Please enter Fog lights of the car',
                      })}
                      value="false"
                    >
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
                {errors.fog_lights && (
                  <FormHelperText color="red">
                    {errors.fog_lights.message}
                  </FormHelperText>
                )}
              </FormControl>
              {editMode && <Button type="submit">Update</Button>}
            </Stack>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SingleCarList;
