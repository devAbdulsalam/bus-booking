import { useContext, useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { fetchBuses } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

const BusInfo = () => {
	const { user } = useContext(AuthContext);
	const [selectedSeat, setSelectedSeat] = useState(0);
	const [seat, setSeat] = useState(0);
	const [id, setId] = useState('');
	const [to, setTo] = useState('');
	const [from, setFrom] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [isError, setIsError] = useState('');
	const [isComplete, setIsComplete] = useState(false);
	const props = { token: user.accessToken || user.token, id };
	const { data, isLoading, error } = useQuery({
		queryKey: ['buses'],
		queryFn: async () => fetchBuses(props),
	});
	const tripData = {
		from: ['Kano', 'University'],
		to: ['Kano', 'University'],
	};

	useEffect(() => {
		if (data) {
			console.log('buses', data);
			// setSeat(data.seat);
			// setId(data.seat);
		}
	}, [data]);
	useEffect(() => {
		if (from && to && date && time) {
			setIsComplete(true);
		}
	}, [from, to, date, time]);

	const navigate = useNavigate();
	if (error) {
		console.log(error);
	}

	const handleChange = (text) => {
		setSelectedSeat(parseInt(text));
	};
	const handleClick = () => {
		if (isNaN(parseInt(selectedSeat))) {
			return setIsError('Invalid input. Please enter a number.');
		} else if (seat && Number(selectedSeat) > Number(seat)) {
			return setIsError('Selected seat number exceeds available seats.');
		} else {
			navigate(`/trips/${id}/payment?seats=${selectedSeat}`);
		}
	};
	const handleFromChange = (value) => {
		setFrom(value);
		if (to === value) {
			setTo('');
		}
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7">
						<h3 className="mb-0 text-4xl">Book Trip</h3>
					</div>

					<div>
						<div className="-mx-3 flex flex-wrap">
							<div className="w-full px-3 sm:w-1/2">
								<div className="mb-5">
									<label
										htmlFor="from"
										className="mb-3 block text-base font-medium text-[#07074D]"
									>
										From
									</label>
									<select
										name="from"
										id="from"
										value={from}
										onChange={(e) => handleFromChange(e.target.value)}
										className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
									>
										{tripData.from.map((location, index) => (
											<option key={index}>{location}</option>
										))}
									</select>
								</div>
							</div>
							<div className="w-full px-3 sm:w-1/2">
								<div className="mb-5">
									<label
										htmlFor="to"
										className="mb-3 block text-base font-medium text-[#07074D]"
									>
										To
									</label>
									<select
										name="to"
										id="to"
										value={to}
										onChange={(e) => setTo(e.target.value)}
										className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
									>
										{tripData.to
											.filter((location) => location !== from)
											.map((location, index) => (
												<option key={index} value={location}>
													{location}
												</option>
											))}
									</select>
								</div>
							</div>
						</div>
						<div className="-mx-3 flex flex-wrap">
							<div className="w-full px-3 sm:w-1/2">
								<div className="mb-5">
									<label
										htmlFor="date"
										className="mb-3 block text-base font-medium text-[#07074D]"
									>
										Date
									</label>
									<input
										type="date"
										name="date"
										id="date"
										value={date}
										onChange={(e) => setDate(e.target.value)}
										className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
									/>
								</div>
							</div>
							<div className="w-full px-3 sm:w-1/2">
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
										value={time}
										onChange={(e) => setTime(e.target.value)}
										className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
									/>
								</div>
							</div>
						</div>
						{isComplete && (
							<div className="-mx-3 flex flex-wrap">
								<div className="w-full px-3 sm:w-1/2">
									<div className="mb-5">
										<label
											htmlFor="bus"
											className="mb-3 block text-base font-medium text-[#07074D]"
										>
											Select Buses
										</label>
										<select
											name="bus"
											id="bus"
											value={from}
											onChange={(e) => handleFromChange(e.target.value)}
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
										>
											{tripData.from.map((location, index) => (
												<option key={index}>{location}</option>
											))}
										</select>
									</div>
									<div className="w-full px-3 sm:w-1/2">
										<div className="mb-5">
											<label
												htmlFor="phone"
												className="mb-3 block text-base font-medium text-[#07074D]"
											>
												No of seat(s) to book
											</label>
											<input
												type="number"
												name="phone"
												id="phone"
												value={selectedSeat}
												onChange={(e) => handleChange(e.target.value)}
												placeholder="Enter number of seat"
												className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
											/>
										</div>
									</div>
								</div>
							</div>
						)}
						{isError && <p className="text-red-500 ">{isError}</p>}
					</div>
					<div className="flex justify-center my-10">
						{data?.seat === '0' ? (
							<p>No seat available</p>
						) : (
							<button
								className="w-full max-w-[300px] mx-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
								onClick={handleClick}
							>
								Book now
							</button>
						)}
					</div>
				</main>
			)}
		</>
	);
};

export default BusInfo;
