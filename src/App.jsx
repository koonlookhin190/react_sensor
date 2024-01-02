import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import playIcon from "./assets/play.png";
import pauseIcon from "./assets/pause.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscope, setGyroscope] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [holdTimeout, setHoldTimeout] = useState(null);
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
        if (
          event.accelerationIncludingGravity instanceof
          DeviceMotionEventAcceleration
        ) {
          console.log("Asscelor");
          setAcceleration({
            x: event.accelerationIncludingGravity.x.toFixed(2),
            y: event.accelerationIncludingGravity.y.toFixed(2),
            z: event.accelerationIncludingGravity.z.toFixed(2),
          });
        }
        const shakeThreshold = 15;
        const isShaking =
          Math.abs(event.accelerationIncludingGravity.x) > shakeThreshold ||
          Math.abs(event.accelerationIncludingGravity.y) > shakeThreshold ||
          Math.abs(event.accelerationIncludingGravity.z) > shakeThreshold;

        // if (isShaking && holdTimeout !== null) {
        //     clearTimeout(holdTimeout); 
        //     showNotification('Device is shaking!');
        // }
        if (isShaking) {
          showNotification('Device is shaking!');
         }
      };

      window.addEventListener("devicemotion", sensorEventListener);
    };

    const stopSensor = () => {
      window.removeEventListener("devicemotion", sensorEventListener);
    };

    // if (isSensorActive) {
    //   startSensor();
    //   setHoldTimeout(setTimeout(() => {
    //     setIsSensorActive(false);
    //     showNotification('Held for 10 seconds without shaking.');
    //   }, 10000));
    // } else {
    //   stopSensor();
    //   clearTimeout(holdTimeout);
    // }
    if(isSensorActive){
      startSensor();
    }else{
      stopSensor();
    }
    return () => {
      stopSensor();
      // clearTimeout(holdTimeout);
    };
  }, [isSensorActive]);

  const toggleSensor = () => {
    setIsSensorActive((prevIsSensorActive) => !prevIsSensorActive);
  };
  const showNotification = (message) => {
    toast.warn(message, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };
  return (
    <>
      <div className="container">
        <h1>Examine Motion</h1>
        <div>
          <p>Acceleration:</p>
          <br />
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

        <div className="button" onClick={toggleSensor}>
          {isSensorActive ? (
            <img className="icon" src={pauseIcon} alt="Pause Icon" />
          ) : (
            <img className="icon" src={playIcon} alt="Play Icon" />
          )}
        </div>
        <ToastContainer
          position="top-center"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
