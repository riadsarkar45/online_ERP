import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/AxiosSecure';
import { useThemeMode } from '../../Hooks/Theme';

const AllSamples = () => {
    const [samples, setSamples] = useState([])
    const [marketingName, setMarketing_name] = useState('')
    const AxiosSecure = useAxiosSecure();
    const { theme } = useThemeMode();
    const [filter, setFilter] = useState({
        month: '',
        year: '',
        marketing: '',
    });

    const { refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            try {
                const res = await AxiosSecure.get('/samples', { params: filter });
                setSamples(res?.data?.marketingWiseSamples)
                console.log(res.data);
                return res.data;
            } catch (error) {
                console.error("Error fetching posts:", error);
                return null;
            }
        },
    })
    const handleShowDetail = (marketingName) => {
        setMarketing_name(marketingName)
    };

    console.log(filter);
    return (
        <div className={`${theme === 'dark' ? 'bg-gray-700 ' : 'bg-white text-black'} p-3`}>
            <div className='grid-cols-5 grid mb-2 border'>
                <select
                    className='p-3 outline-none text-black'
                    value={filter.month}
                    onChange={(e) => setFilter({ ...filter, month: e.target.value })}
                >
                    <option value=''>Month</option>
                    <option>July</option>
                    <option>August</option>
                </select>

                <select
                    className='p-3 outline-none text-black'
                    value={filter.marketing}
                    onChange={(e) => setFilter({ ...filter, marketing: e.target.value })}
                >
                    <option value=''>Marketing</option>
                    <option>Mr Chunnu</option>
                    <option>Mr. Riad</option>
                </select>

                <select
                    className='p-3 outline-none text-black'
                    value={filter.year}
                    onChange={(e) => setFilter({ ...filter, year: e.target.value })}
                >
                    <option value=''>Year</option>
                    <option>2025</option>
                    <option>2026</option>
                </select>

                <button className='p-3  rounded' onClick={() => refetch()}>
                    Apply
                </button>

                <button
                    className='p-3 rounded ml-2'
                    onClick={() => {
                        setFilter({ month: '', year: '', marketing: '' });
                        refetch();
                    }}
                >
                    Reset
                </button>


            </div>

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

                                    <div className={`${marketingName === items.marketing_name ? '' : 'hidden'} ml-4 mt-2`}>
                                        {section?.orders?.map((order, k) => (
                                            <div key={k} className="text-sm grid grid-cols-4 w-[58rem]">
                                                <p>→ Order: {order.dyeing_order}</p>
                                                <p>→ Factory Name: {order.factory_name}</p>
                                                <p>→ Month: {order.month_name}</p>
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