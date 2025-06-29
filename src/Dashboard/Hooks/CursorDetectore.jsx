import { createContext, useContext, useState, useRef, useEffect } from "react";
import Alert from "../../Components/Alert";
import { useSocket } from "./Socket";

const CursorInactivityContext = createContext();
export const useCursorInactivity = () => useContext(CursorInactivityContext);

const CursorDetector = ({ children }) => {
    const [isInactive, setIsInactive] = useState(false);

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const scrollTimeout = useRef(null);
    const scrollInterval = useRef(null);

    useEffect(() => {
        if (window.innerWidth < 768)  setIsSmallScreen(true);
        setIsSmallScreen(false);
        const resetInactivity = () => {
            setIsInactive(false); // Reset inactivity

            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            if (scrollInterval.current) {
                clearInterval(scrollInterval.current);
            }

            scrollTimeout.current = setTimeout(() => {

                scrollInterval.current = setInterval(() => {
                    setIsInactive(true);
                }, 40000);
            }, 200);
        };

        window.addEventListener('wheel', resetInactivity);
        window.addEventListener('mousemove', resetInactivity); 
        window.addEventListener('click', resetInactivity); 

        return () => {
            window.removeEventListener('wheel', resetInactivity);
            window.removeEventListener('mousemove', resetInactivity);
            window.removeEventListener('click', resetInactivity);
            clearTimeout(scrollTimeout.current);
            clearInterval(scrollInterval.current);
        };
    }, [isInactive]);






    return (
        <CursorInactivityContext.Provider value={{ isInactive, setIsInactive }}>
            {children}
            {isInactive && (
                <Alert
                    heading={'Are you there?'}
                    detail={'You have been inactive for a while'}
                />
            )}

            {isSmallScreen && (
                <Alert
                    heading={'Small Screen Detected'}
                    detail={'We recommend using a larger screen or display for better experience.'}
                />
            )}
        </CursorInactivityContext.Provider>
    );
};

export default CursorDetector;
