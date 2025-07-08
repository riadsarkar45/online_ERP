import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import { useThemeMode } from "../../Hooks/Theme";

const AddNewSample = () => {
    const axiosSecure = useAxiosSecure();
    const { theme } = useThemeMode();

    const [formData, setFormData] = useState({
        color_name: [],
        dyeing_order: "",
        sectionName: "",
        yarn_type: "",
        marketing_name: "",
        merchandiser_name: "",
        factory_name: "",
        dyeing_order_qty: 0,
        month_name: new Date().toLocaleString("default", { month: "long" }),
        total_sample_adjust_qty: 0,
        total_store_delivery: 0,
        currentMonth: `${new Date().getFullYear()}-${String(
            new Date().getMonth() + 1
        ).padStart(2, "0")}`,
    });

    const [colorInput, setColorInput] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (!formData.pi_no || formData.pi_no.trim() === "") {
            setFormData((prev) => ({
                ...prev,
                yarn_type: "",
                factory_name: "",
                marketing_name: "",
                merchandiser_name: "",
                sectionName: "",
                dyeing_order_qty: 0,
                color_name: [],
            }));
        }
    }, [formData.pi_no]);

    const insertNewOrder = () => {
        const hasEmptyField = Object.entries(formData).some(([, value]) => {
            if (Array.isArray(value)) return value.length === 0;
            if (typeof value === "string") return value.trim() === "";
            return value === null || value === undefined;
        });

        if (hasEmptyField) {
            toast.error("Please fill all the fields");
            return;
        }

        axiosSecure
            .post("/new-sample", formData)
            .then((res) => {
                if (res.data) {
                    toast.success("New Dyeing Order Added Successfully");
                }
                console.log(res);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };
console.log(formData);
    return (
        <div className="mt-5 w-[95%] m-auto">
            <div
                className={`${theme === "dark"
                    ? "bg-gray-700 text-red-200"
                    : "bg-white text-black"
                    } p-4 border rounded-lg shadow-sm`}
            >
                <input
                    name="dyeing_order"
                    value={formData.dyeing_order}
                    onChange={handleChange}
                    placeholder="Dyeing Order"
                    className="w-full p-2 border rounded mb-4 outline-none"
                />

                <div className="mb-4 gap-2 grid grid-cols-2">
                    <input
                        name="sectionName"
                        value={formData.sectionName}
                        onChange={handleChange}
                        placeholder="Section Name"
                        className="p-2 border rounded bg-inherit  outline-none"
                    />
                    <input
                        name="yarn_type"
                        value={formData.yarn_type}
                        onChange={handleChange}
                        placeholder="Yarn Type"
                        className="w-full p-2 border rounded bg-inherit outline-none"
                    />
                </div>

                <div className="gap-4 mb-4 grid grid-cols-2">
                    <input
                        name="dyeing_order_qty"
                        type="number"
                        value={formData.dyeing_order_qty}
                        onChange={handleChange}
                        placeholder="Dyeing Order Qty"
                        className="p-2 border rounded bg-inherit outline-none"
                    />
                    <input
                        type="text"
                        name="colorInput"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        onKeyDown={(e) => {
                            if ((e.key === "Enter" || e.key === ",") && colorInput.trim() !== "") {
                                e.preventDefault();
                                const newColor = colorInput.trim();
                                if (!formData.color_name.includes(newColor)) {
                                    setFormData((prev) => ({
                                        ...prev,
                                        color_name: [...prev.color_name, newColor],
                                    }));
                                }
                                setColorInput("");
                            }
                        }}
                        placeholder="Type color and press Enter"
                        className="p-2 border rounded bg-inherit outline-none"
                    />

                </div>

                {/* Display color tags */}
                {formData.color_name.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {formData.color_name.map((color, index) => (
                            <span
                                key={index}
                                className="bg-blue-300 text-black px-3 py-1 rounded text-sm"
                            >
                                {color}
                            </span>
                        ))}
                    </div>
                )}

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

export default AddNewSample;
