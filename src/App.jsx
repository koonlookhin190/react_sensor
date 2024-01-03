import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import playIcon from "./assets/play.png";
import pauseIcon from "./assets/pause.png";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getAnalytics,logEvent } from "firebase/analytics";

function App() {
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscope, setGyroscope] = useState({ alpha: 0, beta: 0, gamma: 0 });
  // const [holdTimeout, setHoldTimeout] = useState(null);\
  const [countdownTime, setCountdownTime] = useState(15);
  const percentage = (15 - countdownTime) / 15 * 100
  const firebaseConfig = {
    apiKey: "AIzaSyByXEa5y7959i0iHVyJHeePTYXsridX7hk",
    authDomain: "motion-945f3.firebaseapp.com",
    projectId: "motion-945f3",
    storageBucket: "motion-945f3.appspot.com",
    messagingSenderId: "1043008701393",
    appId: "1:1043008701393:web:327291b2ba62fed6e456f0",
    measurementId: "G-4GNZY7LPGZ"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  useEffect(() => {
    let sensorEventListener;
    let countdownInterval;
    let isShaking
    const startSensor = () => {
      sensorEventListener = (event) => {
        if (event.rotationRate instanceof DeviceMotionEventRotationRate) {
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
        isShaking =
          Math.abs(event.accelerationIncludingGravity.x) > shakeThreshold ||
          Math.abs(event.accelerationIncludingGravity.y) > shakeThreshold ||
          Math.abs(event.accelerationIncludingGravity.z) > shakeThreshold;

      };

      window.addEventListener("devicemotion", sensorEventListener);

      countdownInterval = setInterval(() => {
        setCountdownTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(countdownInterval);
            setIsSensorActive(false);
           
            if (isShaking && prevTime===1) {
              showNotification('you are shaking.');
            }
            else{
              showNotification('good you not shaking.');
            }
            return 15;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
      logEvent(analytics,'sensor_started');
    };

    const stopSensor = () => {
      window.removeEventListener("devicemotion", sensorEventListener);
      clearInterval(countdownInterval);
      logEvent(analytics,'sensor_stoped');
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
    if (isSensorActive) {
      startSensor();
    } else {
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
        {/* <div>
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
        </div> */}

          {/* <svg class="progress-svg">
            <circle class="progress-circle" cx="50" cy="50" r="30" fill="transparent" stroke="white"/>
          </svg> */}
          <div style={{width:200,height:200,marginTop:40,marginBottom:40}}>
          <CircularProgressbar value={percentage} text={`${countdownTime}`} styles={buildStyles({
              textColor: "#ffbe98",
              pathColor: "#ffbe98",
              trailColor:"white"
             })} />
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
