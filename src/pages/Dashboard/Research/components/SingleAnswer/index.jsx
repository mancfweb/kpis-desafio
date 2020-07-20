import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

const SingleAnswer = ({initialValue, value, onSelect, options, title, id}) => {
  const handleSelected = (el) => {
    onSelect(el.target.value);
  };
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <RadioGroup
          aria-label={id}
          name={id}
          value={value || initialValue}
          onChange={handleSelected}>
          {options.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio />}
              label={item.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

SingleAnswer.propTypes = {
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
  id: PropTypes.string.isRequired,
};

SingleAnswer.defaultProps = {
  value: '',
  initialValue: '',
};

export default SingleAnswer;
