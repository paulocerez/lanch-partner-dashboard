import React from 'react';
import {
  Button,
  Title
} from "@tremor/react";

interface TestProps {
  counter: number;
}

const Test = (props: TestProps) => {
  let { counter } = props;
  return (
      <Title>{counter}</Title>
  );
};

export default Test;




