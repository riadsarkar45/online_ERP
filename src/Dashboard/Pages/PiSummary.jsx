import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/AxiosSecure";
import React from "react";

const PiSummary = () => {
  const axios = useAxiosSecure();

  const { data: summaryData, isLoading, error } = useQuery({
    queryKey: ["pi-summary"],
    queryFn: async () => {
      const res = await axios.get("/pi-summary");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!summaryData?.summary?.length) return <div>No summary data found.</div>;

  const groupedSummaries = {};

  summaryData.summary.forEach((summary) => {
    const { pi_no, sectionName } = summary;
    if (!groupedSummaries[pi_no]) groupedSummaries[pi_no] = {};
    if (!groupedSummaries[pi_no][sectionName]) {
      groupedSummaries[pi_no][sectionName] = {
        dyeing_order_qty: 0,
        total_sample_adjust_qty: 0,
        total_store_delivery: 0,
      };
    }
    groupedSummaries[pi_no][sectionName].dyeing_order_qty += Number(summary.dyeing_order_qty) || 0;
    groupedSummaries[pi_no][sectionName].total_sample_adjust_qty += Number(summary.total_sample_adjust_qty) || 0;
    groupedSummaries[pi_no][sectionName].total_store_delivery += Number(summary.total_store_delivery) || 0;
  });

  // 2. To get marketing name per pi_no (assuming all same for a pi_no)
  // We'll create a quick map for that:
  const marketingNames = {};
  summaryData.summary.forEach((summary) => {
    if (!marketingNames[summary.pi_no]) {
      marketingNames[summary.pi_no] = summary.marketing_name;
    }
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {Object.entries(groupedSummaries).map(([piNo, sections]) => {
        // Calculate totals per pi_no by summing all section totals
        let totalDyeingOrderQty = 0;
        let totalSampleAdjustQty = 0;
        let totalStoreDelivery = 0;

        Object.values(sections).forEach((sec) => {
          totalDyeingOrderQty += sec.dyeing_order_qty;
          totalSampleAdjustQty += sec.total_sample_adjust_qty;
          totalStoreDelivery += sec.total_store_delivery;
        });

        return (
          <div key={piNo} className="border p-6 mb-8 rounded shadow-sm ">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">PI No: {piNo}</h2>
            <p className="mb-4 text-lg font-semibold">Marketing Name: {marketingNames[piNo]}</p>

            {Object.entries(sections).map(([sectionName, totals], idx) => (
              <div key={idx} className="mb-6 border rounded p-4 ">
                <h3 className="text-xl font-semibold mb-3 text-green-700">Section: {sectionName}</h3>
                <p><strong>Dyeing Order Qty:</strong> {totals.dyeing_order_qty}</p>
                <p><strong>Total Sample Adjust Qty:</strong> {totals.total_sample_adjust_qty}</p>
                <p><strong>Total Store Delivery:</strong> {totals.total_store_delivery}</p>
              </div>
            ))}

            <div className="mt-6 p-4 rounded border-t border-blue-300">
              <h3 className="text-xl font-bold mb-3">Total Summary for PI No: {piNo}</h3>
              <p><strong>Total Dyeing Order Qty:</strong> {totalDyeingOrderQty}</p>
              <p><strong>Total Sample Adjust Qty:</strong> {totalSampleAdjustQty}</p>
              <p><strong>Total Store Delivery:</strong> {totalStoreDelivery}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PiSummary;
