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
            console.log('🖱️ Mouse moved or scrolled');
            setIsInactive(false); // Reset inactivity

            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            if (scrollInterval.current) {
                clearInterval(scrollInterval.current);
            }

            scrollTimeout.current = setTimeout(() => {
                console.log('✅ User stopped interaction, starting inactivity check...');

                scrollInterval.current = setInterval(() => {
                    console.log('🕒 Checking inactivity...');
                    setIsInactive(true);
                    console.log('🟢 User was inactive. Resetting inactivity.');
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
