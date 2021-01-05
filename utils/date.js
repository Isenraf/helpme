exports.getDate = () => {
  const today = new Date();

  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  };

  return today.toLocaleDateString('en-US', options);
};

exports.minusDate = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  };

  return today.toLocaleDateString('en-US', options);
};
