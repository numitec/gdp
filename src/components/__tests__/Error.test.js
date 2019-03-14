import React from 'react';
import { render } from 'react-native-testing-library';
import { Error } from '../Error';

test('should verify the error message default', () => {
  const { queryByText } = render(<Error />);
  const message = queryByText(
    'Something wrong has happened, please try again later.'
  );

  expect(message).not.toBeNull();
});
