import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import AxiosSecure from "../Hooks/AxiosSecure";

const Orders = () => {
    const [data, setData] = useState([]);
    const [checkStatus, setCheckStatus] = useState('');
    const [order, setOrder] = useState('');
    const [getStatus, setGetStatus] = useState('');
    const [dataToUpdate, setDataToUpdate] = useState({
        productionQty: '',
        status: '',
        dyeing_order: '',
        marketing_name: '',
        currentMonth: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,

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
        setOrder(dataToUpdate.dyeing_order);
        if (dataToUpdate.status === '') {
            setGetStatus('Please Select Status');
        } else {
            setGetStatus(dataToUpdate.status);
        }
        if (dataToUpdate.status === 'Total Store Delivery' || dataToUpdate.status === 'Total Delivery Order') {
            setCheckStatus(dataToUpdate.status);
        } else {
            setCheckStatus(false);
        }
    }, [useAxiosSecure, dataToUpdate]);


    const handleUpdate = () => {
        useAxiosSecure.post('/update-production', dataToUpdate)
            .then((response) => {
                console.log(response);

            }).catch((error) => {
                console.error("There was an error!", error);
            });
    }

    const handleProductionQty = (e, dyeing_order, marketing_name) => {
        const { name, value, } = e.target;
        console.log(dataToUpdate.status);
        setDataToUpdate(prev => ({
            ...prev,
            dyeing_order,
            marketing_name,
            [name]: value,
        }));

    };

    if (isLoading) {
        return <div className="w-[95%] flex justify-center h-[100vh] items-center m-auto mt-2">Loading...</div>;
    }

    console.log("Data to update:", dataToUpdate);

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
                            handleProductionQty={handleProductionQty}
                            handleUpdate={handleUpdate}
                            checkStatus={checkStatus}
                            getStatus={getStatus}
                            order={order}
                        />
                    ))}
                </div>
            )}


        </div>
    );
};

export default Orders;
