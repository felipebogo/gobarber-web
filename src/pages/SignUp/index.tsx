import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object): Promise<void> => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().min(8, 'Senha de no mínimo 8 dígitos'),
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
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <Link to="/">
          <FiArrowLeft /> Voltar para logon
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
