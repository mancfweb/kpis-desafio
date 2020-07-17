import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'kpis2020desafio',
      whitelist: ['auth'],
      storage,
    },
    reducers,
  );

  return persistedReducer;
};
