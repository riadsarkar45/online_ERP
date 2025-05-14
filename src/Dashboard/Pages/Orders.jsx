import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import axios from "axios";

const Orders = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost/southDragon/phpServer/pages/get_data.php')
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, []);

    const handleSearch = (e, searchType) => {
        if (e === '' && searchType === '') {
            return console.log('Please select a value');
        }

        axios.get('http://localhost/southDragon/phpServer/pages/search.php', {
            params: {
                searchType: searchType,
                searchValue: e
            }
        })
            .then((res) => {
                setData(res.data.data);
                console.log(res.data.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });

        console.log(e, searchType);
    };

    const dyeingOrderStatus = "In Progress";
    const dyeingOrderQuantity = 1000;

    return (
        <div className="w-[95%] m-auto mt-2">
            <div className="grid grid-cols-3 gap-4 mb-4 bg-white shadow-sm rounded-lg p-4">

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
            </div>
            {data.map((item, index) => (
                <Card
                    key={index}
                    dyeingOrder={item?.dyeingOrder}
                    dyeingOrderDate={item?.created_at}
                    factoryName={item?.factory_name}
                    dyeingOrderStatus={dyeingOrderStatus}
                    marketingName={item?.marketing_name}
                    dyeingOrderQuantity={dyeingOrderQuantity}
                    merchandiseName={item?.merchandiser_name}
                />
            ))}
        </div>
    );
};

export default Orders;