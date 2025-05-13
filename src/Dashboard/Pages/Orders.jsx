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

    const dyeingOrder = "SDDCB-1/2025";
    const dyeingOrderDate = "2025-01-01";
    const factoryName = "Factory A";
    const dyeingOrderStatus = "In Progress";
    const marketingName = "Marketing A";
    const dyeingOrderQuantity = 1000;
    const merchandiseName = "Merchandise A";

    return (
        <div className="w-[95%] m-auto mt-2">
                {data.map((item, index) => (
                    <Card
                        key={index}
                        dyeingOrder={item?.dyeingOrder}
                        dyeingOrderDate={dyeingOrderDate}
                        factoryName={factoryName}
                        dyeingOrderStatus={dyeingOrderStatus}
                        marketingName={marketingName}
                        dyeingOrderQuantity={dyeingOrderQuantity}
                        merchandiseName={merchandiseName}
                    />
                ))}
        </div>
    );
};

export default Orders;