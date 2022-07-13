import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  getSingleApplication,
  updateApplication,
} from '../services/application.service';
import { Flex, Box, Text, Select, Button, Divider } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { BsFillCheckCircleFill, BsFillPersonLinesFill } from 'react-icons/bs';
import { RiChatDeleteFill } from 'react-icons/ri';
import { FcProcess } from 'react-icons/fc';
import {
  AiFillContacts,
  AiFillPauseCircle,
  AiOutlineSend,
} from 'react-icons/ai';
import { MdArrowDropDown } from 'react-icons/md';
import Field from '../components/Field';
import { FaHandshake } from 'react-icons/fa';
import { VscReport } from 'react-icons/vsc';
import ModalDialog from '../components/ModalDialog';

const SingleApplication = () => {
  const [application, setApplication] = useState({});
  const [detailStep, setDetailStep] = useState('personal');
  const [status, setStatus] = useState(null);

  const {
    first_name,
    last_name,
    title,
    dob,
    payment_status,
    address,
    state,
    gurantorVerified2,
    gurantorVerified1,
    nationality,
    gender,
    marital_status,
    phone,
    alternate_phone,
    email,
    driving_for,
    createdAt,
    updatedAt,
    experience,
    lga,
    thirdPartyStatus,
    nin,
    bvn,
    qualification,
    birth_place,
    applied_for,
    gurantors,
  } = application;

  const { id } = useParams();

  function onSendVerifyHandler(service) {
    console.log('updateThirdPartyStatus');
    updateApplication(id, { updateThirdPartyStatus: true, service: service })
      .then(data => setApplication(data.application))
      .catch(err => console.log('update err catch', err));
  }
  function onSubmitHandler(e) {
    updateApplication(id, { status })
      .then(data => setApplication(data.application))
      .catch(err => console.log('update err catch', err));
  }
  useEffect(() => {
    if (id) {
      getSingleApplication(id)
        .then(data => {
          setApplication(data.application);
        })
        .catch(err => {
          setApplication({});
          console.error(err);
        });
    }
  }, [id]);
  return (
    <Flex>
      <Navbar />
      <Flex ml="16vw" mt="2" width="100%">
        <Flex boxShadow={'lg'} width="70%" flexDir="column">
          <Text
            fontWeight={'500'}
            textAlign="center"
            m="5"
            mb="0"
            fontSize={'xl'}
          >
            Application For {application?.applied_for}
          </Text>
          <Text fontWeight={'400'} textAlign="center" mb="5" fontSize={'sm'}>
            {createdAt?.slice(0, 10)}
          </Text>
          <Flex>
            <Flex
              flexDir={'column'}
              m="3"
              justifyContent={'center'}
              alignItems="center"
            >
              <Button
                size="md"
                onClick={e => setDetailStep('personal')}
                variant={detailStep === 'personal' ? 'solid' : 'outline'}
                colorScheme={'blue'}
              >
                Personal Details &nbsp; <BsFillPersonLinesFill />
              </Button>

              {detailStep === 'personal' ? (
                <MdArrowDropDown
                  style={{ marginTop: '-16px', fontSize: '2.4rem' }}
                  fontSize={'30px'}
                  color="blue"
                />
              ) : (
                <MdArrowDropDown
                  style={{
                    marginTop: '-16px',
                    fontSize: '2.4rem',
                    visibility: 'hidden',
                  }}
                  color="blue"
                />
              )}
            </Flex>

            <Flex
              flexDir={'column'}
              m="3"
              justifyContent={'center'}
              alignItems="center"
            >
              <Button
                size="md"
                onClick={e => setDetailStep('contact')}
                variant={detailStep === 'contact' ? 'solid' : 'outline'}
                colorScheme={'blue'}
              >
                Contact&nbsp; <AiFillContacts fontSize={'1.2rem'} />
              </Button>
              {detailStep === 'contact' ? (
                <MdArrowDropDown
                  style={{ marginTop: '-16px', fontSize: '2.4rem' }}
                  fontSize={'30px'}
                  color="blue"
                />
              ) : (
                <MdArrowDropDown
                  style={{
                    marginTop: '-16px',
                    fontSize: '2.4rem',
                    visibility: 'hidden',
                  }}
                  fontSize={'30px'}
                  color="blue"
                />
              )}
            </Flex>
            <Flex
              flexDir={'column'}
              m="3"
              justifyContent={'center'}
              alignItems="center"
            >
              <Button
                size="md"
                onClick={e => setDetailStep('guarantors')}
                variant={detailStep === 'guarantors' ? 'solid' : 'outline'}
                colorScheme={'blue'}
              >
                Guarantors &nbsp; <FaHandshake fontSize={'1.2rem'} />
              </Button>
              {detailStep === 'guarantors' ? (
                <MdArrowDropDown
                  style={{ marginTop: '-16px', fontSize: '2.4rem' }}
                  fontSize={'30px'}
                  color="blue"
                />
              ) : (
                <MdArrowDropDown
                  style={{
                    marginTop: '-16px',
                    fontSize: '2.4rem',
                    visibility: 'hidden',
                  }}
                  fontSize={'30px'}
                  color="blue"
                />
              )}
            </Flex>
            <Flex
              flexDir={'column'}
              m="3"
              justifyContent={'center'}
              alignItems="center"
            >
              <Button
                size="md"
                onClick={e => setDetailStep('enquiry')}
                variant={detailStep === 'enquiry' ? 'solid' : 'outline'}
                colorScheme={'blue'}
              >
                Enquiry &nbsp; <VscReport fontSize={'1.2rem'} />
              </Button>
              {detailStep === 'enquiry' ? (
                <MdArrowDropDown
                  style={{ marginTop: '-16px', fontSize: '2.4rem' }}
                  fontSize={'30px'}
                  color="blue"
                />
              ) : (
                <MdArrowDropDown
                  style={{
                    marginTop: '-16px',
                    fontSize: '2.4rem',
                    visibility: 'hidden',
                  }}
                  fontSize={'30px'}
                  color="blue"
                />
              )}
            </Flex>
          </Flex>
          <Divider />
          {detailStep === 'personal' && (
            <Flex flexWrap="wrap" p="1rem 1.5rem">
              <Field label="Title" value={title} />
              <Field label="First name" value={first_name} />
              <Field label="Last name" value={last_name} />

              <Field label="Gender" value={gender} />
              <Field label="Marital Status" value={marital_status} />
              <Field label="Nationality" value={nationality} />
              <Field label="Birth Place" value={birth_place} />
              <Field label="Date of Birth" value={dob?.slice(0, 10)} />
              <Field label="Qualification" value={qualification} />
            </Flex>
          )}
          {detailStep === 'contact' && (
            <Flex flexWrap="wrap" p="1rem 1.5rem">
              <Field label="Phone" value={phone} />
              <Field label="Alternate Phone" value={alternate_phone} />
              <Field label="Email" value={email} />

              <Field label="Address" value={address} />
              <Field label="state" value={state} />
            </Flex>
          )}
          {detailStep === 'enquiry' && (
            <Flex flexWrap="wrap" p="1rem 1.5rem">
              <Field label="LGA" value={lga} />
              <Field label="BVN" value={nin} />
              <Field label="NIN" value={bvn} />
              <Field label="Experience" value={experience} />
              <Field label="Driving For" value={driving_for} />
              <Field label="Applied For" value={applied_for} />
            </Flex>
          )}
          {detailStep === 'guarantors' && (
            <Box p="1rem 1.5rem">
              {gurantors?.map((guarantor, idx) => (
                <>
                  <Text
                    textAlign={'center'}
                    textTransform="capitalize"
                    fontWeight="bold"
                    mt="5"
                  >
                    guarantor {idx + 1}
                  </Text>
                  <Divider />
                  <Flex key={idx} flexWrap="wrap" boxShadow="md">
                    <Field label="Title" value={guarantor?.title} />
                    <Field label="First name" value={guarantor?.first_name} />
                    <Field label="Last name" value={guarantor?.last_name} />

                    <Field label="Email" value={guarantor?.email} />
                    <Field label="Phone" value={guarantor?.phone} />
                    <Field label="Job Title" value={guarantor?.job_title} />
                    <Field
                      label="Realtionship"
                      value={guarantor?.relationship}
                    />
                    <Field
                      label="NIN"
                      value={guarantor?.nin || 'Not available'}
                    />
                    <Field
                      label="BVN"
                      value={guarantor?.bvn || 'Not available'}
                    />
                  </Flex>
                </>
              ))}
            </Box>
          )}
        </Flex>
        <Flex flexDir={'column'} p="4" boxShadow={'lg'} width="25%">
          <Text my="3" fontSize="lg" fontWeight={'500'}>
            Current Status
          </Text>
          <Divider />
          <Flex my="3" alignItems={'center'} justifyContent="space-between">
            <Text
              color={
                application?.status === 'Pending'
                  ? 'blue'
                  : application?.status === 'Rejected'
                  ? 'red'
                  : application?.status === 'Processing'
                  ? 'orange'
                  : 'green'
              }
              fontWeight={'bold'}
              textTransform="capitalize"
              letterSpacing="1px"
            >
              {application?.status}
            </Text>
            {application?.status === 'Pending' ? (
              <AiFillPauseCircle color="blue" />
            ) : application?.status === 'Rejected' ? (
              <RiChatDeleteFill color="red" />
            ) : application?.status === 'Processing' ? (
              <FcProcess color="orange" />
            ) : (
              <BsFillCheckCircleFill color="green" />
            )}
          </Flex>
          <Text mb="4" fontSize="xs">
            Last updated: {updatedAt?.slice(0, 10)}
          </Text>

          <Box>
            <Select
              size="sm"
              variant="outline"
              name="status"
              onChange={e => setStatus(e.target.value)}
              placeholder="Change Status"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </Select>
          </Box>
          <Flex justifyContent="space-between" py="2" my="2">
            <Text>Payment </Text>
            {
              <Text
                fontWeight="bold"
                color={payment_status === 'Paid' ? 'green' : 'red'}
              >
                {' '}
                {payment_status || 'Not Paid'}{' '}
              </Text>
            }
          </Flex>
          <Flex justifyContent="space-between" my="2">
            <Text fontWeight={'bold'}>Guarantor Verifications </Text>
          </Flex>
          <Flex justifyContent="space-between" my="2">
            <Text>Guarantor 1 </Text>
            {
              <Text
                fontWeight="bold"
                color={gurantorVerified1 ? 'green' : 'red'}
              >
                {gurantorVerified1 ? 'Verified' : 'Pending'}
              </Text>
            }
          </Flex>
          <Flex justifyContent="space-between" my="2">
            <Text>Guarantor 2 </Text>
            {
              <Text
                fontWeight="bold"
                color={gurantorVerified2 ? 'green' : 'red'}
              >
                {gurantorVerified2 ? 'Verified' : 'Pending'}
              </Text>
            }
          </Flex>
          <Flex justifyContent="space-between" my="4">
            <Text fontWeight={'bold'}>3rd party Verification </Text>
            <Text
              color={
                thirdPartyStatus === 'Pending'
                  ? 'blue'
                  : thirdPartyStatus === 'Rejected'
                  ? 'red'
                  : thirdPartyStatus === 'Not Sent'
                  ? 'orange'
                  : 'green'
              }
              fontWeight={'bold'}
              textTransform="capitalize"
              letterSpacing="1px"
            >
              {application?.thirdPartyStatus}
            </Text>
            {/* {application?.status === 'Pending' ? (
              <AiFillPauseCircle color="blue" />
            ) : thirdPartyStatus === 'Rejected' ? (
              <RiChatDeleteFill color="red" />
            ) : thirdPartyStatus === 'Not Sent' ? (
              <FcProcess color="orange" />
            ) : (
              <BsFillCheckCircleFill color="green" />
            )} */}
          </Flex>

          {thirdPartyStatus === 'Not Sent' ? (
            <>
              <ModalDialog
                title="Send this application for third party verification  verification"
                label="Verify with okra"
                icon={<AiOutlineSend />}
                callback={e => {
                  onSendVerifyHandler('okra');
                }}
              />
              <ModalDialog
                title="Send this application for third party verification"
                label="Verify with other"
                icon={<AiOutlineSend />}
                callback={e => {
                  onSendVerifyHandler('other');
                }}
              />
            </>
          ) : null}

          {status && (
            <Button
              onClick={onSubmitHandler}
              my="6"
              variant="solid"
              w="100%"
              p="5"
              colorScheme={'green'}
              size="sm"
            >
              Save Changes
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SingleApplication;
