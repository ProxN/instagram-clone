import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@components/elements/Button';
import { Icon } from '@components/elements/Icon';
import { Input } from '@components/elements/Input';
import {
  CloseModalButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeading,
  ModalOverylay,
} from '@components/elements/Modal';
import { Text } from '@components/elements/Text';
import { Box } from '@components/layout/Box';
import { Flex } from '@components/layout/Flex';
import { TextArea } from '@components/elements/TextArea';
import { IconButton } from '@components/elements/IconButton';
import { useAddPostMutation, AddPostInput } from '@lib/graphql';
import { client } from '@lib/utility/graphqlClient';

const AddPost: React.FC = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { control, handleSubmit, reset } = useForm<AddPostInput>({
    mode: 'onChange',
    defaultValues: {
      caption: '',
    },
  });

  const { mutate, isLoading } = useAddPostMutation(client, {
    onSuccess: (data) => {
      if (data.addPost.error) {
        toast.error(data.addPost.error.message);
      }
      if (data.addPost.post) {
        reset();
        toast.success('Your post has been shared.');
        handleFormClose();
      }
    },
  });

  const handleSelectClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      setFile(e.target.files[0]);
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, createPost: 'details' },
        },
        '/create/details'
      );
    }
  };

  const onSubmit = (data: AddPostInput) => {
    mutate({
      file,
      ...data,
    });
  };

  if (!router.query.createPost) return null;

  const handleFormClose = () => {
    const { ['createPost']: _, ...rest } = router.query;
    router.push({ pathname: router.pathname, query: rest });
  };

  return (
    <Modal
      isOpen={!!router.query.createPost}
      onClose={handleFormClose}
      size={filePreview ? 'lg' : 'md'}
    >
      <ModalOverylay />
      <ModalContent>
        <ModalHeading>
          <Flex>
            {router.query.createPost === 'details' && (
              <IconButton
                onClick={() => {
                  router.push(
                    {
                      pathname: router.pathname,
                      query: { ...router.query, createPost: 'select' },
                    },
                    '/create/select'
                  );
                }}
                variant='ghost'
                ariaLabel='back'
                size='sm'
                mr={4}
                icon={<Icon name='arrow-back' />}
              />
            )}
            Create new post
          </Flex>
        </ModalHeading>
        <CloseModalButton />
        <ModalBody padding={filePreview && '0rem'}>
          <Box as='form' onSubmit={handleSubmit(onSubmit)}>
            {router.query.createPost === 'select' || !filePreview ? (
              <Flex
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                minH='40rem'
              >
                <Box mb='1rem' fontSize='8rem' color='gray.7'>
                  <Icon name='image' />
                </Box>
                <Text mb='1rem' color='gray'>
                  Drag photos and videos here
                </Text>
                <Button
                  onClick={handleSelectClick}
                  size='sm'
                  isPrimary
                  type='button'
                >
                  Select from computer
                </Button>
                <Box display='none'>
                  <Input
                    onChange={handleFileChange}
                    type='file'
                    id='file'
                    ref={fileInputRef}
                  />
                </Box>
              </Flex>
            ) : (
              <Flex>
                <Box flex='60%'>
                  <Image
                    height='100%'
                    width='100%'
                    alt='post preview'
                    layout='responsive'
                    src={filePreview}
                  />
                </Box>
                <Box flex='40%'>
                  <Flex h='100%' flexDirection='column'>
                    <Controller
                      render={({ field }) => (
                        <TextArea
                          placeholder='Write a caption...'
                          h='100%'
                          border='none'
                          {...field}
                        />
                      )}
                      name='caption'
                      control={control}
                    />
                    <Button
                      isDisabled={isLoading}
                      isLoading={isLoading}
                      isPrimary
                    >
                      Share
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddPost;
