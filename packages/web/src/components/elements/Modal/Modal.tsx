import React, { createContext, useContext, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Portal } from '../Portal';
import { Box, BoxProps } from '../../layout/Box';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Overylay, ModalContainer } from './Modal.styles';

const sizes = {
  xs: '27rem',
  sm: '38rem',
  md: '44rem',
  lg: '52rem',
  xl: '94rem',
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

  useEffect(() => {
    const element = document.querySelector('body');
    if (!element || !isOpen) return;

    element.style.overflow = 'hidden';

    return () => {
      element.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ isOpen, ...rest }}>
      <AnimatePresence>{isOpen && <Portal>{children}</Portal>}</AnimatePresence>
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

export const ModalOverylay: React.FC<{ rgba?: number }> = ({
  children,
  rgba = 8,
  ...rest
}) => {
  return (
    <Overylay
      variants={FadeConfig}
      rgba={rgba}
      initial='exit'
      animate='enter'
      {...rest}
    >
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
    scale: 0.8,
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
      p='0 2.5rem'
      top='0'
      left='0'
      zIndex={999}
    >
      <ModalContainer
        style={{
          maxWidth: size ? sizes[size] : sizes.md,
          minHeight: size === 'full' ? '100vh' : '',
        }}
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

export const CloseModalButton: React.FC<{ isFixed?: boolean }> = ({
  isFixed = false,
}) => {
  const { onClose } = useModalContext();

  return (
    <Box
      position={isFixed ? 'fixed' : 'absolute'}
      top='.2rem'
      right='1rem'
      color={isFixed ? '#fff' : 'inerit'}
    >
      <IconButton
        onClick={onClose}
        variant={isFixed ? 'link' : 'ghost'}
        color={isFixed ? 'inherit' : ''}
        size='lg'
        ariaLabel='Close Modal'
        icon={<Icon name='close' />}
      />
    </Box>
  );
};

export const ModalBody: React.FC<BoxProps> = ({
  children,
  padding,
  ...rest
}) => {
  return (
    <Box flex='1' padding={padding || '1rem 1.4rem'} {...rest}>
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
