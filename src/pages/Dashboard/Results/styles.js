import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  card: {
    width: '100%',
    '& .title': {
      padding: 15,
    },
    '& .chart': {
      width: '100%',
      height: 350,
    },
  },
}));
