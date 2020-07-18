import React, {useState} from 'react';
import {
  Container,
  Card,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import {useStyles} from './styles';

const Research = () => {
  const classes = useStyles();

  const [researchFields, setResearchFields] = useState({
    first_question: {
      key: 'company-employees',
      value: '',
      style: 'single-custom',
      question: 'Quantos funcionários tem a sua empresa?',
      options: [
        {
          name: '1 até 50',
          value: '1-50',
        },
        {
          name: '51 até 100',
          value: '51-100',
        },
        {
          name: '101 até 200',
          value: '101-200',
        },
        {
          name: '201 até 500',
          value: '201-500',
        },
        {
          name: 'mais de 500',
          value: '500',
        },
      ],
    },
    second_question: {
      key: 'team-peoples',
      value: '',
      style: 'single-custom',
      question: 'Quantas pessoas tem a sua equipe?',
      options: [
        {
          name: '1 até 5',
          value: '1-5',
        },
        {
          name: '6 até 10',
          value: '6-10',
        },
        {
          name: '11 até 20',
          value: '11-20',
        },
        {
          name: '21 até 50',
          value: '21-50',
        },
        {
          name: 'mais de 50',
          value: '50',
        },
      ],
    },
    third_question: {
      key: 'satisfaction-level',
      value: 'zero-ten',
      question: 'Qual a sua satisfação com a empresa?',
    },
    fourth_question: {
      key: 'boss-rating',
      value: 'zero-ten',
      question: 'Como você avalia o seu chefe?',
    },
  });

  const handleChange = () => {};

  const renderFirstQuestion = () => {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={researchFields.first_question.value}
          onChange={handleChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
          />
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Card>{renderFirstQuestion()}</Card>
    </Container>
  );
};

export default Research;
