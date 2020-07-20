import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, FormLabel} from '@material-ui/core';

import {useStyles} from './styles';

const SingleAnswerCustom = ({
  initialValue,
  value,
  onSelect,
  options,
  title,
  helpers,
}) => {
  const classes = useStyles();
  const selected = value || initialValue;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <div className={classes.helpers}>
          <span>{helpers.low_text}</span>
          <span>{helpers.high_text}</span>
        </div>
        <div className={classes.options}>
          {options.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`option ${item.value === selected ? 'active' : ''}`}
              onClick={() => onSelect(item.value)}>
              {item.name}
            </button>
          ))}
        </div>
      </FormControl>
    </div>
  );
};

SingleAnswerCustom.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  initialValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  helpers: PropTypes.object,
};

SingleAnswerCustom.defaultProps = {
  value: '',
  initialValue: '',
  helpers: {
    low_text: 'Pouco satisfeito',
    high_text: 'Muito satisfeito',
  },
};

export default SingleAnswerCustom;
