import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';

export default function ModalDialog({ title, callback, label, icon }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        leftIcon={icon ? icon : <AiOutlineDelete color="red" />}
        onClick={onOpen}
        colorScheme="red"
        variant={'outline'}
        color="red"
      >
        {label ? label : 'Delete'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title || 'Modal Title'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to {label ? label : 'delete this item'}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme="red" onClick={callback}>
              {label ? label : 'Delete'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
