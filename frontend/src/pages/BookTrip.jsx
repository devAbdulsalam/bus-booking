import { useContext, useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { fetchTrip } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

const BusInfo = () => {
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const [selectedSeat, setSelectedSeat] = useState();
	const [seat, setSeat] = useState(0);
	const [isError, setIsError] = useState('');
	const props = { token: user.accessToken || user.token, id };
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookings', id],
		queryFn: async () => fetchTrip(props),
	});

	useEffect(() => {
		if (data) {
			console.log(data);
			setSeat(data.seat);
		}
	}, [data]);

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
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7">
						<h3 className="mb-0 text-4xl">Book Trip</h3>
					</div>
					<div className="bg-white shadow rounded-lg my-2 px-6 py-5">
						<div>
							<div className="flex justify-between items-center">
								<p>From: {data?.from}</p>
								<p>To: {data?.to}</p>
								<p>Price: {data?.price}</p>
								<p>Date: {moment(data?.date).format('MMM Do')}</p>
							</div>
							<div className="mt-2 font-bold">
								<p>Available Seat(s): {data?.bus.seatCapacity}</p>
								<p>Booked Seat(s): {data?.bus.seatsFilled}</p>
							</div>
							<p className="text-lg font-semibold text-green-500 mt-10">
								Total Price: {Number(seat) * Number(data?.price)}
							</p>
						</div>
					</div>
					<div>
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
