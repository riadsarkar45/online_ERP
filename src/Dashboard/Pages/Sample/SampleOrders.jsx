import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import { useState } from "react";

const SampleOrders = () => {
    const [samples, setSamples] = useState([])
    const AxiosSecure = useAxiosSecure();

    const { refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            try {
                const res = await AxiosSecure.get('/samples');
                console.log(res.data?.sampleOrders);
                setSamples(res.data?.sampleOrders)
                return res.data;
            } catch (error) {
                console.error("Error fetching posts:", error);
                return null;
            }
        },
    })
    return (
        <div>
            <div>
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

                            <div className="flex mb-2 gap-2 ">
                                <h2>
                                    Colors → 
                                </h2>
                                {
                                    items?.color_name?.map((colors, i) => 
                                        <span key={i} className="bg-gray-300 p-1 rounded-sm text-black text-sm">{colors}</span>
                                    )
                                }
                            </div>

                            <div className="text-black flex">
                                <input className="outline-none p-2" type="text" placeholder="Received Color Names"/>
                                <select className="outline-none p-2" name="" id="">
                                    <option>Store Delivery</option>
                                </select>
                                <button className="outline-none bg-gray-300 p-2 border border-r-0">Submit</button>
                                <button className="outline-none bg-gray-300 rounded-r-md p-2 border">See Detail</button>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default SampleOrders;