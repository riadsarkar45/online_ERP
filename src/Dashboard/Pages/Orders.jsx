import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { Link } from "react-router";
import AxiosSecure from "../Hooks/AxiosSecure";

const Orders = () => {
    const [data, setData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [dataToUpdate, setDataToUpdate] = useState({
        productionQty: '',
        status: '',
        dyeing_order: '',

    });
    const [isLoading, setIsLoading] = useState(true)

    const useAxiosSecure = AxiosSecure();

    useEffect(() => {
        useAxiosSecure.get('/dyeing-orders')
            .then((res) => {
                setData(res?.data);
                // setIsLoading(false)
                console.log(res.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, [useAxiosSecure]);

    const handleSearch = (e, searchType) => {
        setIsLoading(true);
        if (e === '' && searchType === '') {
            return console.log('Please select a value');
        }

        useAxiosSecure.get('/search.php', {
            params: {
                searchType: searchType,
                searchValue: e
            }
        })
            .then((res) => {
                setData(res.data.data);
                setIsFiltered(true);
                setIsLoading(false);
                console.log(res.data.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });

        console.log(e, searchType);
    };

    const handleFilterRest = () => {
        setIsLoading(true);
        useAxiosSecure.get('/index.php')
            .then((response) => {
                setData(response?.data?.orders);
                setIsFiltered(false);
                setIsLoading(false);

            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }

    const handleProductionQty = (e, dyeing_order) => {
        const { name, value } = e.target;

        setDataToUpdate(prev => ({
            ...prev,
            dyeing_order,
            [name]: value,
        }));



    };

    console.log("Data to update:", dataToUpdate);

    const handleUpdate = () => {
        useAxiosSecure.post('/update-production', dataToUpdate)
            .then((response) => {
                console.log(response);

            }).catch((error) => {
                console.error("There was an error!", error);
            });
    }


    return (
        <div className="w-[95%] m-auto mt-2">
            <div>
                <div className={`${!isFiltered ? 'grid-cols-3' : 'grid-cols-4'} grid gap-4 mb-4 bg-white shadow-sm rounded-lg p-4`}>

                    {/* search fields */}
                    <div>
                        <select onChange={(e) => handleSearch(e.target.value, 'dyeingOrder')} className="w-full p-2 border border-gray-200 rounded-md" name="" id="">
                            <option defaultValue={'Dyeing Order'}>Dyeing Order</option>
                            {
                                data.map((item, index) => (
                                    <option key={index} value={item.dyeingOrder}>{item.dyeingOrder}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <select onChange={(e) => handleSearch(e.target.value, 'factoryName')} className="w-full p-2 border border-gray-200 rounded-md" name="" id="">
                            <option defaultValue={'Factory Name'}>Factory Name</option>
                            {
                                data.map((item, index) => (
                                    <option key={index} value={item.factory_name}>{item.factory_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <select onChange={(e) => handleSearch(e.target.value, 'piNo')} className="w-full p-2 border border-gray-200 rounded-md" name="" id="">
                            <option defaultValue={'PI No'}>PI No</option>
                            {
                                data.map((item, index) => (
                                    <option key={index} value={item.factory_name}>{item.factory_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <button hidden={!isFiltered} onClick={() => handleFilterRest()} className={`${isFiltered ? ' bg-green-500 text-green-700' : 'bg-red-500 cursor-not-allowed text-red-700'} p-2 rounded-lg bg-opacity-40`}>Rest Filters</button>
                    </div>
                </div>

                {
                    <div>
                        {
                            data.map((item) =>
                                <Card
                                    data={item}
                                    handleProductionQty={handleProductionQty}
                                    handleUpdate={handleUpdate}
                                />
                            )
                        }
                    </div>
                }

            </div>

        </div>
    );
};

export default Orders;