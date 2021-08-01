import React, { useState, useEffect } from 'react';

export default function Test() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count)
  }, [count])

  const onClick = () => {
    setCount(prevCount => prevCount + 1);  // カウントを1増やした 
  };

  return (
    <button onClick={onClick}>{count}</button>
  );
};