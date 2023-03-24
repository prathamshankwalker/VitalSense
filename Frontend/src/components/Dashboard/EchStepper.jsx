import { useState, useEffect } from "react";
import { Stepper, Button, Group, Paper, Slider, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { addEmergencyMember } from "../../state/actions/ecg";

// Configure marks to match step
const MARKS = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

function EcgStepper() {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    latitude: null,
    longitude: null,
    value: null,
  });
  const { loading, issue } = useSelector((state) => state.ecg);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  function getLocation() {
    if ("geolocation" in navigator) {
      console.log("Available");

      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatitude(latitude);
        setLongitude(longitude);
      });
      return values;
    } else {
      console.log("Not Available");
    }
  }

  useEffect(() => {
    console.log(issue);
  }, [issue]);

  const stepperClick = (value) => {
    getLocation();
    console.log(value, latitude, longitude);
    setValues((prev) => {
      return { latitude: latitude, longitude: longitude, value: value };
    });

    dispatch(addEmergencyMember(value, longitude, latitude));
  };

  return (
    <>
      <Slider
      color="violet"
        label={(val) => MARKS.find((mark) => mark.value === val).label}
        defaultValue={1}
        step={1}
        marks={MARKS}
        styles={{ markLabel: { display: "none" } }}
        onChange={(value) => stepperClick(value)}
        min={1}
        max={5}
      />
      <Paper withBorder my="md" p="md">
        <Text fw={600}>Situation:</Text>
        <Text>{issue}</Text>
      </Paper>
    </>
  );
}

export default EcgStepper;
