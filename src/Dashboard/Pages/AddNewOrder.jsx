import { useState } from "react";
import useAxiosSecure from "../Hooks/AxiosSecure";
import { useThemeMode } from "../Hooks/Theme";

const AddNewOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useThemeMode();

  const [formData, setFormData] = useState({
    dyeing_order: "",
    sectionName: "",
    pi_no: "",
    yarn_type: "",
    unit_price: "",
    marketing_name: "",
    merchandiser_name: "",
    factory_name: "",
    productionQty: 0,
    dyeing_order_qty: 0,
    month_name: new Date('2025-06-02').toLocaleString('default', { month: 'long' }),
    total_production_qty: 0,
    total_sample_adjust_qty: 0,
    total_store_delivery: 0,
    currentMonth: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,

  });



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  console.log(formData, 'line 32');

  const insertNewOrder = () => {
    axiosSecure.post("/add_new_dyeing_order", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    console.log("submitted:", formData);
  };



  return (
    <div className="mt-5 w-[95%] m-auto">
      <div className={`${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-black'} p-4 border rounded-lg shadow-sm`}>
        <input
          name="dyeing_order"
          value={formData.dyeing_order}
          onChange={handleChange}
          placeholder="Dyeing Order"
          className="w-full p-2 border rounded mb-4 bg-inherit outline-none"
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            name="sectionName"
            value={formData.sectionName}
            onChange={handleChange}
            placeholder="Section Name"
            className="p-2 border rounded bg-inherit  outline-none"
          />
          <input
            name="PI_No"
            value={formData.PI_No}
            onChange={handleChange}
            placeholder="PI No"
            className="p-2 border rounded bg-inherit outline-none"
          />
        </div>

        <input
          name="yarn_type"
          value={formData.yarn_type}
          onChange={handleChange}
          placeholder="Yarn Type"
          className="w-full p-2 border rounded mb-4 bg-inherit outline-none"
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            name="unit_price"
            value={formData.unit_price}
            onChange={handleChange}
            placeholder="Unit Price"
            className="p-2 border rounded bg-inherit outline-none"
          />
          <input
            name="dyeing_order_qty"
            value={formData.dyeing_order_qty}
            onChange={handleChange}
            placeholder="Dyeing Order Qty"
            className="p-2 border rounded bg-inherit outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            name="marketing_name"
            value={formData.marketing_name}
            onChange={handleChange}
            placeholder="Marketing Name"
            className="p-2 border rounded bg-inherit outline-none"
          />
          <input
            name="merchandiser_name"
            value={formData.merchandiser_name}
            onChange={handleChange}
            placeholder="Merchandiser Name"
            className="p-2 border rounded bg-inherit outline-none"
          />
        </div>

        <input
          name="factory_name"
          value={formData.factory_name}
          onChange={handleChange}
          placeholder="Factory Name"
          className="w-full p-2 border rounded mb-4 bg-inherit outline-none"
        />

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={insertNewOrder}
            className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
          <button
            className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>

    </div>
  );
};

export default AddNewOrder;
