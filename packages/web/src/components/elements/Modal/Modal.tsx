import React, { createContext, useContext, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Portal } from '../Portal';
import { Box } from '../../layout/Box';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Overylay, ModalContainer } from './Modal.styles';

const sizes = {
  xs: '27rem',
  sm: '38rem',
  md: '44rem',
  lg: '52rem',
  full: '100%',
};
interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  size?: keyof typeof sizes;
}

const ModalContext = createContext<ModalProps>({ isOpen: false, size: 'md' });

export const useModalContext = () => useContext(ModalContext);

export const Modal: React.FC<ModalProps> = (props) => {
  const { children, isOpen, ...rest } = props;
  return (
    <ModalContext.Provider value={{ isOpen, ...rest }}>
      <AnimatePresence exitBeforeEnter>
        {isOpen && <Portal>{children}</Portal>}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

const FadeConfig = {
  enter: {
    opacity: 1,
    transition: { duration: 0.2, ease: [0, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1, ease: [0.4, 0, 1, 1] },
  },
};

export const ModalOverylay: React.FC = ({ children, ...rest }) => {
  return (
    <Overylay variants={FadeConfig} initial='exit' animate='enter' {...rest}>
      {children}
    </Overylay>
  );
};

const ScaleFade = {
  enter: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: [0, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.1, ease: [0.4, 0, 1, 1] },
  },
};

export const ModalContent: React.FC = ({ children }) => {
  const { size, onClose } = useModalContext();
  const ref = useRef<HTMLDivElement | null>(null);

  const onOverlayClick = (e: React.MouseEvent) => {
    if (ref.current !== e.target) return;
    if (onClose) {
      onClose();
    }
  };

  return (
    <Box
      onClick={onOverlayClick}
      ref={ref}
      display='flex'
      alignItems='center'
      justifyContent='center'
      h='100vh'
      w='100%'
      position='fixed'
      top='0'
      left='0'
      zIndex={999}
    >
      <ModalContainer
        maxW={size ? sizes[size] : sizes.md}
        minH={size === 'full' ? '100vh' : ''}
        variants={ScaleFade}
        animate='enter'
        exit='exit'
        initial='exit'
      >
        {children}
      </ModalContainer>
    </Box>
  );
};

export const ModalHeading: React.FC = ({ children }) => {
  return (
    <Box fontWeight='semibold' fontSize='medium' padding='1rem 1.4rem'>
      {children}
    </Box>
  );
};

export const CloseModalButton = () => {
  const { onClose } = useModalContext();

  return (
    <Box position='absolute' top='.2rem' right='1rem'>
      <IconButton
        onClick={onClose}
        variant='ghost'
        size='lg'
        ariaLabel='Close Modal'
        icon={<Icon name='close' />}
      />
    </Box>
  );
};

export const ModalBody: React.FC = ({ children }) => {
  return (
    <Box flex='1' padding='1rem 1.4rem'>
      {children}
    </Box>
  );
};

export const ModalFooter: React.FC = ({ children }) => {
  return (
    <Box
      display='flex'
      padding='1rem 1.4rem'
      alignItems='center'
      justifyContent='flex-end'
    >
      {children}
    </Box>
  );
};
