import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
  logo: {
    padding: '10px 0',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    height: 60,
    objectFit: 'contain',
    '& span': {
      padding: 10,
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));
