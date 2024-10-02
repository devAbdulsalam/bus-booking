import { useState, useContext } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import getError from '../hooks/getError';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Book() {
	const { user } = useContext(AuthContext);
	const [name, setName] = useState('');
	const [tripTime, setTripTime] = useState('');
	const [price, setPrice] = useState(0);
	const [seatCapacity, setSeatCapacity] = useState(0);
	const [loading, setLoading] = useState(false);
	const [isError, setIsError] = useState('');

	const apiUrl = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	const handleBooking = async (e) => {
		e.preventDefault();
		if (!name) {
			return setIsError('Bus name is required');
		}
		if (!seatCapacity || Number(seatCapacity) == 0) {
			return setIsError('Add availabe bus seat capacity ');
		}
		if (!price || Number(price) == 0) {
			return setIsError('Add trip price');
		}
		try {
			setLoading(true);
			const response = await axios.post(
				`${apiUrl}/buses`,
				{
					tripTime,
					name,
					price,
					seatCapacity,
				},
				{
					headers: {
						Authorization: `Bearer ${user?.token || user?.accessToken}`,
					},
				}
			);
			setLoading(false);
			console.log('Bus added successfully', response.data);
			toast.success('Bus added successfully');
			navigate(`/buses`);
		} catch (error) {
			setLoading(false);
			const message = getError(error);
			toast.success('Error', message);
			console.error('Error booking:', error);
		}
	};
	return (
		<>
			<main className="body-content px-8 py-8 bg-slate-100">
				<div className="page-title mb-7">
					<h3 className="mb-0 text-4xl">Add Bus</h3>
				</div>
				<div className="bg-white shadow rounded-lg my-2 px-6 py-5">
					<div className="flex items-center justify-center p-12">
						<div className="mx-auto w-full max-w-[550px] bg-white">
							<form onSubmit={handleBooking}>
								<label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
									Bus Details
								</label>
								<div className="-mx-3 flex flex-wrap">
									<div className="mb-5 mx-2 sm:w-1/2">
										<label
											htmlFor="bus name"
											className="mb-3 block text-base font-medium text-[#07074D]"
										>
											Bus Name
										</label>
										<input
											type="text"
											name="bus name"
											id="bus name"
											value={name}
											onChange={(e) => setName(e.target.value)}
											placeholder="Full Name"
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
										/>
									</div>
									<div className="mb-5">
										<label
											htmlFor="time"
											className="mb-3 block text-base font-medium text-[#07074D]"
										>
											Time
										</label>
										<input
											type="time"
											name="time"
											id="time"
											value={tripTime}
											onChange={(e) => setTripTime(e.target.value)}
											placeholder="Enter your phone number"
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
										/>
									</div>
								</div>
								<div className="-mx-3 flex flex-wrap">
									<div className="mb-5 mx-2 sm:w-1/2">
										<label
											htmlFor="price"
											className="mb-3 block text-base font-medium text-[#07074D]"
										>
											Price
										</label>
										<input
											type="number"
											name="price"
											id="price"
											value={price}
											onChange={(e) => setPrice(e.target.value)}
											placeholder="Full Name"
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
										/>
									</div>
									<div className="mb-5">
										<label
											htmlFor="seat"
											className="mb-3 block text-base font-medium text-[#07074D]"
										>
											No of Seat
										</label>
										<input
											type="number"
											name="seat"
											id="seat"
											value={seatCapacity}
											onChange={(e) => setSeatCapacity(e.target.value)}
											placeholder="Enter your phone number"
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
										/>
									</div>
								</div>

								<div>
									{isError && (
										<p className="text-red-500 text-center my-1 ">{isError}</p>
									)}
									<button
										type="submit"
										className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
									>
										Book Bus
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
			{loading && <Loader />}
		</>
	);
}

export default Book;
