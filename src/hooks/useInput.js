import React from 'react';

const useInput = (defaultValue) => {
  const [value, setValue] = React.useState(defaultValue);

  const onValueChange = (e) => setValue(e.target.value);

  return [value, onValueChange];
};

export default useInput;
