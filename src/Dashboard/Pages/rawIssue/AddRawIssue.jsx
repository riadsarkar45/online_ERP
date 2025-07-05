import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../Hooks/AxiosSecure";
import { useRef, useState } from "react";
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
                return res.data;
            } catch (error) {
                console.error("Error fetching posts:", error);
                return null;
            }
        },
    });

    const totalQuantity = rawBalanceYarn.reduce((sum, item) => sum + item.quantity, 0);

    const getRawIssueData = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const printRef = useRef();

    const handleUpdateRawYarnBalance = () => {
        try {
            useAxiosSecure.post('/update-raw-yarn', formData)
                .then((res) => {
                    if (res.data.type === 'error') {
                        toast.error(res.data.message);
                        refetch();
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
            return null;
        }
    };

    const handlePrint = () => {
        const printContent = printRef.current;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    return (
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-black'} mt-4 p-2`}>

            <div className="flex items-center gap-2 mb-4 no-print">
                <div className={`grid grid-cols-5 gap-2 ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-black'}`}>
                    <input onChange={getRawIssueData} placeholder="Lot No" className="border outline-none p-2 rounded-l-md bg-inherit" name="lot_no" type="text" />
                    <input onChange={getRawIssueData} placeholder="Yarn Type" className="border outline-none p-2 bg-inherit" name="yarn_type" type="text" />
                    <input onChange={getRawIssueData} placeholder="Order No" className="border outline-none p-2 bg-inherit" name="order_no" type="text" />
                    <input onChange={getRawIssueData} placeholder="Issue Qty LBS" className="border outline-none p-2 bg-inherit" name="issue_qty" type="text" />
                    <select onChange={getRawIssueData} name="type" className="bg-inherit outline-none border">
                        <option>Total Issue Qty</option>
                        <option>Total Rcv Qty</option>
                    </select>
                </div>
                <button onClick={handleUpdateRawYarnBalance} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Submit
                </button>
                <button onClick={handlePrint} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-700 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9V4h12v5m-6 4h.01M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2m-2 0H8v4h8v-4z"
                        />
                    </svg>
                
                </button>
            </div>

            <div ref={printRef} className="print-section">
                <div className="">
                    {rawBalanceYarn.length > 0 && rawBalanceYarn.map((item, index) => (
                        <div
                            key={index}
                            className={`${item?.quantity <= 0
                                ? 'bg-red-500 bg-opacity-20 text-red-500 border-l border-r border-b border-red-600'
                                : item?.quantity <= 5000
                                    ? 'bg-yellow-500 bg-opacity-20 text-yellow-500 border border-yellow-600'
                                    : 'bg-green-500 bg-opacity-20 text-green-500 border border-green-600'
                                } flex justify-between text-lg p-2`}
                        >
                            <span>{item.yarn_type}</span>
                            <span>{item.sample_order}</span>
                            <span>{item.quantity.toLocaleString()} LBS</span>
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div className="flex justify-between text-lg font-extrabold p-2 mt-4 border-t pt-4">
                    <span>Grand Total</span>
                    <span>{totalQuantity.toLocaleString()} LBS</span>
                </div>
            </div>
        </div>
    );
};

export default AddRawIssue;
