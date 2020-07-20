import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  helpers: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
  },
  options: {
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& .option': {
      margin: 10,
      padding: 10,
      minWidth: 40,
      minHeight: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'transparent',
      cursor: 'pointer',
      borderRadius: 4,
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.palette.text.secondary,
      border: '2px solid',
      borderColor: theme.palette.secondary.main,
    },
    '& .active': {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderColor: theme.palette.primary.main,
    },
  },
}));
