import { useState, useEffect } from "react";
import { Box } from "@mui/material";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <Box component="div">{date.toLocaleTimeString()}</Box>;
};

export default Clock;
