import CheckCircleIcon from '@heroicons/react/outline/CheckCircleIcon';
import { Card, Callout } from '@tremor/react';
import React from 'react';

const SuccessMsg = (msg: string) => {

  return (


      <Callout className="mt-4" title="No critical system data" icon={CheckCircleIcon} color="teal">
        {msg}
      </Callout>

  );
};

export default SuccessMsg;
