import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import { useState } from "react";
import { useThemeMode } from "../../Hooks/Theme";

const SampleOrders = () => {
    const [samples, setSamples] = useState([])
    const AxiosSecure = useAxiosSecure();
    const [colorObjects, setColorObjects] = useState([]);
    const { theme } = useThemeMode();
    const { refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            try {
                const res = await AxiosSecure.get('/samples');
                setSamples(res.data?.sampleOrders)
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

    const handleUpdateSample = async (dyeing_orders) => {
        console.log(dyeing_orders);
        try {
            const res = await AxiosSecure.post(`/update-sample/${String(dyeing_orders)}`, colorObjects);
            console.log(res);
            refetch();
        } catch (e) {
            console.log(e);
        }

    }
    return (
        <div>
            <div className={`${theme === "dark"
                ? "bg-gray-700 text-red-200"
                : "bg-white text-black"
                } p-2`}>
                {
                    samples?.map((items, k) =>
                        <div key={k} className="border mb-2 p-2 rounded-md">

                            <div className="flex justify-between border-b p-2 h-[2.9rem] mb-3">
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
                            <h2 className="mb-3 border-b p-2">
                                Date → {items?.created_at}
                            </h2>

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
                                <input
                                    type="text"
                                    placeholder="Received Color Names"
                                    className="outline-none p-2"
                                    onChange={(e) => handleChange(items?.dyeing_order, e.target.value)}
                                />
                                <select className="outline-none p-2" name="" id="">
                                    <option>Store Delivery</option>
                                </select>
                                <button onClick={() => handleUpdateSample(items?.dyeing_order)} className="outline-none bg-gray-300 p-2 border border-r-0">Save Changes</button>
                                <button className="outline-none bg-gray-300 rounded-r-md p-2 border">See Detail</button>
                            </div>

                            {
                                items?.received_cols?.length === 0 ? (
                                    <h2>No status to show</h2>
                                ) : (

                                    items?.received_cols?.map((cols, index) =>
                                        <div className="flex gap-2" key={index}>
                                            <h2><span>Received Colors → {cols?.color}</span></h2>
                                            <span>→</span>
                                            <h2><span>Received Date → {cols?.date}</span></h2>
                                        </div>
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