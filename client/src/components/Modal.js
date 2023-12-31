import styled from 'styled-components';
import React, {useEffect} from 'react';

const Modal = ({ isOpen, onClose, message, status }) => {

  const modalOverlayRef = React.useRef(null);

  const handleKeyDown = (event) => {
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      modalOverlayRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalOverlay ref={modalOverlayRef} tabIndex={0} onKeyDown={handleKeyDown}>
      <ModalContent>
        <StatusMessage>{status}</StatusMessage>
        <Messager>{message}</Messager>
        <ExitMessage>Press any key to continue</ExitMessage>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background-color: rgb(0,0,0, 0.7);
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  border: 5px solid black;
  text-align: center;
  width: 50%;
  height: 50%;
  border-radius: 50px;
  border-color: darkgoldenrod;
  border-style: ridge;
  border-width: 5px; 
  padding: 50px;
  z-index: 1;
`;

const StatusMessage = styled.h1`
  color: darkgoldenrod;
  font-size: 72px;
  font-weight: bold;
`;

const Messager = styled.p`
  color: darkgoldenrod;
  font-size: 32px;
  font-weight: bold;
`;

const ExitMessage = styled.p`
  color: darkgoldenrod;
  font-size: 24px;
  font-weight: bold;
`;


export default Modal;