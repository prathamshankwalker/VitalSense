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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUserProfile } from "../../state/actions/profile";

export default function Signup() {
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/addprofile");
    }
  }, [isAuthenticated]);

  const formSubmitHandler = (values, e) => {
    e.preventDefault();
    console.log(values);
    dispatch(
      signUpUser(values.email, values.password, values.name)
    );
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

        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
