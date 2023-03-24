import { Title } from "@mantine/core";
import { useEffect, useState } from "react";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const ValueGenerator = ({ value, updateFunction, min, max, interval }) => {
  const [value1, setValue] = useState(null);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      let currValue = getRandomInt(min, max);
        updateFunction(currValue);
      setValue(currValue);
    }, interval);
    
    return () => clearInterval(intervalId);
  }, []);

  return <Title fz="3rem">{value}</Title>;
};
export default ValueGenerator;
