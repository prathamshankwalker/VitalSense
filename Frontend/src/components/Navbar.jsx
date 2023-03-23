import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../state/actions/login";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.white,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor: theme.colors.dark[4],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const dispatch = useDispatch();

  const logoutUserHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <Box pb={120} sx={{ background: theme.colors.dark[7] }}>
      <Header height={60} px="md" sx={{ background: theme.colors.dark[7] }}>
        <Group position="apart" sx={{ height: "100%" }}>
          <Text>logo</Text>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link path="/" className={classes.link}>
              Home
            </Link>
            <Link path="/dashboard" className={classes.link}>
              Dashboard
            </Link>
            <Link path="/profile" className={classes.link}>
              Profile
            </Link>
          </Group>

          <Group className={classes.hiddenMobile}>
            <Button variant="filled" onClick={logoutUserHandler}>Logout</Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
            color="dark.0"
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
        sx={{ background: theme.colors.dark[7] }}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color="dark.5" />

          <Link path="/" className={classes.link}>
            Home
          </Link>
          <Link path="/dashboard" className={classes.link}>
            Dashboard
          </Link>
          <Link path="/profile" className={classes.link}>
            Profile
          </Link>

          <Divider my="sm" color="dark.5" />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="light" onClick={logoutUserHandler}>Logout</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
