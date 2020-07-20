import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    '& .MuiFormLabel-root': {
      marginBottom: 15,
      fontSize: 21,
      fontWeight: 'bold',
    },
  },
  image: {
    backgroundImage:
      'url(https://www.kpis.tech/assets/images/people-analytics-background.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepper: {
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  questions: {
    width: '100%',
    padding: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    width: '100%',
  },
  messages: {
    paddingBottom: 30,
  },
  review: {
    padding: 15,
    '& li': {
      padding: 5,
    },
  },
}));
