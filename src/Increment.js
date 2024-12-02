import React, { useState } from 'react';

const Counter = () => {
  // State to hold the count
  const [count, setCount] = useState(0);

  // Function to increment the count
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // Function to decrement the count
  const handleDecrement = () => {
    if (count > 0) {
      
      setCount(count - 1);
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Count: {count}</h1>
      <div>
        <button className='btn btn-primary mx-2' onClick={handleIncrement}>
          Increment
        </button>
        <button className='btn btn-danger mx-2' onClick={handleDecrement}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
