const Alert = ({ messageType, message, showAlert }) => {
    console.log(showAlert);
    return (
        <div
            className={`${messageType === 'success'
                ? 'bg-green-500 border-green-500 text-green-900'
                : 'bg-red-500 text-red-900 border-red-600'
                } ${!showAlert ? 'hidden' : ''} rounded-lg w-full bg-opacity-25 border p-4 mb-4`}
        >
            <h2 className="font-thin">{message}</h2>
        </div>
    );
};

export default Alert;
