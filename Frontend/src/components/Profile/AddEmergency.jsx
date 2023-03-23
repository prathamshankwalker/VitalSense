import {
  Box,
  Container,
  TextInput,
  Title,
  Select,
  Button,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addEmergencyMember } from "../../state/actions/addMember";
import { useNavigate } from "react-router-dom";

const AddEmergency = () => {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      relation: "",
    },
  });

  const formSubmitHandler = (values, e) => {
    e.preventDefault();
    console.log(values);
    dispatch(
      addEmergencyMember(
        values.name,
        values.phone,
        values.email,
        values.relation
      )
    );
  };
  
  const { hasContacts } = useSelector((state) => state.member);
  // const navigate = useNavigate()

  // useEffect(() => {
  //   navigate("/dashboard");
  // }, [hasContacts]);

  return (
    <Container size="lg">
      <Title mt="4rem" align="center">
        Add Your Emergency Contacts
      </Title>
      <Divider my="md" />
      <Box
        component="form"
        className={styles.formContainer}
        onSubmit={form.onSubmit((values, e) => formSubmitHandler(values, e))}
      >
        <TextInput
          label="Name"
          placeholder="John Doe"
          required
          {...form.getInputProps(`name`)}
        />
        <TextInput
          label="Email"
          placeholder="gmail@gmail.com"
          required
          {...form.getInputProps(`email`)}
        />
        <TextInput
          label="Phone"
          placeholder="00000 00000"
          required
          {...form.getInputProps(`phone`)}
        />
        <TextInput
          label="Relation"
          placeholder="Relation"
          {...form.getInputProps(`relation`)}
        />
        <Button type="submit">Submit</Button>
      </Box>
    </Container>
  );
};
export default AddEmergency;
