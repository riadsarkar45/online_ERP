import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/AxiosSecure";
import React from "react";
import { useThemeMode } from "../Hooks/Theme";

const PiSummary = () => {
  const axios = useAxiosSecure();
  const { theme } = useThemeMode();

  const {
    data: summaryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pi-summary"],
    queryFn: async () => {
      const res = await axios.get("/pi-summary");
      console.log(res.data)
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (error)
    return (
      <div className="text-red-500 text-center">
        Error: {error.message || "Something went wrong."}
      </div>
    );


  return (
    <div className={`${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-black'} p-2`}>

      <div className="">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="p-4 border mb-2 rounded shadow"
          >
            <div className="grid grid-cols-3 border-b p-1 gap-4">
              <p className=""><strong>Marketing:</strong> {item.marketing_name}</p>
            </div>
            {
              item?.dyeing_sections?.map((item, index) =>
                <div key={index} className="grid grid-cols-4 gap-2 p-2 ">
                  <p className=""><strong>Section:</strong> {item.sectionName}</p>
                  <p><strong>Yarn:</strong> {item.yarn_type}</p>
                  <p><strong>Dyeing Order:</strong> {item.dyeing_order_qty}</p>
                  <p><strong>Production Qty:</strong> {item.productionQty}</p>
                  <p><strong>Sample Adjust:</strong> {item.total_sample_adjust_qty}</p>
                  <p><strong>Store Delivery:</strong> {item.total_store_delivery}</p>
                </div>

              )
            }

          </div>
        ))}
      </div>
    </div>
  );
};

export default PiSummary;
