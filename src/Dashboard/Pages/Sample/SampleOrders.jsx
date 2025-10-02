import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import { useState } from "react";
import { useThemeMode } from "../../Hooks/Theme";
import FinalSummary from "./FinalSummary";
import UserRole from "../../Hooks/UserRole";

const SampleOrders = () => {
    const [samples, setSamples] = useState([])
    const AxiosSecure = useAxiosSecure();
    const [colorObjects, setColorObjects] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [usersRole] = UserRole();
    const { theme } = useThemeMode();

    const { refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            try {
                const res = await AxiosSecure.get('/samples/serialized');
                setSamples(res.data)
                return res.data;
            } catch (error) {
                console.error("Error fetching posts:", error);
                return null;
            }
        },
    })
    const handleChange = (value) => {
        const colors = value.split(',').map(c => c.trim()).filter(c => c);
        const today = new Date().toISOString().split("T")[0];

        const colorArrayWithDate = colors.map(color => ({
            date: today,
            color,
        }));

        setColorObjects(colorArrayWithDate);
    };

    const handleStatus = async (dyeingOrder, status) => {
        try {
            const res = await AxiosSecure.post(`/sample-status/${status}/${dyeingOrder}`);
            console.log(res);
            refetch();
        } catch (e) {
            console.log(e);
        }
    }

    const handleUpdateSample = async (dyeing_orders) => {
        try {
            await AxiosSecure.post(`/update-sample/${dyeing_orders}`, colorObjects);
            refetch();
        } catch (e) {
            console.log(e);
        }

    }

    const handleShowDetail = (dyeingOrder) => {
        setShowDetail(dyeingOrder)
        setIsShowDetail(!isShowDetail);
    }
    return (
        <div>

            <div className={`${theme === "dark"
                ? "bg-gray-700 text-red-200"
                : "bg-white text-black"
                } p-2`}>
                <FinalSummary />

                {
                    samples?.map((items, k) =>
                        <div key={k} className="border mb-2 p-2 rounded-md">

                            <div className="flex justify-between items-center border-b p-2 h-[2.9rem] mb-3 ">
                                <h2>
                                    → {items?.dyeing_order}
                                </h2>
                                <h2>
                                    Marketing Name → {items?.marketing_name}
                                </h2>
                                <h2>
                                    Merchant → {items?.merchandiser_name}
                                </h2>
                                <h2>
                                    Factory → {items?.factory_name}
                                </h2>
                                <span>
                                    <button onClick={() => handleStatus(items?.dyeing_order, 'sample-adjust')} className={`${items?.status === 'Adjust Qty' ? 'bg-green-500 bg-opacity-20 disable cursor-not-allowed border-green-500 border text-green-500' : 'bg-red-500 bg-opacity-20 border-red-500 border text-red-500'} ${usersRole?.role === 'admin' ? '' : 'hidden'} p-1 rounded-md `}>
                                        {items?.status === 'Adjust Qty' ? 'Adjusted' : 'Adjust'}
                                    </button>
                                </span>
                            </div>

                            <div className="flex justify-between border-b h-[2.6rem]">
                                <h2>
                                    Dyeing Order → {items?.dyeing_order_qty}
                                </h2>
                                <h2>
                                    Month → {items?.month_name}
                                </h2>
                                <h2>
                                    Yarn Type → {items?.yarn_type}
                                </h2>
                            </div>
                            <div className="flex border-b p-2 gap-3 items-center mt-3 mb-3">
                                <h2 className="mb-3">
                                    Date → {items?.created_at}
                                </h2>
                                <h2 className={` mb-3 `}>
                                    <span
                                        className={`
                                            ${items?.delivered === 'Sample Received' ? 'bg-green-500 bg-opacity-25 border p-1 text-sm rounded-md border-green-500 text-green-600' : ''}
                                            ${items?.received_cols?.length < items?.color_name?.length ? 'bg-red-500 border-red-500 border text-red-500 bg-opacity-25 px-2 py-1 rounded' : ''}
                                        `}
                                    >
                                        {items?.delivered}
                                        {items?.received_cols?.length < items?.color_name?.length && (
                                            <span className="ml-2">
                                                {items?.color_name?.length} / ({items?.color_name?.length - items?.received_cols?.length} Colors not delivered)
                                            </span>
                                        )}
                                    </span>
                                </h2>
                            </div>

                            <div className="flex mb-3 gap-2 ">
                                <h2>
                                    Colors →
                                </h2>
                                {
                                    items?.color_name?.map((colors, i) =>
                                        <span key={i} className="bg-gray-300 p-1 rounded-sm text-black text-sm">{colors}</span>
                                    )
                                }
                            </div>

                            <div className="text-black flex mb-4">
                                <div className={`${usersRole?.role === 'admin' ? '':'hidden'}`}>
                                    <input
                                        type="text"
                                        placeholder="Received Color Names"
                                        className="outline-none p-1 bg-opacity-25"
                                        onChange={(e) => handleChange(e.target.value)}
                                    />
                                    <button onClick={() => handleUpdateSample(items?.dyeing_order)} className="outline-none bg-gray-300 bg-opacity-25 p-1 border border-r-0">Save Changes</button>
                                </div>
                                <button onClick={() => handleShowDetail(items?.dyeing_order)} className="outline-none bg-gray-300 bg-opacity-25 rounded-r-md p-1 border">See Detail</button>
                            </div>

                            {
                                isShowDetail || showDetail === items?.dyeing_order && (
                                    items?.received_cols?.length === 0 ? (
                                        <h2>No status to show</h2>
                                    ) : (

                                        items?.received_cols?.map((cols, index) =>
                                            <div className="flex gap-2 items-center" key={index}>
                                                <span>→</span>
                                                <h2><span>Received Colors → {cols?.color}</span></h2>
                                                <span>→</span>
                                                <h2><span>Received Date → {cols?.date}</span></h2>
                                            </div>
                                        )

                                    )
                                )

                            }

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default SampleOrders;