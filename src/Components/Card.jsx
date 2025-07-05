import { useState } from "react";
import { useThemeMode } from "../Dashboard/Hooks/Theme";


const Card = ({ data, handleProductionQty, handleUpdate, checkStatus, getStatus, order }) => {

    const { factory_name, marketing_name, pi_no, total_delivery_order, yarn_type, total_store_delivery, submission_date, dyeing_order, productionQty, merchandiser_name, dyeing_order_qty, production_reports } = data || {};

    const [isShowDetail, setIsShowDetail] = useState(false);
    const { theme } = useThemeMode();

    const handleShowDetail = (dyeingOrder, show) => {
        setIsShowDetail(show);
    }

    // {productionQty > dyeing_order_qty ? `${dyeing_order_qty - productionQty}
    return (
        <div>
            <div
                className={`shadow-sm rounded-lg p-4 mb-2 ${productionQty > dyeing_order_qty
                        ? 'bg-red-500 bg-opacity-35'
                        : theme === 'dark'
                            ? 'bg-gray-800 text-gray-200'
                            : ''
                    }`}
            >                <div className="flex justify-between items-center mb-4">
                    <h2 className=" font-semibold bg-blue-500 bg-opacity-30 text-blue-700 p-1 rounded-md">{dyeing_order}</h2>

                    {/* <h2
                        className={`flex justify-end font-semibold ${dyeing_order_qty === productionQty
                            ? 'bg-green-500 text-green-700'
                            : productionQty > dyeing_order_qty
                                ? 'bg-red-500 text-red-700'
                                : 'bg-yellow-500 text-yellow-700'
                            } bg-opacity-30 p-1 rounded-md`}
                    >
                        {dyeing_order_qty === productionQty
                            ? 'Dyeing Completed'
                            : productionQty > dyeing_order_qty
                                ? 'Extra Dyed'
                                : 'Dyeing Incomplete'}
                    </h2> */}

                </div>

                <div>
                    <div className="grid grid-cols-3 border p-2 justify-between gap-4">
                        <h2>Marketing Name: <span className="font-bold">{marketing_name}</span></h2>
                        <h2>Factory Name: <span className="font-bold">{factory_name}</span></h2>
                        <h2>Merchandiser Name: <span className="font-bold">{merchandiser_name}</span></h2>

                    </div>
                    <div className="grid grid-cols-4 gap-4 border-b items-center py-2">
                        <div className="flex items-center">
                            <h2>Order Qty: <span className="font-bold">{dyeing_order_qty || 'Undefined'} LBS</span></h2>
                        </div>
                        <div className="flex items-center">
                            <h2>Yarn: <span className="font-bold">{yarn_type || 'Undefined'}</span></h2>
                        </div>
                        <div className="flex items-center">
                            <h2>Submission Date: <span className="font-bold">{submission_date}</span></h2>
                        </div>
                        <div className="flex items-center">
                            <h2>Total Production Qty: <span className="font-bold">{productionQty}</span></h2>
                        </div>
                    </div>

                    <h2 className={`${productionQty > dyeing_order_qty ? 'normal' : 'hidden'} mb-4`}
                    > Extra: <span className="font-bold"> {productionQty > dyeing_order_qty ? `${dyeing_order_qty - productionQty} Extra Dyed` : productionQty}  </span></h2>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                        <h2 className="mb-4">Dyeing Balance: <span className="font-bold">{dyeing_order_qty - productionQty} </span></h2>
                        <h2 className="mb-4"> Delivery Order: <span className="font-bold">{total_delivery_order} </span></h2>
                        <h2 className="mb-4"> Store Delivery: <span className="font-bold">{total_store_delivery} </span></h2>
                        <h2 className="mb-4"> Delivery Balance: <span className="font-bold">{(Number(dyeing_order_qty) || 0) - (Number(total_store_delivery) || 0)}</span></h2>
                    </div>
                    <div className="flex mb-4">
                        <input
                            name="productionQty"

                            onChange={(e) => handleProductionQty(e, dyeing_order, marketing_name, pi_no, yarn_type)}
                            className={`${theme === 'dark' ? 'bg-gray-700 border text-gray-200' : 'bg-white text-black'} border rounded-l-md w-[20rem] outline-none border-r-0 p-2`}
                            type="text"
                            placeholder={`${getStatus} Qty`}
                        />

                        <select
                            name="status"
                            onChange={(e) => handleProductionQty(e, dyeing_order, marketing_name, pi_no, yarn_type)}
                            className={`${theme === 'dark' ? 'bg-gray-700 border text-gray-200' : 'bg-white text-black'} border outline-none border-l p-2 w-[10rem]`}
                        >
                            <option defaultValue="Select Status">Select Status</option>
                            <option value="Total Production Qty">Total Production Qty</option>
                            <option value="Total Delivery Order">Total Delivery Order</option>
                            <option value="Sample Adjust Qty">Sample Adjust Qty</option>
                            <option value="Total Store Delivery">Total Store Delivery</option>
                        </select>

                        {
                            checkStatus === 'Total Store Delivery' && dyeing_order === order ? (
                                <input
                                    name="chalan_no"

                                    onChange={(e) => handleProductionQty(e, dyeing_order, marketing_name, pi_no, yarn_type)}
                                    className={`${theme === 'dark' ? 'bg-gray-700 border text-gray-200' : 'bg-white text-black'} w-[10rem] border-1 border border-l-0 p-2 outline-none`}
                                    type="text"
                                    placeholder='Chalan NO'
                                />
                            ) : checkStatus === 'Total Delivery Order' && dyeing_order === order ? (
                                <input
                                    name="do_no"

                                    onChange={(e) => handleProductionQty(e, dyeing_order, marketing_name, pi_no, yarn_type)}
                                    className={`${theme === 'dark' ? 'bg-gray-700 border text-gray-200' : 'bg-white text-black'} w-[10rem] border-1 border border-l-0 p-2 outline-none`}
                                    type="text"
                                    placeholder='DO NO'
                                />
                            ) : null
                        }

                        <button
                            onClick={() => handleUpdate()}
                            className={`${theme === 'dark' ? 'hover:bg-gray-400 bg-opacity-10' : 'hover:bg-gray-200'} border border-l-0 p-2 `}>Save Changes</button>
                        {
                            isShowDetail ? <button onClick={() => setIsShowDetail(false)} className={`${theme === 'dark' ? 'hover:bg-gray-400 bg-opacity-10' : 'hover:bg-gray-200'} border border-l-0 rounded-r-md p-2 hover:bg-gray-200`}>Hide Detail</button>
                                : <button onClick={() => handleShowDetail(dyeing_order, true)} className={`${theme === 'dark' ? 'hover:bg-gray-400 bg-opacity-10' : 'hover:bg-gray-200'} border border-l-0 rounded-r-md p-2 hover:bg-gray-200`}>See Detail</button>
                        }
                    </div>

                    {
                        isShowDetail ? (
                            production_reports?.length > 0 ? (
                                production_reports.map((item, index) => (
                                    <div key={index}>
                                        <div className={`grid mb-3 ${item?.status === 'Total Store Delivery'
                                            ? 'grid-cols-3 bg-red-500 p-1 border font-semibold text-red-700 border-red-500 rounded-md bg-opacity-30'
                                            : item?.status === 'Total Delivery Order'
                                                ? 'grid-cols-3 bg-gray-500 border-gray-300 font-semibold border p-1 rounded-md bg-opacity-30'
                                                : 'grid-cols-3'
                                            }`}>
                                            <h2>{item?.productionQty}</h2>
                                            <h2>{item?.status}</h2>
                                            {
                                                item?.status === 'Total Store Delivery' ? (
                                                    <>Chalan No. {item?.chalan_no}</>
                                                ) : item?.status === 'Total Delivery Order' ? (
                                                    <>DO No. {item?.do_no}</>
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h2 className="mb-2">No Status Found</h2>
                            )
                        ) : null
                    }




                </div>
            </div>




        </div>
    );
};

export default Card;