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
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (error)
    return (
      <div className="text-red-500 text-center py-10">
        Error: {error.message || "Something went wrong."}
      </div>
    );

  return (
    <div
      className={` ${
        theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"
      } p-3`}
    >
      <div className="space-y-6">
        {summaryData.map((item, index) => (
          <div key={index} className="border p-2 rounded-md">
            <h2 className="text-xl font-semibold mb-3 border-gray-400 pb-1">
              Marketing: {item.marketing_name}
            </h2>

            <div className=" gap-4">
              {item?.pi_summaries?.map((summary, i) => (
                <div
                  key={i}
                  className=" rounded-xl  p-4 "
                >
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    PI No: {summary?.pi_no}
                  </h3>

                  <div className="mt-2 space-y-3 ">
                    {summary?.factories?.map((factory, j) => (
                      <div
                        key={j}
                        className="grid-cols-4 grid rounded-md p-3"
                      >
                        <p className="font-semibold mb-3">
                          Factory:{" "}
                          <span className="font-normal">{factory?.factory_name}</span>
                        </p>
                        <p>
                          Dyeing Order:{" "}
                          <span className="font-semibold text-green-600">
                            {factory?.total_dyeing_order_qty}
                          </span>
                        </p>
                        <p>
                          Production:{" "}
                          <span className="font-semibold text-yellow-600">
                            {factory?.total_production_qty}
                          </span>
                        </p>
                        <p>
                          Store Delivery:{" "}
                          <span className="font-semibold text-purple-600">
                            {factory?.total_store_delivery}
                          </span>
                        </p>
                        <p>
                          Sample Adjust:{" "}
                          <span className="font-semibold text-red-600">
                            {factory?.total_sample_adjust_qty}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PiSummary;
