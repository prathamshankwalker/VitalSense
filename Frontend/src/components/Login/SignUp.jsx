import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Center,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../state/actions/login";

export default function Signup() {
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      name: "",
      password: "",
      email: "",
    //   contacts: [{ name: "", phone: "", email: "", relation: "" }],
    },
  });

  const formSubmitHandler = (values, e) => {
    e.preventDefault();
    console.log(values);
    dispatch(signUpUser(values.email, values.password, values.name));
  };

  return (
    <Container size="xs" my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Have an account?{" "}
        <Anchor size="sm" component={Link} to="/login">
          Login
        </Anchor>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        component="form"
        onSubmit={form.onSubmit((values, e) => formSubmitHandler(values, e))}
      >
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Name"
          placeholder="John Doe"
          required
          {...form.getInputProps(`name`)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...form.getInputProps("password")}
        />
        {/* contact */}
        <Text mt="lg" my="sm">
          Add emergency contacts
        </Text>

        {/* {form.values.contacts.map((index, item) => (
          <>
            <Text>Emergency Contact {index} </Text>
            <TextInput
              label="Name"
              placeholder="John Doe"
              required
              {...form.getInputProps(`contacts.${index}.name`)}
            />
            <TextInput
              label="Phone"
              placeholder="+91 00000 00000"
              type="tel"
              required
              {...form.getInputProps(`contacts.${index}.phone`)}
            />
            <TextInput
              label="Email"
              placeholder="x@gmail.com"
              required
              {...form.getInputProps(`contacts.${index}.email`)}
            />
            <TextInput
              label="Relation"
              placeholder="Father"
              {...form.getInputProps(`contacts.${index}.relation`)}
            />
          </>
        ))} */}

        {/* <Center>
          <Button
            variant="outline"
            size="xs"
            onClick={() =>
              form.insertListItem("contacts", {
                name: "",
                phone: "",
                password: "",
                relation: "",
              })
            }
          >
            Add contact
          </Button>
        </Center> */}

        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
