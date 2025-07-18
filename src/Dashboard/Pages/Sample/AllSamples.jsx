import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../Hooks/AxiosSecure';
import { useThemeMode } from '../../Hooks/Theme';
import FinalSummary from './FinalSummary';
import UserRole from '../../Hooks/UserRole';

const AllSamples = () => {
    const [samples, setSamples] = useState([])
    const [marketingName, setMarketing_name] = useState('')
    const AxiosSecure = useAxiosSecure();
    const { theme } = useThemeMode();
    const [usersRole] = UserRole();
    const [filter, setFilter] = useState({
        month: '',
        year: '',
        marketing: '',
    });
    const [isShowFilter, setIsShowFilter] = useState()
    const [factoryWise, setFactoryWise] = useState('marketing_wise')
    const [isShowDetail, setIsShowDetail] = useState(false);

    const { refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            try {
                const res = await AxiosSecure.get('/samples', { params: filter });
                setSamples(res?.data)
                return res.data;
            } catch (error) {
                console.error("Error fetching posts:", error);
                return null;
            }
        },
    })
    const handleShowDetail = (marketingName) => {
        setMarketing_name(marketingName,)
        setIsShowDetail(!isShowDetail);

    };
    const handleShowFilters = () => {
        setIsShowFilter(!isShowFilter)
    }

    const handleStatus = async (dyeingOrder, status) => {
        try {
            const res = await AxiosSecure.post(`/sample-status/${status}/${dyeingOrder}`);
            console.log(res);
            refetch();
        } catch (e) {
            console.log(e);
        }
    }

    const handleFactoryWise = (type) => {
        console.log(type)
        setFactoryWise(type)

    }
    const printRef = useRef();

    const handlePrint = () => {
        setIsShowDetail(true)

        const printContent = printRef.current;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    }
    // const subtotal = section?.orders?.reduce((sum, order) => sum + Number(order.dyeing_order_qty || 0), 0);

    return (
        <div className={`${theme === 'dark' ? 'bg-gray-700 ' : 'bg-white text-black'} p-3`}>
            <div className={`${isShowFilter ? '' : 'flex justify-start'} `}>
                <div className={`${isShowFilter ? 'grid-cols-5' : 'hidden'}  grid mb-2 border`}>
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
                <div className='grid-cols-3 grid gap-3 w-[22rem]'>
                    <button className='bg-gray-400 p-2 flex items-center justify-center mb-2 rounded' onClick={() => handlePrint()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-gray-700 dark:text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 9V4h12v5m-6 4h.01M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2m-2 0H8v4h8v-4z"
                            />
                        </svg>
                    </button>
                    <button className='bg-gray-400 p-2 mb-2 rounded' onClick={() => handleFactoryWise(factoryWise === 'factory_wise' ? 'marketing_wise' : 'factory_wise')}>
                        {factoryWise === 'factory_wise' ? 'Marketing Wise' : 'Factory Wise'}
                    </button>
                    <button className='bg-gray-400 p-2 mb-2 rounded' onClick={handleShowFilters}>{isShowFilter ? 'Hide Filter' : 'Show Filter'}</button>

                </div>

            </div>
            <div ref={printRef} >
                <FinalSummary />
                <div className=''>
                    {
                        factoryWise === 'marketing_wise' &&
                        samples?.marketingWiseSamples?.map((items, i) => (
                            <div key={i} className="mb-4 p-3 border rounded">
                                <div className='flex justify-between'>
                                    <h2 className="text-lg font-bold">{items.marketing_name}</h2>
                                    <button onClick={() => handleShowDetail(items.marketing_name)}>
                                        {isShowDetail || marketingName === items.marketing_name ? '-' : '+'}
                                    </button>
                                </div>

                                {items?.dyeing_sections?.map((section, j) => (
                                    <div key={j} className="ml-4 mt-2 pb-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <h3 className="text-md font-semibold">{section.yarn_type}</h3>
                                            <p>Section: {section.sectionName}</p>
                                            <p>Total Dyeing Order Qty: {section.total_dyeing_order_qty}</p>
                                        </div>

                                        <div >
                                            {
                                                isShowDetail || marketingName === items.marketing_name ? (
                                                    section?.orders?.map((order, k) => (
                                                        <div key={k} className={`${order?.status === 'Adjust Qty' ? 'bg-green-500 bg-opacity-30 grid-cols-5 border text-green-600 font-semibold border-opacity-40 items-center border-green-300 grid' : 'bg-red-500 bg-opacity-30 flex items-center justify-between text-red-600 font-semibold border border-opacity-40 border-red-300'} text-sm  gap-4 p-1`}>
                                                            <p>→ Order: {order.dyeing_order}</p>
                                                            <p>→ Factory Name: {order.factory_name}</p>
                                                            <p>→ Month: {order.month_name}</p>
                                                            <p>Qty: {order.dyeing_order_qty}</p>
                                                            <p>
                                                                {
                                                                    order?.status === 'Adjust Qty' ? 'Adjusted' : <button onClick={() => handleStatus(order?.dyeing_order, 'sample-adjust')} className={`${items?.status === 'Adjust Qty' ? 'bg-green-500 bg-opacity-20 disable cursor-not-allowed border-green-500 border text-green-500' : 'bg-red-500 bg-opacity-20 border-red-500 border text-red-500'} ${usersRole?.role === 'admin' ? '' : 'hidden'} p-1 rounded-md `}>
                                                                        {items?.status === 'Adjust Qty' ? 'Adjusted' : 'Adjust'}
                                                                    </button>
                                                                }
                                                            </p>
                                                        </div>
                                                    ))
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    }


                    {
                        factoryWise === 'factory_wise' &&
                        samples?.factoryWiseSamples?.map((sam, k) =>
                            <div key={k} className="mb-4 p-3 border rounded">
                                <div className='flex justify-between'>
                                    <h2 className="text-lg font-bold">{sam.factory_name}</h2>
                                    <button onClick={() => handleShowDetail(sam.factory_name)}>
                                        {isShowDetail && marketingName === sam.factory_name ? '-' : '+'}

                                    </button>
                                </div>

                                {sam?.dyeing_sections?.map((section, j) => (
                                    <div key={j} className="ml-4 mt-2 pb-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <h3 className="text-md font-semibold">{section.yarn_type}</h3>
                                            <p>Section: {section.sectionName}</p>
                                            <p>Total Dyeing Order Qty: {section.total_dyeing_order_qty}</p>
                                        </div>

                                        <div className={` ml-4 mt-2`}>
                                            {

                                                isShowDetail || marketingName === sam.factory_name ? (
                                                    section?.orders?.map((order, k) => (
                                                        <div key={k} >
                                                            <div className={`${order?.status === 'Adjust Qty' ? 'bg-green-500 rounded-sm bg-opacity-30 flex justify-between border text-green-600 font-semibold border-opacity-40 border-green-300' : 'bg-red-500 rounded-sm bg-opacity-30 flex justify-between text-red-600 items-center font-semibold border border-opacity-40 border-red-300'} text-sm  gap-4 p-1`}>
                                                                <p>→ Order: {order.dyeing_order}</p>
                                                                <p>→ Factory Name: {order.factory_name}</p>
                                                                <p>→ Month: {order.month_name}</p>
                                                                <p>Qty: {order.dyeing_order_qty}</p>
                                                                <p>
                                                                    {
                                                                        order?.status === 'Adjust Qty' ? 'Adjusted' : <button onClick={() => handleStatus(order?.dyeing_order, 'sample-adjust')} className={`${order?.status === 'Adjust Qty' ? 'bg-green-500 bg-opacity-20 disable cursor-not-allowed border-green-500 border text-green-500' : 'bg-red-500 bg-opacity-20 items-center border-red-500 border text-red-500'} ${usersRole?.role === 'admin' ? '' : 'hidden'} p-1 rounded-md `}>
                                                                            {order?.status === 'Adjust Qty' ? 'Adjusted' : 'Adjust'}
                                                                        </button>
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : null


                                            }
                                        </div>

                                    </div>
                                ))}



                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default AllSamples;