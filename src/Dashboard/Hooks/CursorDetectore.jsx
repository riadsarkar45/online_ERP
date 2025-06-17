import { createContext, useContext, useState, useRef, useEffect } from "react";
import Alert from "../../Components/Alert";

const CursorInactivityContext = createContext();
export const useCursorInactivity = () => useContext(CursorInactivityContext);

const CursorDetector = ({ children }) => {
    const [isInactive, setIsInactive] = useState(false);


    const scrollTimeout = useRef(null);
    const scrollInterval = useRef(null); useEffect(() => {
        const handleScroll = (event) => {
            console.log('🔄 Scrolling...', event.deltaY);
            setIsInactive(false); // Reset inactivity state on scroll

            // Clear previous timeout
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            // Clear previous interval (only one should run)
            if (scrollInterval.current) {
                clearInterval(scrollInterval.current);
            }

            scrollTimeout.current = setTimeout(() => {
                console.log('✅ Scroll stopped, starting inactivity check...');

                scrollInterval.current = setInterval(() => {
                    console.log('🕒 Checking inactivity...');
                    setIsInactive(true);
                    console.log('🟢 User was inactive. Resetting inactivity.');

                }, 4000);
            }, 200);
        };

        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
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
