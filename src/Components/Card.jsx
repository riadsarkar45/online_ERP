import { useState } from "react";


const Card = ({ data, handleProductionQty, handleUpdate }) => {

    const { factory_name, marketing_name, submission_date, dyeing_order, productionQty, dyeing_order_qty, production_reports } = data || {};

    const [isShowDetail, setIsShowDetail] = useState(false);

    const handleShowDetail = (dyeingOrder, show) => {
        setIsShowDetail(show);
    }


    return (
        <div>
            <div className="bg-white shadow-sm rounded-lg p-4 mb-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className=" font-semibold bg-blue-500 bg-opacity-30 text-blue-700 p-1 rounded-md">{dyeing_order}</h2>

                    <h2 className="flex justify-end font-semibold bg-yellow-500 bg-opacity-30 text-yellow-700  p-1 rounded-md ">{'In progress'}</h2>

                </div>

                <div>
                    <div className="grid grid-cols-3 justify-between gap-4 mb-4">
                        <h2>Marketing Name: <span className="font-bold">{marketing_name}</span></h2>
                        <h2>Factory Name: <span className="font-bold">{factory_name}</span></h2>
                        <h2>Merchandiser Name: <span className="font-bold">{'Merchandiser Name will be here'}</span></h2>

                    </div>
                    <div className="grid grid-cols-4">
                        <h2> Dyeing Order Qty: <span className="font-bold">{dyeing_order_qty || 'Undefind'} LBS</span> </h2>
                        <h2 className="mb-4"> Submission Date: <span className="font-bold">{submission_date}</span></h2>
                        <h2 className="mb-4"> Total Production Qty: <span className="font-bold">{productionQty}</span></h2>
                    </div>
                    <h2 className={`${productionQty > dyeing_order_qty ? 'normal' : 'hidden'} mb-4`}
                    > Extra: <span className="font-bold"> {productionQty > dyeing_order_qty ? `${dyeing_order_qty - productionQty} Extra Dyed` : productionQty}  </span></h2>
                    <h2 className="mb-4"> Balance: <span className="font-bold">{dyeing_order_qty - productionQty} </span></h2>
                    <div className="flex mb-4">
                        <input
                            name="productionQty"

                            onChange={(e) => handleProductionQty(e, dyeing_order, marketing_name)}
                            className="border rounded-l-md w-[20rem] border-r-0 p-2"
                            type="text"
                            placeholder="New Production Qty"
                        />

                        <select
                            name="status"
                            onChange={(e) => handleProductionQty(e, dyeing_order, marketing_name)}
                            className="border border-l p-2 w-[10rem]"
                        >
                            <option value="" disabled>Select Status</option>
                            <option value="Total Production Qty">Total Production Qty</option>
                            <option value="Dyeing Order Qty">Dyeing Order Qty</option>
                            <option value="Sample Adjust Qty">Sample Adjust Qty</option>
                            <option value="Total Store Delivery">Total Store Delivery</option>
                        </select>

                        <button
                            onClick={() => handleUpdate()}
                            className="border border-l-0 p-2 hover:bg-gray-200">Save Changes</button>
                        {
                            isShowDetail ? <button onClick={() => setIsShowDetail(false)} className="border border-l-0 rounded-r-md p-2 hover:bg-gray-200">Hide Detail</button>
                                : <button onClick={() => handleShowDetail(dyeing_order, true)} className="border border-l-0 rounded-r-md p-2 hover:bg-gray-200">See Detail</button>
                        }
                    </div>

                    {
                        isShowDetail ? (
                            production_reports?.length > 0 ? (
                                production_reports.map((item, index) => (
                                    <div key={index}>
                                        <div className="grid grid-cols-3 mb-3">
                                            <h2>{item?.productionQty}</h2>
                                            <h2>{item?.status}</h2>
                                            <h2>{'Riad Sarkar'}</h2>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h2 className="mb-2">No Status Found</h2>
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