/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, Paper, Stepper, Step, StepLabel} from '@material-ui/core';
import {useSnackbar} from 'notistack';

import {createResearchRequest} from '../../../store/modules/research/actions';

import Button from '../../../components/Button';
import SingleAnswer from './components/SingleAnswer';
import SingleAnswerCustom from './components/SingleAnswerCustom';

import {useStyles} from './styles';

const Research = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const {user} = useSelector((state) => state.auth.user);
  const research = useSelector((state) => state.research);

  const [researchFields] = useState([
    {
      id: 'company-employees',
      step: 0,
      initialValue: '1-50',
      style: 'single-radios',
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
    {
      id: 'team-peoples',
      step: 1,
      initialValue: '1-5',
      style: 'single-radios',
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
    {
      id: 'satisfaction-level',
      step: 2,
      initialValue: 5,
      style: 'single-custom',
      question: 'Qual a sua satisfação com a empresa?',
      options: [
        {
          name: '1',
          value: 1,
        },
        {
          name: '2',
          value: 2,
        },
        {
          name: '3',
          value: 3,
        },
        {
          name: '4',
          value: 4,
        },
        {
          name: '5',
          value: 5,
        },
        {
          name: '6',
          value: 6,
        },
        {
          name: '7',
          value: 7,
        },
        {
          name: '8',
          value: 8,
        },
        {
          name: '9',
          value: 9,
        },
        {
          name: '10',
          value: 10,
        },
      ],
    },
    {
      id: 'boss-rating',
      step: 3,
      initialValue: 5,
      style: 'single-custom',
      question: 'Como você avalia o seu chefe?',
      helpers: {
        low_text: 'Muito Fraco',
        high_text: 'Muito Bom',
      },
      options: [
        {
          name: '1',
          value: 1,
        },
        {
          name: '2',
          value: 2,
        },
        {
          name: '3',
          value: 3,
        },
        {
          name: '4',
          value: 4,
        },
        {
          name: '5',
          value: 5,
        },
        {
          name: '6',
          value: 6,
        },
        {
          name: '7',
          value: 7,
        },
        {
          name: '8',
          value: 8,
        },
        {
          name: '9',
          value: 9,
        },
        {
          name: '10',
          value: 10,
        },
      ],
    },
    {
      id: 'review',
      step: 4,
      question: 'Revise suas respostas!',
      message: 'Lembre-se, após o envio os dados não poderão ser alterados.',
    },
    {
      id: 'finished',
      step: 5,
      question: 'Pesquisa finalizada!',
      message:
        'Você respondeu a pequisa com sucesso, clique em "Dashboard" para visualizar os dados da pequisa',
    },
  ]);
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({
    'company-employees': '1-50',
    'team-peoples': '1-5',
    'satisfaction-level': 5,
    'boss-rating': 5,
  });

  const handleChange = (field, value) => {
    setAnswers({
      ...answers,
      [field]: value,
    });
  };

  const reviewAnswers = () => {
    const results = researchFields
      .filter((field) => field.id !== 'review' && field.id !== 'finished')
      .map((field) => {
        const answer = {name: answers[field.id], value: answers[field.id]};
        if (field.options) {
          const option = field.options.find(
            (item) => item.value === answer.value,
          );
          if (option) answer.name = option.name;
        }
        return (
          <li key={field.id}>
            <p>
              <b>{field.question}</b> {answer.name}
            </p>
          </li>
        );
      });

    return results;
  };

  const renderStep = () => {
    const current = researchFields.find((item) => item.step === activeStep);
    if (current.id === 'review' || current.id === 'finished') {
      return (
        <div className={classes.messages}>
          <h2>{current.question}</h2>
          {current.id === 'review' && (
            <ul className={classes.review}>{reviewAnswers()}</ul>
          )}
          <p>{current.message}</p>
        </div>
      );
    }
    if (current.style === 'single-radios') {
      return (
        <SingleAnswer
          value={answers[current.id]}
          initialValue={current.initialValue}
          onSelect={(value) => handleChange(current.id, value)}
          options={current.options}
          title={current.question}
          id={current.id}
        />
      );
    }
    if (current.style === 'single-custom') {
      return (
        <SingleAnswerCustom
          value={answers[current.id]}
          initialValue={current.initialValue}
          onSelect={(value) => handleChange(current.id, value)}
          options={current.options}
          title={current.question}
          id={current.id}
          helpers={current.helpers}
        />
      );
    }
  };

  const handleNextStep = () => {
    if (activeStep === 4) {
      const payload = {
        user: user.uid,
        ...answers,
      };

      dispatch(createResearchRequest(payload));
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  useEffect(() => {
    if (research.create.success) {
      enqueueSnackbar(research.create.message, {variant: 'success'});
    }
    if (research.create.error) {
      enqueueSnackbar(research.create.message, {variant: 'error'});
    }
  }, [research]);

  return (
    <Grid container component="div" className={classes.root}>
      <Grid item xs={false} sm={4} md={5} className={classes.image} />
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <div className={classes.container}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className={classes.stepper}>
            {researchFields.map((item) => {
              if (item.id !== 'finished') {
                return (
                  <Step key={item.id}>
                    <StepLabel>{item.question}</StepLabel>
                  </Step>
                );
              }
            })}
          </Stepper>
          <div className={classes.questions}>{renderStep()}</div>
          <div
            className={classes.actions}
            style={{
              justifyContent:
                activeStep > 0 && activeStep < 5 ? 'space-between' : 'flex-end',
            }}>
            {activeStep > 0 && activeStep < 5 && (
              <Button
                onClick={() => setActiveStep(activeStep - 1)}
                disabled={research.create.loading}>
                Voltar
              </Button>
            )}
            {activeStep < 5 && (
              <Button
                onClick={() => handleNextStep()}
                loading={research.create.loading}>
                {activeStep < 4 ? 'Avançar' : 'Enviar Pesquisa'}
              </Button>
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Research;
