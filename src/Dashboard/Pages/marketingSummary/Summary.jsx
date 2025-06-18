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
            <div className="flex gap-2 mb-4">
                <select className="border p-2 rounded-sm outline-none" name="section" id="">
                    <option value="Section">Section</option>
                    <option value="Hanks">Hanks</option>
                    <option value="Cone">Cone</option>
                    <option value="Pice Dye Acid Wash">Pice Dye Acid Wash</option>
                </select>
                <select className="border p-2 rounded-sm outline-none" name="month" id="">
                    <option value="Section">Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                </select>
                <select className="border p-2 rounded-sm outline-none" name="marketing" id="">
                    <option value="Section">Marketing</option>
                    <option value="January">Mr Chunnu</option>
                    <option value="February">Unknown</option>
                    <option value="March">Someone</option>
                </select>
            </div>
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
                                {summary?.total_dyeing_qty}
                            </h2>
                            <h2>
                                {summary?.total_sample_adjust_qty}
                            </h2>
                            <h2>
                                {summary?.total_store_delivery}
                            </h2>
                            <h2>
                                {(Number(summary?.total_dyeing_qty) || 0) - (Number(summary?.total_store_delivery) || 0)}
                            </h2>

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Summary;