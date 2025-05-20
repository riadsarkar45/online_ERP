import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import axios from "axios";
import { Link } from "react-router";

const Orders = () => {
    const [data, setData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [productionStatus, setProductionStatus] = useState([]);
    const [dataToUpdate, setDataToUpdate] = useState({
        productionQty: '',
        status: '',
        dyeingOrder: '',

    });
    console.log(dataToUpdate, 'line 14 Orders.jsx');
    useEffect(() => {
        axios.get('https://southdragondyeingandwashing.infinityfreeapp.com/index.php')
            .then((response) => {
                setData(response?.data?.orders);
                setProductionStatus(response?.data?.productionStatus);
                console.log(response?.data?.productionStatus);
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
                setIsFiltered(true);
                console.log(res.data.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });

        console.log(e, searchType);
    };

    const handleFilterRest = () => {
        axios.get('https://southdragondyeingandwashing.infinityfreeapp.com/index.php')
            .then((response) => {
                setData(response?.data?.orders);
                setProductionStatus(response?.data?.productionStatus);
                setIsFiltered(false);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }

    const handleProductionQty = (e, dyeingOrder) => {
        const { name, value } = e.target;

        setDataToUpdate(prev => ({
            ...prev,
            dyeingOrder,
            [name]: value,
        }));

       

        console.log("Updated:", dyeingOrder, name, value);
    };

    const handleUpdate = () => {
         axios.post('http://localhost/southDragon/phpServer/pages/production_report.php',
            dataToUpdate,
            { params: { dyeingOrder: dataToUpdate.dyeingOrder } }
        )
        .then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error("There was an error!", error);
        });
    }

    const dyeingOrderStatus = "In Progress";
    const dyeingOrderQuantity = 1000;
    return (
        <div className="w-[95%] m-auto mt-2">
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
                data?.length < 1 && (
                    <div className="w-full h-[50vh] flex justify-center items-center">
                        <div className="grid justify-center">
                            <h1 className="text-2xl font-bold text-gray-500">No Dyeing Order found</h1>

                            <Link className="bg-green-500 bg-opacity-30 justify-center items-center text-lg text-green-700 w-[3rem] m-auto mt-4 p-3 rounded-lg" to='/dashboard/add-new-dyeing-order'><button>+</button></Link>
                        </div>
                    </div>
                )
            }
            {data.map((item, index) => (
                <Card
                    key={index}
                    productionStatus={productionStatus}
                    handleProductionQty={handleProductionQty}
                    handleUpdate={handleUpdate}
                    dataToUpdate={dataToUpdate}
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