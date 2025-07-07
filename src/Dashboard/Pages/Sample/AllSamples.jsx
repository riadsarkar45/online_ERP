import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/AxiosSecure';
import { useThemeMode } from '../../Hooks/Theme';

const AllSamples = () => {
    const [samples, setSamples] = useState([])
    const [showDetail, setShowDetail] = useState()
    const [marketingName, setMarketing_name] = useState('')
    const AxiosSecure = useAxiosSecure();
      const { theme } = useThemeMode();
    
    const { refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            try {
                const res = await AxiosSecure.get('/samples');
                setSamples(res.data)
                console.log(res.data);
                return res.data;
            } catch (error) {
                console.error("Error fetching posts:", error);
                return null;
            }
        },
    })
    const handleShowDetail = (marketingName) => {
        setShowDetail(prev => !prev);
        setMarketing_name(marketingName)
    };
    return (
        <div className={`${theme === 'dark' ? 'bg-gray-700 text-red-200' : 'bg-white text-black'} p-3`}>
            <div className=''>
                {
                    samples?.map((items, i) => (
                        <div key={i} className="mb-4 p-3 border rounded">
                            <div className='flex justify-between'>
                                <h2 className="text-lg font-bold">{items.marketing_name}</h2>
                                <button onClick={() => handleShowDetail(items.marketing_name)}>
                                    +
                                </button>
                            </div>

                            {items?.dyeing_sections?.map((section, j) => (
                                <div key={j} className="ml-4 mt-2 pb-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <h3 className="text-md font-semibold">{section.yarn_type}</h3>
                                        <p>Section: {section.sectionName}</p>
                                        <p>Total Dyeing Order Qty: {section.total_dyeing_order_qty}</p>
                                    </div>

                                    <div className={`${ marketingName === items.marketing_name ? '': 'hidden'} ml-4 mt-2`}>
                                        {section?.orders?.map((order, k) => (
                                            <div key={k} className="text-sm grid grid-cols-3 text-gray-600">
                                                <p>→ Order: {order.dyeing_order}</p>
                                                <p>Qty: {order.dyeing_order_qty}</p>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}



                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default AllSamples;