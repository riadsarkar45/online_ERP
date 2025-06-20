import { createContext, useContext, useState, useRef, useEffect } from "react";
import Alert from "../../Components/Alert";

const CursorInactivityContext = createContext();
export const useCursorInactivity = () => useContext(CursorInactivityContext);

const CursorDetector = ({ children }) => {
    const [isInactive, setIsInactive] = useState(false);


    const scrollTimeout = useRef(null);
    const scrollInterval = useRef(null);

    useEffect(() => {
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
                }, 4000);
            }, 200);
        };

        window.addEventListener('wheel', resetInactivity);
        window.addEventListener('mousemove', resetInactivity); // ← MOUSE POINTER MOVEMENT

        return () => {
            window.removeEventListener('wheel', resetInactivity);
            window.removeEventListener('mousemove', resetInactivity);
            clearTimeout(scrollTimeout.current);
            clearInterval(scrollInterval.current);
        };
    }, [isInactive]);


    return (
        <CursorInactivityContext.Provider value={{ isInactive, setIsInactive }}>
            {children}
            {isInactive && (
                <Alert />
            )}
        </CursorInactivityContext.Provider>
    );
};

export default CursorDetector;
