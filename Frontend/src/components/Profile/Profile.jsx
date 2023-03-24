import { Button, Container, Group, Paper, Text, createStyles, Avatar } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getViewMember } from "../../state/actions/viewMembers";
import styles from "./profile.module.css";
import { IconPhoneCall, IconAt } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

function UserInfoIcons({ name, phone, email }) {
  const { classes, theme } = useStyles();
  return (
    <Group noWrap sx={{borderRadius: theme.radius.md}}>
      <Avatar size={94} radius="md" />
      <div>
        <Text fz="lg" fw={500} className={classes.name}>
          {name}
        </Text>

        <Group noWrap spacing={10} mt={3}>
          <IconAt stroke={1.5} size="1rem" className={classes.icon} />
          <Text fz="xs" c="dimmed">
            {email}
          </Text>
        </Group>

        <Group noWrap spacing={10} mt={5}>
          <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
          <Text fz="xs" c="dimmed">
            {phone}
          </Text>
        </Group>
      </div>
    </Group>
  );
}

const Profile = () => {
  const { loading, data, error } = useSelector((state) => state.viewMember);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getViewMember());
  }, []);

  return (
    !loading && (
      <Container size="xl" >
        <Group>
          <Button>Edit Profile</Button>
        </Group>
        <Container size="xl" my="lg" className={styles.container}>
          {data.map((item) => (
            <UserInfoIcons
              name={item.name}
              email={item.email}
              phone={item.phone}
            />
          ))}
        </Container>
      </Container>
    )
  );
};
export default Profile;
