import React from 'react';
import ReactDOM from 'react-dom';
import GestationalAgeCalculator from './GestationalAgeCalculator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GestationalAgeCalculator />, div);
});
