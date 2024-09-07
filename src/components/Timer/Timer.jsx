import {useEffect, useState} from "react";

export default function Timer({restart, resetRestart}) {
    const [seconds, setSeconds] = useState(60)
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        let interval = null;

        if (restart) {
            resetRestart()
            setIsActive(true)
            setSeconds(60)
        }

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds <= 1) {
                        clearInterval(interval)
                        setIsActive(false)
                        return 0
                    }
                    return prevSeconds - 1
                });
            }, 1000)
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [isActive, seconds, restart])

    return(
        <>
            {seconds < 10 ? '0' + seconds : seconds}
        </>
    )
}
