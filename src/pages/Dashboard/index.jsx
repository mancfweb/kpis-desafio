/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LinearProgress} from '@material-ui/core';

import {getResearchRequest} from '../../store/modules/research/actions';

import Research from './Research';
import Results from './Results';

function Dashboard() {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth.user);
  const answered = useSelector((state) => state.research.answered);
  const research = useSelector((state) => state.research.get);

  const renderContent = () => {
    return answered ? <Results /> : <Research />;
  };

  useEffect(() => {
    if (!research.loading && !answered && !research.success) {
      dispatch(getResearchRequest({user: user.uid}));
    }
  }, [research]);

  return <>{research.loading ? <LinearProgress /> : renderContent()}</>;
}

export default Dashboard;
