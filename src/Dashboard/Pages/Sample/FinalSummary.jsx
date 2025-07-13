import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/AxiosSecure";

const FinalSummary = () => {
    const AxiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["final-summary"],
        queryFn: async () => {
            const res = await AxiosSecure.get('/final-summary');
            return res.data;
        },
    });

    if (isLoading) return <div>Loading summary...</div>;
    if (isError) return <div>Error loading summary</div>;

    return (
        <div className="border flex items-center mb-5">
           <div className="border-r p-3">
                <h2>Grand Total</h2>
           </div>
            <div className="p-3 flex gap-3 items-center">
                <p className="border-r p-1">Total DO → {data?.totalDyeingQty} </p>
                <p className="border-r p-1">Adjust Qty → {data?.totalAdjustQty} </p>
                <p className="border-r p-1">Total Adjust Balance → {data?.adjustBalance} </p>
                <p className="border-r p-1">Total Delivery → {data?.storeDelivery} </p>
                <p className="">Delivery Balance → {data?.deliveryBalance} </p>
            </div>
        </div>
    );
};

export default FinalSummary;
