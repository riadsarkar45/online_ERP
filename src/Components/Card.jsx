import { useState } from "react";
import Alert from "./Alert";

const Card = (data) => {
    const { alertMessage, showAlert, alertType, dyeingOrders, factoryName, dyeingOrder, dyeingOrderDate, dyeingOrderStatus, marketingName, dyeingOrderQuantity, merchandiseName, handleUpdate, handleProductionQty, productionStatus } = data || {};
    const [dyeingOrderQty, setDyeingOrderQty] = useState(dyeingOrderQuantity);
    const [isShowDetail, setIsShowDetail] = useState(false);

    const handleShowDetail = (dyeingOrder, isShow) => {
        setDyeingOrderQty(dyeingOrder);
        setIsShowDetail(isShow);
    }
    return (
        <div>
            <div className="bg-white shadow-sm rounded-lg p-4 mb-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className=" font-semibold bg-blue-500 bg-opacity-30 text-blue-700 p-1 rounded-md">{dyeingOrder}</h2>

                    <h2 className="flex justify-end font-semibold bg-yellow-500 bg-opacity-30 text-yellow-700  p-1 rounded-md ">{dyeingOrderStatus}</h2>

                </div>
                {
                    dyeingOrder === dyeingOrders ? (
                        <Alert messageType={alertType} message={alertMessage} showAlert={showAlert} />
                    ) : null
                }
                <div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <h2>Marketing Name: <span className="font-bold">{marketingName}</span></h2>
                        <h2>Factory Name: <span className="font-bold">{factoryName}</span></h2>
                        <h2>Merchandiser Name: <span className="font-bold">{merchandiseName}</span></h2>
                    </div>
                    <h2> Dyeing Order Qty: <span className="font-bold">{dyeingOrder}</span> <span className="font-bold">{dyeingOrderQuantity} LBS</span> </h2>
                    <h2 className="mb-4"> Submission Date: <span className="font-bold">{dyeingOrderDate}</span></h2>
                    <div className="flex mb-4">
                        <input
                            name="productionQty"

                            onChange={(e) => handleProductionQty(e, dyeingOrder)}
                            className="border rounded-l-md w-[20rem] border-r-0 p-2"
                            type="text"
                            placeholder="New Production Qty"
                        />

                        <select
                            name="status"
                            onChange={(e) => handleProductionQty(e, dyeingOrder)}
                            className="border border-l p-2 w-[10rem]"
                        >
                            <option value="" disabled>Select Status</option>
                            <option value="Total Production Qty">Total Production Qty</option>
                            <option value="Dyeing Order Qty">Dyeing Order Qty</option>
                            <option value="Sample Adjust Qty">Sample Adjust Qty</option>
                            <option value="Total Store Delivery">Total Store Delivery</option>
                        </select>

                        <button onClick={() => handleUpdate()} className="border border-l-0 p-2 hover:bg-gray-200">Save Changes</button>
                        {
                            isShowDetail ? <button onClick={() => setIsShowDetail(false)} className="border border-l-0 rounded-r-md p-2 hover:bg-gray-200">Hide Detail</button>
                                : <button onClick={() => handleShowDetail(dyeingOrder, true)} className="border border-l-0 rounded-r-md p-2 hover:bg-gray-200">See Detail</button>
                        }
                    </div>
                    
                    {
                        dyeingOrderQty === dyeingOrder && isShowDetail ? (
                            productionStatus?.map((innerArray, outerIndex) =>
                                innerArray.map((item, innerIndex) =>
                                    item?.dyeing_order === dyeingOrder ? (
                                        <div className="grid grid-cols-3 mb-3" key={`${outerIndex}-${innerIndex}`}>
                                            <h2>{item.production_qty}</h2>
                                            <h2>{item.status}</h2>
                                            <h2>Riad Sarkar</h2>
                                        </div>
                                    ) : null
                                )
                            )
                        ) : null
                    }




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