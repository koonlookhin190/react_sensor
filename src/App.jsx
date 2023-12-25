import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscope, setGyroscope] = useState({ alpha: 0, beta: 0, gamma: 0 });
  useEffect(() => {
    let sensorEventListener;

    const startSensor = () => {
      sensorEventListener = (event) => {
        if (event.accelerationIncludingGravity) {
          const accelerationValues = event.accelerationIncludingGravity;
          setAcceleration({
            x: accelerationValues.x.toFixed(2),
            y: accelerationValues.y.toFixed(2),
            z: accelerationValues.z.toFixed(2),
          });
        }

        if (event.rotationRate) {
          const gyroscopeValues = event.rotationRate;
          setGyroscope({
            alpha: gyroscopeValues.alpha.toFixed(2),
            beta: gyroscopeValues.beta.toFixed(2),
            gamma: gyroscopeValues.gamma.toFixed(2),
          });
        }
      };

      window.addEventListener('deviceorientation', sensorEventListener);
    };

    const stopSensor = () => {
      window.removeEventListener('deviceorientation', sensorEventListener);
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
      <p>Acceleration: X: {acceleration.x}, Y: {acceleration.y}, Z: {acceleration.z}</p>
      <p>Gyroscope: Alpha: {gyroscope.alpha}, Beta: {gyroscope.beta}, Gamma: {gyroscope.gamma}</p>
      <button onClick={toggleSensor}>
        {isSensorActive ? 'Stop Sensor' : 'Start Sensor'}
      </button>
    </div>
    </>
  )
}

export default App
