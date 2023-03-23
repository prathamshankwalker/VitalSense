import { useEffect, useState } from "react";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const ValueGenerator = ({ value, updateFunction, min, max }) => {
  const [value1, setValue] = useState(null);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      let currValue = getRandomInt(min, max);
        updateFunction(currValue);
      setValue(currValue);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

  return <h1>{value}</h1>;
};
export default ValueGenerator;
