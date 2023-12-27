import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscope, setGyroscope] = useState({ alpha: 0, beta: 0, gamma: 0 });

  useEffect(() => {
    let sensorEventListener;

    const startSensor = () => {
      sensorEventListener = (event) => {
        console.log(event);
        if (event.rotationRate instanceof DeviceMotionEventRotationRate) {
          console.log("Test");
          setGyroscope({
            alpha: event.rotationRate.alpha.toFixed(2),
            beta: event.rotationRate.beta.toFixed(2),
            gamma: event.rotationRate.gamma.toFixed(2),
          });
        }
        if (event.accelerationIncludingGravity instanceof DeviceMotionEventAcceleration) {
          console.log("Asscelor");
          setAcceleration({
            x: event.accelerationIncludingGravity.x.toFixed(2),
            y: event.accelerationIncludingGravity.y.toFixed(2),
            z: event.accelerationIncludingGravity.z.toFixed(2),
          });
        }
        // console.log('Sensor Event:', event);
        // console.log(event.ac)
        // if (event.accelerationIncludingGravity) {
        //   const accelerationValues = event.accelerationIncludingGravity;
        //   console.log("test"+acceleration.x)
        //   setAcceleration({
        //     x: accelerationValues.x,
        //     y: accelerationValues.y,
        //     z: accelerationValues.z,
        //   });
        // }
        // console.log("x: "+acceleration.x)

        // if (event.rotationRate) {
        //   const gyroscopeValues = event.rotationRate;
        //   setGyroscope({
        //     alpha: gyroscopeValues.alpha.toFixed(2),
        //     beta: gyroscopeValues.beta.toFixed(2),
        //     gamma: gyroscopeValues.gamma.toFixed(2),
        //   });
        // }
      };

      window.addEventListener("devicemotion", sensorEventListener);
    };

    const stopSensor = () => {
      window.removeEventListener("devicemotion", sensorEventListener);
    };

    if (isSensorActive) {
      startSensor();
    } else {
      stopSensor();
    }

    return () => {
      stopSensor();
    };
  }, [isSensorActive]);

  const toggleSensor = () => {
    setIsSensorActive((prevIsSensorActive) => !prevIsSensorActive);
  };
  return (
    <>
      <div>
        <h1>Accelerometer and Gyroscope Example</h1>
        <div>
          <p>Acceleration:</p><br />
          <p>X: {acceleration.x}</p>
          <br />
          <p>Y: {acceleration.y}</p>
          <br />
          <p>
            Z:
            {acceleration.z}
          </p>
        </div>

        <div>
          <p>Gyroscope:</p> <br />
          <p>Alpha: {gyroscope.alpha}</p>
          <br />
          <p>Beta: {gyroscope.beta}</p>
          <br />
          <p>Gamma: {gyroscope.gamma}</p>
        </div>

        <button onClick={toggleSensor}>
          {isSensorActive ? "Stop Sensor" : "Start Sensor"}
        </button>
      </div>
    </>
  );
}

export default App;
