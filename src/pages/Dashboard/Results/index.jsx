/* eslint-disable operator-assignment */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, Card, LinearProgress} from '@material-ui/core';

import {getResearchesRequest} from '../../../store/modules/research/actions';

import BarChart from './components/BarChart';

import {useStyles} from './styles';

function Results() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const researches = useSelector((state) => state.research.all);

  const [researchFields] = useState({
    'company-employees': {
      id: 'company-employees',
      question: 'Quantos funcionários tem a sua empresa?',
      options: [
        {
          name: '1 até 50',
          value: '1-50',
          quantity: 0,
        },
        {
          name: '51 até 100',
          value: '51-100',
          quantity: 0,
        },
        {
          name: '101 até 200',
          value: '101-200',
          quantity: 0,
        },
        {
          name: '201 até 500',
          value: '201-500',
          quantity: 0,
        },
        {
          name: 'mais de 500',
          value: '500',
          quantity: 0,
        },
      ],
    },
    'team-peoples': {
      id: 'team-peoples',
      question: 'Quantas pessoas tem a sua equipe?',
      options: [
        {
          name: '1 até 5',
          value: '1-5',
          quantity: 0,
        },
        {
          name: '6 até 10',
          value: '6-10',
          quantity: 0,
        },
        {
          name: '11 até 20',
          value: '11-20',
          quantity: 0,
        },
        {
          name: '21 até 50',
          value: '21-50',
          quantity: 0,
        },
        {
          name: 'mais de 50',
          value: '50',
          quantity: 0,
        },
      ],
    },
    'satisfaction-level': {
      id: 'satisfaction-level',
      question: 'Qual a sua satisfação com a empresa?',
      options: [
        {
          name: '1',
          value: 1,
          quantity: 0,
        },
        {
          name: '2',
          value: 2,
          quantity: 0,
        },
        {
          name: '3',
          value: 3,
          quantity: 0,
        },
        {
          name: '4',
          value: 4,
          quantity: 0,
        },
        {
          name: '5',
          value: 5,
        },
        {
          name: '6',
          value: 6,
          quantity: 0,
        },
        {
          name: '7',
          value: 7,
          quantity: 0,
        },
        {
          name: '8',
          value: 8,
          quantity: 0,
        },
        {
          name: '9',
          value: 9,
          quantity: 0,
        },
        {
          name: '10',
          value: 10,
          quantity: 0,
        },
      ],
    },
    'boss-rating': {
      id: 'boss-rating',
      question: 'Como você avalia o seu chefe?',
      options: [
        {
          name: '1',
          value: 1,
          quantity: 0,
        },
        {
          name: '2',
          value: 2,
          quantity: 0,
        },
        {
          name: '3',
          value: 3,
          quantity: 0,
        },
        {
          name: '4',
          value: 4,
          quantity: 0,
        },
        {
          name: '5',
          value: 5,
          quantity: 0,
        },
        {
          name: '6',
          value: 6,
          quantity: 0,
        },
        {
          name: '7',
          value: 7,
          quantity: 0,
        },
        {
          name: '8',
          value: 8,
          quantity: 0,
        },
        {
          name: '9',
          value: 9,
          quantity: 0,
        },
        {
          name: '10',
          value: 10,
          quantity: 0,
        },
      ],
    },
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!researches.success) dispatch(getResearchesRequest());
  }, []);

  useEffect(() => {
    if (researches.success) {
      const chartData = {};

      researches.data.map((research) => {
        for (const [key, value] of Object.entries(research)) {
          if (key !== 'user') {
            if (!chartData.hasOwnProperty(key)) {
              chartData[key] = researchFields[key].options.map((item) => ({
                ...item,
                quantity: 0,
              }));
            }

            const currIndex = chartData[key].findIndex(
              (item) => item.value === value,
            );
            chartData[key][currIndex].quantity =
              chartData[key][currIndex].quantity + 1;
          }
        }
      });
      setData(chartData);
    }
    setLoading(false);
  }, [researches]);

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          {Object.entries(data).length > 0 && (
            <Grid
              container
              spacing={4}
              component="div"
              className={classes.root}>
              {Object.keys(researchFields).map((item) => (
                <Grid key={researchFields[item].id} item xs={12} md={6}>
                  <Card className={classes.card}>
                    <h2 className="title">{researchFields[item].question}</h2>
                    <div className="chart">
                      <BarChart
                        data={data[researchFields[item].id]}
                        keys={['quantity']}
                      />
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </>
  );
}

export default Results;
