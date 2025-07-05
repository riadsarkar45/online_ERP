import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../Hooks/AxiosSecure";
import { useState } from "react";
import { useThemeMode } from "../../Hooks/Theme";
import toast from "react-hot-toast";
const AddRawIssue = () => {
    const useAxiosSecure = AxiosSecure();
    const { theme } = useThemeMode();
    const [rawBalanceYarn, setRawBalanceYarn] = useState([]);
    const [formData, setFormData] = useState({
        lot_no: 0,
        yarn_type: "",
        order_no: "",
        issue_qty: 0,
        type: "",
    });
    const { refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            try {
                const res = await useAxiosSecure.get('/raw-issue');
                setRawBalanceYarn(res.data);
                console.log("Raw Yarn Balance:", res.data);
                return res.data;
            } catch (error) {
                console.error("Error fetching posts:", error);
                return null;
            }
        },
    })
    const totalQuantity = rawBalanceYarn.reduce((sum, item) => sum + item.quantity, 0);
    const getRawIssueData = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleUpdateRawYarnBalance = () => {
        try {
            useAxiosSecure.post('/update-raw-yarn', formData)
                .then((res) => {
                    if (res.data.type === 'error') {
                        toast.error(res.data.message);
                        refetch();
                        console.log(res.data.type);
                    } else {
                        toast.success(res.data.message);
                        refetch();
                    }
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });

        } catch (e) {
            console.log(e);
            return null
        }
    }
    console.log(formData);
    return (
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-black'} mt-4 p-2`}>
            <div className="flex items-center">
                <div className={`${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-black'} grid grid-cols-5`}>
                    <input onChange={(e) => getRawIssueData(e)} placeholder="Lot No" className="border outline-none p-2 rounded-l-md bg-inherit" name="lot_no" type="text" />
                    <input onChange={(e) => getRawIssueData(e)} placeholder="Yarn Type" className="border outline-none p-2 bg-inherit " name="yarn_type" type="text" />
                    <input onChange={(e) => getRawIssueData(e)} placeholder="Order No" className="border outline-none p-2 bg-inherit " name="order_no" type="text" />
                    <input onChange={(e) => getRawIssueData(e)} placeholder="Issue Qty LBS" className="border outline-none bg-inherit p-2" name="issue_qty" type="text" />
                    <select onChange={(e) => getRawIssueData(e)} name="type" className="bg-inherit outline-none border">
                        <option>Total Issue Qty</option>
                        <option>Total Rcv Qty</option>
                    </select>
                </div>
                <div>
                    <button onClick={() => handleUpdateRawYarnBalance()} className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors duration-300">
                        Submit
                    </button>
                </div>
            </div>
            <div className={`mt-4 border `}>
                {
                    rawBalanceYarn.length > 0 ? (
                        rawBalanceYarn?.map((item, index) => (
                            <div key={index} className="flex text-lg items-center justify-between p-2 border-b">
                                <span>{item.yarn_type}</span>
                                <span>{item.sample_order}</span>
                                <span>{item.quantity.toLocaleString()} LBS</span>
                            </div>
                        )
                        )
                    ) : null
                }
            </div>
            <h2 className="flex justify-between text-lg font-extrabold p-2">
                <h2>
                    Grand Total
                </h2>
                <h2>
                    {totalQuantity.toLocaleString()} LBS
                </h2>
            </h2>
        </div>
    );
};

export default AddRawIssue;