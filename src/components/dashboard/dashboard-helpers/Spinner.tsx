import React from 'react';

const Spinner = () => {

  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full mr-2 h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
    <p className="text-gray-500">Loading...</p>
  </div>
  );
};

export default Spinner;
