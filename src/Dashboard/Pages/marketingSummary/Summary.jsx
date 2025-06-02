import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/AxiosSecure";

const Summary = () => {
    const axiosSecure = useAxiosSecure();
    const [getSummary, setSummary] = useState([])
    useEffect(() => {
        axiosSecure.get('/summary')
            .then((res) => {
                setSummary(res.data);
                console.log(res.data);
            })
    }, [axiosSecure])
    return (
        <div className="bg-white shadow-sm rounded-sm border p-2">
            <h2 className="border-b p-2 text-xl">Bulk Summary</h2>
            <div className="">
                <div className="border-b grid grid-cols-6  mb-3 justify-center text-center p-2">
                    <h2>#</h2>                    <h2>Marketing Name</h2>
                    <h2>Dyeing Order</h2>
                    <h2>Adjust Qty</h2>
                    <h2>Store Delivery</h2>
                    <h2>Delivery Balance</h2>
                </div>
                {
                    getSummary?.map((summary, index) =>
                        <div key={index} className="grid grid-cols-6 border-b mb-3 p-2 text-center">
                            <h2>
                                {index + 1}
                            </h2>
                            <h2>
                                {summary.marketing_name}
                            </h2>

                            <h2>
                                {summary?.total_dyeing_order_qty}
                            </h2>
                            <h2>
                                {summary?.total_sample_adjust_qty}
                            </h2>
                            <h2>
                                {summary?.total_store_delivery}
                            </h2>
                            <h2>
                                {summary?.total_dyeing_order_qty - summary?.total_store_delivery}
                            </h2>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Summary;