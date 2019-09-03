import React, {useState, useEffect, useRef} from 'react';
import { Redirect } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';

const SecurePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [intervalImage, setThisIntervalImage] = useState();
    const [orientation, setOrientation] = useState({alpha: 0, beta: 0, gamma: 0});
    
    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const options = { frequency: 60, referenceFrame: 'device' };
        // let sensor = new window.AbsoluteOrientationSensor(options);
        // sensor.addEventListener('reading', () => {
        //     alert(sensor.quaternion[0].toString(),
        //         sensor.quarternion[1].toString(),
        //         sensor.quarternion[2].toString(),
        //         sensor.quarternion[3].toString()
        //     );
        //     // let absObject = JSON.stringify({
        //     //     x_position: sensor.quarternion[0].toString(),
        //     //     y_position: sensor.quarternion[1].toString(),
        //     //     z_position: sensor.quarternion[2].toString(),
        //     //     w_position: sensor.quarternion[3].toString() 
        //     // })
        //     // alert(absObject);
        //     axios.post("/api/v1/absorientation", {
        //         user_email: user,
        //         x_position: sensor.quarternion[0].toString(),
        //         y_position: sensor.quarternion[1].toString(),
        //         z_position: sensor.quarternion[2].toString(),
        //         w_position: sensor.quarternion[3].toString() 
        //     }, {
        //         headers: {'Authorization': 'Bearer ' + token },
        //     })
        // })
        // sensor.addEventListener('error', error => {
        //     if (window.event.error.name == 'NotReadableError') {
        //       console.log("Sensor is not available.");
        //     }
        //   });
        // sensor.start();
        const setFromEvent = e => setOrientation({alpha: e.alpha, beta: e.beta, gamma: e.gamma});
        window.addEventListener('deviceorientation', function(event) {
            console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
        })
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (!token) {
            setIsLoggedIn(false);
            return;
        }
        if (expirationDate <= new Date()) {
            setIsLoggedIn(false);
            return;
        }
        setIsLoggedIn(true);
        setThisIntervalImage(setInterval(() => captureImage(), 1000));
        return (() => {
            clearInterval(intervalImage);
        }
    );
    },[])

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const webcam = useRef();

    const captureImage = () => {
        const imageSrc = webcam.current.getScreenshot();
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        // axios.post("/api/v1/image/", {
        //     user_email: user,
        //     data: imageSrc
        // }, {
        //     headers: {'Authorization': 'Bearer ' + token },
        // })
    }

    return (
        <div>
        {!isLoggedIn && <div>
            <Redirect to="/"/>
        </div>}
        <Webcam
        audio={true}
        height={350}
        width={350}
        ref={webcam}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        />
        </div>
    )
}

export default SecurePage;
