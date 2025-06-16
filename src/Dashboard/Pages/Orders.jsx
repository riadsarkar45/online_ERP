import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import AxiosSecure from "../Hooks/AxiosSecure";
import { useCursorInactivity } from "../Hooks/CursorDetectore";
import Alert from "../../Components/Alert";

const Orders = () => {
    const [data, setData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const { isInactive } = useCursorInactivity();
    const [dataToUpdate, setDataToUpdate] = useState({
        productionQty: '',
        status: '',
        dyeing_order: '',
        marketing_name: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const useAxiosSecure = AxiosSecure();

    useEffect(() => {
        useAxiosSecure.get('/dyeing-orders')
            .then(res => {
                setData(res.data);
                setIsLoading(false);
                console.log(res.data);
            })
            .catch(error => console.error("Error fetching orders:", error));
    }, [useAxiosSecure]);

    // Other handlers (search, update, etc.) ...

    return (
        <div className="w-[95%] m-auto mt-2">
            {data.length < 1 ? (
                <h2>NO data found</h2>
            ) : (
                <div>
                    {data.map((item, index) => (
                        <Card
                            key={index}
                            data={item}
                            handleProductionQty={() => { }}
                            handleUpdate={() => { }}
                        />
                    ))}
                </div>
            )}

            {isInactive && (
                <Alert />
            )}
        </div>
    );
};

export default Orders;
