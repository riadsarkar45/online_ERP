import axios from "axios";
import { useEffect, useState } from "react";

const Production = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost/southDragon/phpServer/pages/production_report.php')
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, [])
    return (


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Dyeing Order
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Production Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Update Production Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Updated At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={index} className="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 ">
                                <td className="px-6 py-4 font-medium whitespace-nowrap ">
                                    {item.dyeing_order}
                                </td>
                                <td className="px-6 py-4">
                                    {item.production_qty}
                                </td>
                                <td className="px-6 py-4">
                                    <input className="p-3 w-full border" type="text"  placeholder="Update production qty"/>
                                </td>
                                <td className="px-6 py-4">
                                    {item.updated_at}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="bg-green-500 bg-opacity-25 text-green-700 border-green-500 p-1 rounded-sm">Save Changes</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    );
};

export default Production;