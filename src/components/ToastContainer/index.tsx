import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';

import { ToastMessage } from '../../hooks/Toast';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransiction = useTransition(
    messages,
    (message) => message.id,
    {
      config: { duration: 400 },
      from: { right: '-120%', opacity: 0 },
      enter: { right: '-0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );
  return (
    <Container>
      {messagesWithTransiction.map(({ key, item, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
