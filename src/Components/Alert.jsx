
const Alert = ({ heading, detail }) => {


    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                max-w-sm w-[90%] sm:w-96 bg-white dark:bg-gray-800 
                text-black dark:text-white shadow-lg rounded-lg p-6 z-50">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">{heading}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{detail}</p>
        </div>


    );
};

export default Alert;