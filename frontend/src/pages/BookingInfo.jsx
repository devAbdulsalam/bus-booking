import { useContext } from 'react';
import Loader from '../components/Loader';
import { fetchBooking } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

const BookingInfo = () => {
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const props = { token: user.accessToken || user.token, id };
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookings', id],
		queryFn: async () => fetchBooking(props),
	});

	const navigate = useNavigate();
	if (error) {
		console.log(error);
	}
	const handleClick = () => {
		navigate(`/bookings/${id}`);
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7">
						<h3 className="mb-0 text-4xl">Booking Info</h3>
					</div>
					<div className="bg-white shadow rounded-lg my-2 px-6 py-5">
						<div>
							<div className="flex justify-between items-center">
								<p>From: {data?.from || data?.tripId?.from}</p>
								<p>To: {data?.to || data?.tripId?.to}</p>
							</div>
							<div className="flex justify-between items-center">
								<p>Price: {data?.price}</p>
								<p>Date: {moment(data?.date).format('MMM Do')}</p>
								<p>Seat(s): {data?.seat}</p>
							</div>
						</div>
					</div>
					<div className="flex justify-center my-10">
						{data?.status !== 'COMPLETED' ? (
							<button
								className="w-full max-w-[300px] mx-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
								onClick={handleClick}
							>
								Book now
							</button>
						) : (
							<button
								className="w-full max-w-[300px] mx-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
								disabled
							>
								Booked
							</button>
						)}
					</div>
				</main>
			)}
		</>
	);
};

export default BookingInfo;
