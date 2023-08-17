import './App.css';
import React from 'react';

function App() {
    const [start, setStart] = React.useState(false);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    const [msec, setMsec] = React.useState(0);

    let timer;
    React.useEffect(() => {
        if (start) {
            timer = setInterval(() => {
                if (msec >= 99) {
                    setMsec(0);
                    setSeconds(seconds + 1);
                    if (seconds >= 59) {
                        setSeconds(0);
                        setMinutes(minutes + 1);
                        if (minutes >= 59) {
                            setStart(1);
                            setMinutes(0);
                            setHours(hours + 1);
                        }
                    }
                } else {
                    setMsec(msec + 1);
                }
            }, 10);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [start, hours, minutes, seconds, msec]);

    function startTimer() {
        setStart(true);
    }

    function stopTimer() {
        setStart(false);
    }

    function endTimer() {
        setStart(false);
        clearInterval(timer);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setMsec(0);
    }

    return (
        <div className='timer__block'>
            <div className='timer__spans'>
                <span>{hours < 10 ? '0' + hours : hours}</span>
                <span>:</span>
                <span>{minutes < 10 ? '0' + minutes : minutes}</span>
                <span>:</span>
                <span>{seconds < 10 ? '0' + seconds : seconds}</span>
                <span>:</span>
                <span>{msec < 10 ? '0' + msec : msec}</span>
            </div>
            <div className='timer__btns'>
                <button onClick={startTimer}>Start</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={endTimer}>End</button>
            </div>
        </div>
    );
}

export default App;
