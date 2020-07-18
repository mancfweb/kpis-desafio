const exceptionErrorsHandler = (code) => {
  let msg;
  switch (code) {
    case 'auth/email-already-in-use':
      msg = 'Este e-mail já está em uso!';
      break;

    default:
      msg = 'Algo saiu errado! Por favor, tente novamente.';
      break;
  }

  return msg;
};

export default exceptionErrorsHandler;
