import { useState, useEffect } from "react";
// import TestService from "../services/TestService";
function App() {
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscopeData, setGyroscopeData] = useState([]);
  const [countdownTime, setCountdownTime] = useState(15);

  const [pictureUrl, setPictureUrl] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  useEffect(() => {
    let sensorEventListener;
    let countdownInterval;
    let isShaking;
    const currentDate = new Date();
    const dateTimeString = currentDate.toLocaleString();
    const [formattedDate, formattedTime] = dateTimeString.split(", ");
    const startSensor = () => {
      setDate(formattedDate);
      setStartTime(formattedTime);
      console.log("Date" + date);
      console.log("Start Time :" + startTime);
      sensorEventListener = (event) => {
        console.log("Sensor Event:", event);
        if (event.rotationRate instanceof DeviceMotionEventRotationRate) {
          const newGyroscopeData = {
            a: event.rotationRate.alpha.toFixed(2),
            b: event.rotationRate.beta.toFixed(2),
            c: event.rotationRate.gamma.toFixed(2),
          };
          setGyroscopeData((prevData) => [...prevData, newGyroscopeData]);
        }
        console.log(gyroscopeData)
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
          Math.abs(event.accelerationIncludingGravity.z) > shakeThreshold
      };

      window.addEventListener("devicemotion", sensorEventListener);
      countdownInterval = setInterval(() => {
        setCountdownTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(countdownInterval);
            setIsSensorActive(false);
            const endTimeDate = new Date();
            const endTimeString = endTimeDate.toLocaleTimeString();
            setEndTime(endTimeString);
            console.log("End Time: " + endTime);

            if (isShaking && prevTime === 1) {
              console.log("you are shaking.");
            } else {
              console.log("good you not shaking.");
            }
            return 15;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    };

    const stopSensor = () => {
      window.removeEventListener("devicemotion", sensorEventListener);
      clearInterval(countdownInterval);
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
    if (startTime != "" && endTime != "") {
      const newActivity = {
        activity_code: "holding",
        device: "iphone",
        user_id: "123455",
        date: formattedDate,
        start_time: startTime,
        end_time: endTime,
        attempt: "1",
        content: "none",
        content_type: "none",
      };
      // TestService.add_activity(newActivity);
    }
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
  const addUser = () => {
    const newUser = {
      name: "user1",
      email: "hai@hotmail.com",
      password: "23123",
    };
    // TestService.add_user(newUser);
  };
  return (
    <>
      <div className="container">
        <h1>Examine Motion</h1>
        <div className="button" onClick={toggleSensor}>
          {isSensorActive ? (
            // <img className="icon" src={pauseIcon} alt="Pause Icon" />
            <p>processing</p>
          ) : (
            // <img className="icon" src={playIcon} alt="Play Icon" />
            <p>start</p>
          )}
          <p>DATA GYRO</p>
          {/* <div>
            <p>Alpha: {gyroscope.alpha}</p>
            <p>Beta: {gyroscope.beta}</p>
            <p>Gamma: {gyroscope.gamma}</p>
          </div> */}
          {/* <p>{gyroscopeData}</p> */}
          <ul>
            {gyroscopeData.map((data, index) => (
              <li key={index}>
                <p>
                  a: {data.a}, b: {data.b}, c: {data.c}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={addUser}>Add user</button>
      </div>
    </>
  );
}
// const [isCounting, setIsCounting] = useState(false);
// const [stepCount, setStepCount] = useState(0);

// useEffect(() => {
//   const handleMotion = (event) => {
//     console.log("Event", event);
//     const acceleration = event.accelerationIncludingGravity;
//     const threshold = 10;

//     const accelerationMagnitude = Math.sqrt(
//       Math.pow(acceleration.x, 2) +
//       Math.pow(acceleration.y, 2) +
//       Math.pow(acceleration.z, 2)
//     );

//     if (accelerationMagnitude > threshold && isCounting) {
//       setStepCount((prevCount) => prevCount + 1);
//     }
//   };

//   const startMotionTracking = async () => {
//     try {
//       await DeviceMotionEvent.requestPermission();
//       window.addEventListener('devicemotion', handleMotion);
//     } catch (error) {
//       console.error('Error requesting motion permission:', error);
//     }
//   };

//   if (isCounting) {
//     startMotionTracking();
//   } else {
//     window.removeEventListener('devicemotion', handleMotion);
//   }

//   return () => {
//     window.removeEventListener('devicemotion', handleMotion);
//   };
// }, [isCounting]);

// const startCounting = () => {
//   setIsCounting(true);
// };

// const stopCounting = () => {
//   setIsCounting(false);
// };

// return (
//   <div>
//     <button onClick={startCounting}>Start Counting</button>
//     <button onClick={stopCounting}>Stop Counting</button>
//     <p>Steps: {stepCount}</p>
//   </div>
// );
// };
export default App;
