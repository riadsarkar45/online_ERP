
const Card = (data) => {
    const { factoryName, dyeingOrder, dyeingOrderDate, dyeingOrderStatus, marketingName, dyeingOrderQuantity, merchandiseName, heading } = data || {};
    return (
        <div>
            <div className="bg-white shadow-sm rounded-lg p-4 mb-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className=" font-semibold bg-blue-500 bg-opacity-30 text-blue-700 p-1 rounded-md">{dyeingOrder}</h2>

                    <h2 className="flex justify-end font-semibold bg-yellow-500 bg-opacity-30 text-yellow-700  p-1 rounded-md ">{dyeingOrderStatus}</h2>

                </div>
                <div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <h2>Marketing Name: <span className="font-bold">{marketingName}</span></h2>
                        <h2>Factory Name: <span className="font-bold">{factoryName}</span></h2>
                        <h2>Merchandiser Name: <span className="font-bold">{merchandiseName}</span></h2>
                    </div>
                    <h2> Dyeing Order Qty: <span className="font-bold">{dyeingOrder}</span> <span className="font-bold">{dyeingOrderQuantity} LBS</span> </h2>
                    <h2 className="mb-4"> Submission Date: <span className="font-bold">{dyeingOrderDate}</span></h2>
                    <div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default Card;