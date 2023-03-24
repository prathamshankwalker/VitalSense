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
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { loginUser } from "../../state/actions/login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const disptach = useDispatch();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
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
    console.log(values);
    e.preventDefault();
    disptach(loginUser(values.email, values.password));
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
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component={Link} to="/signup">
          Create account
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
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...form.getInputProps("password")}
        />
        <Button fullWidth mt="xl" type="submit">
          Log In
        </Button>
      </Paper>
    </Container>
  );
}
