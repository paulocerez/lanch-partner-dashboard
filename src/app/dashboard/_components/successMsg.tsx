import CheckCircleIcon from '@heroicons/react/outline/CheckCircleIcon';
import { Card, Callout } from '@tremor/react';
import React from 'react';

const SuccessMsg = () => {

  return (
    <Card className="max-w-md">

      <Callout className="mt-4" title="No critical system data" icon={CheckCircleIcon} color="teal">
        All systems are currently within their default operating ranges.
      </Callout>
    </Card>
  );
};

export default SuccessMsg;
