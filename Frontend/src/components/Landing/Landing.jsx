import { createStyles, Container, Text, Button, Group, rem } from '@mantine/core';
// import {useState,useEffect} from 'react'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: rem(200),
    paddingBottom: rem(120),
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    textTransform: 'uppercase',

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),
    textTransform: "uppercase",

    [theme.fn.smallerThan('sm')]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },
}));

export default function Landing() {
  const { classes } = useStyles();
  // const [variable,setVariable] = useState(0)

  // useEffect(()=>{
  //   console.log("Hello worldß")
  // },[variable])

  return (
    <div className={classes.wrapper}>
      <Container size="xl" className={classes.inner}>
        <h1 className={classes.title}>
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            vitals tracking
          </Text>{' '}
          with ease
        </h1>

        <Group className={classes.controls}>
          <Button
            size="md"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            // onClick={()=>setVariable(variable + 1)}
          >
            let's get started
          </Button>
        </Group>
      </Container>
    </div>
  );
}