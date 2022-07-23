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
  Input,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { uploadImagesToS3 } from '../services/imageUpload.service';

export default function UploadImageModal({ vehicelName }) {
  const [imageFile, setImageFile] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  async function onImageSubmitHandler(e) {
    console.log('first');
    try {
      if (imageFile?.currentFile) {
        await uploadImagesToS3(imageFile.currentFile);
      } else {
        console.log('Please select image');
      }
    } catch (error) {
      console.log('onImageSubmitHandler error', error);
    }
  }
  function onFileChangeandler(e) {
    setImageFile({
      currentFile: e.target.files[0],
      previewImage: URL.createObjectURL(e.target.files[0]),
    });
  }
  console.log('imge file', imageFile);
  return (
    <>
      <Button
        leftIcon={<AiOutlineDelete color="#fff" />}
        onClick={onOpen}
        colorScheme="red"
        variant={'solid'}
        color="#fff"
        size="sm"
      >
        Upload New Image for {vehicelName}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{'Modal Title'}</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={e => {
              e.preventDefault();
              onImageSubmitHandler();
            }}
          >
            <ModalBody>
              <Input
                onChange={onFileChangeandler}
                type="file"
                name="imageFile"
                id="yoyo"
              />
              {imageFile?.previewImage && (
                <Image src={imageFile.previewImage} />
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={e => {
                  setImageFile({});
                }}
              >
                Close
              </Button>
              <Button
                isDisabled={imageFile?.currentFile ? false : true}
                type="submit"
                variant="solid"
                colorScheme="red"
              >
                Upload
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
