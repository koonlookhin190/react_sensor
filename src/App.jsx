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
import { getAnalytics,logEvent, setUserId } from "firebase/analytics";
import liff from '@line/liff'
function App() {
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscope, setGyroscope] = useState({ alpha: 0, beta: 0, gamma: 0 });
  // const [holdTimeout, setHoldTimeout] = useState(null);\
  const [countdownTime, setCountdownTime] = useState(15);
  const percentage = (15 - countdownTime) / 15 * 100

  const [pictureUrl, setPictureUrl] = useState("");
  const [idToken,setIdToken] = useState("");
  const [displayName,setDisplayName] = useState("");
  const [statusMessage,setStatusMessage] = useState("");
  const logout = () => {
    liff.logout()
  }

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

//   useEffect(() => {
//     let sensorEventListener;
//     let countdownInterval;
//     let isShaking
//     const startSensor = () => {
//       sensorEventListener = (event) => {
//         console.log('Sensor Event:', event);
//         if (event.rotationRate instanceof DeviceMotionEventRotationRate) {
//           setGyroscope({
//             alpha: event.rotationRate.alpha.toFixed(2),
//             beta: event.rotationRate.beta.toFixed(2),
//             gamma: event.rotationRate.gamma.toFixed(2),
//           });
//         }
//         if (
//           event.accelerationIncludingGravity instanceof
//           DeviceMotionEventAcceleration
//         ) {
//           console.log("Asscelor");
//           setAcceleration({
//             x: event.accelerationIncludingGravity.x.toFixed(2),
//             y: event.accelerationIncludingGravity.y.toFixed(2),
//             z: event.accelerationIncludingGravity.z.toFixed(2),
//           });
//         }
//         const shakeThreshold = 15;
//         isShaking =
//           Math.abs(event.accelerationIncludingGravity.x) > shakeThreshold ||
//           Math.abs(event.accelerationIncludingGravity.y) > shakeThreshold ||
//           Math.abs(event.accelerationIncludingGravity.z) > shakeThreshold;
//       };

//       window.addEventListener("devicemotion", sensorEventListener);
//       countdownInterval = setInterval(() => {
//         setCountdownTime((prevTime) => {
//           if (prevTime === 1) {
//             clearInterval(countdownInterval);
//             setIsSensorActive(false);
           
//             if (isShaking && prevTime===1) {
//               showNotification('you are shaking.');
//             }
//             else{
//               showNotification('good you not shaking.');
//             }
//             return 15;
//           } else {
//             return prevTime - 1;
//           }
//         });
//       }, 1000);
//       logEvent(analytics,'sensor_started');
//     };

//     const stopSensor = () => {
//       window.removeEventListener("devicemotion", sensorEventListener);
//       clearInterval(countdownInterval);
//       logEvent(analytics,'sensor_stoped');
//     };

//     // if (isSensorActive) {
//     //   startSensor();
//     //   setHoldTimeout(setTimeout(() => {
//     //     setIsSensorActive(false);
//     //     showNotification('Held for 10 seconds without shaking.');
//     //   }, 10000));
//     // } else {
//     //   stopSensor();
//     //   clearTimeout(holdTimeout);
//     // }
//     if (isSensorActive) {
//       startSensor();
//     } else {
//       stopSensor();
//     }
//     return () => {
//       stopSensor();
//       // clearTimeout(holdTimeout);
//     };
//   }, [isSensorActive]);
//   // useEffect(()=>{
//   //   liff.init({ liffId:"2002366370-kA654y5R"},() => {
//   //     if (liff.isLoggedIn()){
//   //       const idToken = liff.getIDToken();
//   //       setIdToken(idToken);
//   //       liff.getProfile().then(profile => {
//   //         setDisplayName(profile.displayName);
//   //         setPictureUrl(profile.pictureUrl);
//   //         setStatusMessage(profile.statusMessage);
//   //         setUserId(profile.userId)
//   //       }).catch(err=>console.error(err))
//   //     }else{
//   //       liff.login();
//   //     }
//   //   },err => console.log(err))
//   // },[]);

//   const toggleSensor = () => {
//     setIsSensorActive((prevIsSensorActive) => !prevIsSensorActive);
//   };
//   const showNotification = (message) => {
//     toast.warn(message, {
//       position: "top-center",
//       autoClose: false,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       });
//   };
//   return (
//     <>
//       <div className="container">
//       <img src={pictureUrl} width="300px" height="300px"></img>
//         <h1>Examine Motion</h1>
//         {/* <div>
//           <p>Acceleration:</p>
//           <br />
//           <p>X: {acceleration.x}</p>
//           <br />
//           <p>Y: {acceleration.y}</p>
//           <br />
//           <p>
//             Z:
//             {acceleration.z}
//           </p>
//         </div>

//         <div>
//           <p>Gyroscope:</p> <br />
//           <p>Alpha: {gyroscope.alpha}</p>
//           <br />
//           <p>Beta: {gyroscope.beta}</p>
//           <br />
//           <p>Gamma: {gyroscope.gamma}</p>
//         </div> */}

//           {/* <svg class="progress-svg">
//             <circle class="progress-circle" cx="50" cy="50" r="30" fill="transparent" stroke="white"/>
//           </svg> */}
//           <div style={{width:200,height:200,marginTop:40,marginBottom:40}}>
//           <CircularProgressbar value={percentage} text={`${countdownTime}`} styles={buildStyles({
//               textColor: "#ffbe98",
//               pathColor: "#ffbe98",
//               trailColor:"white"
//              })} />
//           </div>

//         <div className="button" onClick={toggleSensor}>
//           {isSensorActive ? (
//             <img className="icon" src={pauseIcon} alt="Pause Icon" />
//           ) : (
//             <img className="icon" src={playIcon} alt="Play Icon" />
//           )}
//         </div>
//         <button onClick={logout}>Logout</button>
//         <ToastContainer
//           position="top-center"
//           autoClose={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           theme="light"
//         />
//       </div>
//     </>
//   );
// }
const [isCounting, setIsCounting] = useState(false);
const [stepCount, setStepCount] = useState(0);

useEffect(() => {
  const handleMotion = (event) => {
    console.log("Event", event);
    const acceleration = event.accelerationIncludingGravity;
    const threshold = 10;

    const accelerationMagnitude = Math.sqrt(
      Math.pow(acceleration.x, 2) +
      Math.pow(acceleration.y, 2) +
      Math.pow(acceleration.z, 2)
    );

    if (accelerationMagnitude > threshold && isCounting) {
      setStepCount((prevCount) => prevCount + 1);
    }
  };

  const startMotionTracking = async () => {
    try {
      await DeviceMotionEvent.requestPermission();
      window.addEventListener('devicemotion', handleMotion);
    } catch (error) {
      console.error('Error requesting motion permission:', error);
    }
  };

  if (isCounting) {
    startMotionTracking();
  } else {
    window.removeEventListener('devicemotion', handleMotion);
  }

  return () => {
    window.removeEventListener('devicemotion', handleMotion);
  };
}, [isCounting]);

const startCounting = () => {
  setIsCounting(true);
};

const stopCounting = () => {
  setIsCounting(false);
};

return (
  <div>
    <button onClick={startCounting}>Start Counting</button>
    <button onClick={stopCounting}>Stop Counting</button>
    <p>Steps: {stepCount}</p>
  </div>
);
};
export default App;
