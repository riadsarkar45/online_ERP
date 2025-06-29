import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import { useThemeMode } from "../../Hooks/Theme";

const Summary = () => {
    const axiosSecure = useAxiosSecure();
    const { theme } = useThemeMode();

    const [getSummary, setSummary] = useState([])
    const [isFiltered, setIsFiltered] = useState(false);
    useEffect(() => {
        axiosSecure.get('/summary')
            .then((res) => {
                setSummary(res.data);
                console.log(res.data);
            })
    }, [axiosSecure])

    const handleFilter = (e, type) => {
        const selectedType = e.target.value;

        if (type === 'marketing_name') {
            const filteredSummaries = getSummary.filter(marketing => marketing.marketing_name === selectedType);
            setSummary(filteredSummaries);
            setIsFiltered(true);
        } else if (type === 'month') {
            const filteredSummaries = getSummary.filter(summary => summary.month_name === selectedType);
            setSummary(filteredSummaries);
            setIsFiltered(true);
        }

    };

    const handleResetFilter = () => {
        axiosSecure.get('/summary')
            .then((res) => {
                setSummary(res.data);
                console.log(res.data);
            })

        setIsFiltered(false);
    }

    return (
        <div className={`${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-black'}  shadow-sm rounded-sm border p-2`}>
            <div className={`${isFiltered ? 'grid-cols-3  w-[27rem]' : 'grid-cols-2 w-[22rem]'} grid gap-2 mb-4 `}>

                <select onChange={(e) => handleFilter(e)} className={`${theme === 'dark' ? 'bg-gray-700 border text-gray-200' : 'bg-white text-black'} border p-2 rounded-md outline-none`} name="month" id="">
                    <option value="month">Month</option>
                    {
                        [...new Set(getSummary?.map(s => s.month_name))].map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))
                    }
                </select>
                <select onChange={(e) => handleFilter(e, 'marketing_name')} className={`${theme === 'dark' ? 'bg-gray-700 border text-gray-200' : 'bg-white text-black'} border p-2 rounded-md outline-none`} name="marketing" id="">
                    <option value="marketing">Choose Marketing</option>
                    {
                        [...new Set(getSummary?.map(s => s.marketing_name))].map((marketing_name, index) => (
                            <option key={index} value={marketing_name}>{marketing_name}</option>
                        ))
                    }
                </select>
                {
                    isFiltered && (
                        <button className="bg-red-500 bg-opacity-40 border rounded-sm border-red-500 text-red-800" onClick={handleResetFilter}>Reset</button>
                    ) 
                }
            </div>
            <div className="">
                <div className="border-b grid grid-cols-7  mb-3 justify-center  text-center p-2">
                    <h2>#</h2>
                    <h2>PI Qty</h2>
                    <h2>Marketing Name</h2>
                    <h2>Dyeing Order</h2>
                    <h2>Adjust Qty</h2>
                    <h2>Store Delivery</h2>
                    <h2>Delivery Balance</h2>
                </div>
                {
                    getSummary?.map((summary, index) =>
                        <div key={index} className="grid grid-cols-7 border-b mb-3 p-2 items-center text-center">
                            <h2 className="">
                                {index + 1}
                            </h2>
                            <h2>
                                50000
                            </h2>
                            <h2>
                                {summary.marketing_name}
                            </h2>

                            <h2>
                                {summary?.total_dyeing_qty  }
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