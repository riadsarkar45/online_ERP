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
        <div className="bg-white">
            <div className="border p-2">
                <div className="border-b grid grid-cols-5 mb-3 justify-center text-center p-2">
                    <h2>Marketing Name</h2>
                    <h2>Total Dyeing Order</h2>
                    <h2>Total Adjust Qty</h2>
                    <h2>Total Store Delivery</h2>
                    <h2>Total Delivery Balance</h2>
                </div>
                {
                    getSummary?.map((summary, index) =>
                        <div key={index} className="grid grid-cols-5 border-b mb-3 p-2 text-center">
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