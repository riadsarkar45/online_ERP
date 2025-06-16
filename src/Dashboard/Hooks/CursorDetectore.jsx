import { createContext, useContext, useState, useRef, useEffect } from "react";

const CursorInactivityContext = createContext();
export const useCursorInactivity = () => useContext(CursorInactivityContext);

const CursorDetector = ({ children, timeout = 1 * 60 * 1000 }) => {
    const [isInactive, setIsInactive] = useState(false);
    const timeoutRef = useRef(null);

    const resetTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setIsInactive(true);
        }, timeout);

        if (isInactive) {
            setIsInactive(false); 
        }
    };

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click', 'scroll'];

        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        resetTimer(); 

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []); 

    return (
        <CursorInactivityContext.Provider value={{ isInactive, setIsInactive }}>
            {children}
        </CursorInactivityContext.Provider>
    );
};

export default CursorDetector;
