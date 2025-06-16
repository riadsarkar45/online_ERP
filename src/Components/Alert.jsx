import { useCursorInactivity } from "../Dashboard/Hooks/CursorDetectore";

const Alert = () => {
    const { setIsInactive } = useCursorInactivity();

    const handleMovementPopUp = () => {
        setIsInactive(false); // Hide the popup
    };

    return (
        <div style={{
            position: 'fixed',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px 40px',
            borderRadius: '10px',
            border: '2px solid #333',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            zIndex: 9999,
            textAlign: 'center'
        }}>
            <h2 className="text-xl font-semibold mb-2">Are you there?</h2>
            <p className="text-gray-600">You’ve been inactive for a while.</p>
            <button onClick={() => handleMovementPopUp()}>I am alive</button>
        </div>
    );
};

export default Alert;
