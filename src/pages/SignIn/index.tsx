/* eslint-disable no-undef */
import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object): Promise<void> => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email não foi informado.')
          .email('Digite um email válido.'),
        password: Yup.string().required('A senha não foi informada.'),
      });
      await schema.validate(data, { abortEarly: false });
      formRef.current?.setErrors({});
    } catch (error) {
      const err = getValidationErrors(error);
      formRef.current?.setErrors(err);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <Link to="forgot">Esqueci minha senha</Link>
        </Form>
        <Link to="signup">
          <FiLogIn /> Criar Conta
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
