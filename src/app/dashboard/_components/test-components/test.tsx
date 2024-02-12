import React from 'react';
import {
  Button,
  Title
} from "@tremor/react";


interface TestProps {
  counter: number;
  updateCounter: (newCounter: number) => void;
}

const Test = (props: TestProps) => {
  const { counter, updateCounter } = props;

  const addOne = () => {
    console.log("add one", counter);
    const newCounter = counter + 1;
    updateCounter(newCounter);
  }

  return (
    <div>
      <p>Counter value in child: {counter}</p>
      <Button onClick={addOne}>Add me</Button>
    </div>
    
  );
};

export default Test;




