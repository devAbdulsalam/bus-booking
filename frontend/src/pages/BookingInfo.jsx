import { useContext, useState } from 'react';
import Loader from '../components/Loader';
import { fetchBooking } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import getError from './../hooks/getError';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const BookingInfo = () => {
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const props = { token: user.accessToken || user.token, id };
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookings', id],
		queryFn: async () => fetchBooking(props),
	});

	const navigate = useNavigate();
	if (error) {
		console.log(error);
	}

	const apiUrl = import.meta.env.VITE_API_URL;
	const handleClick = async () => {
		try {
			setLoading(true);
			const { data } = await axios.patch(
				`${apiUrl}/bookingsupdate/${id}`,
				{ status: 'COMPLETED' },
				{
					headers: {
						Authorization: `Bearer ${user?.token || user?.accessToken}`,
					},
				}
			);
			if (data) {
				console.log(data);
				toast.success('Trip confirmed successfully');
				navigate(`/bookings`);
			}
			setLoading(false);
		} catch (error) {
			// const message = error?.data || 'Something went wrong!';
			setLoading(false);
			console.log('Error booking trip', error);
			const message = getError(error);
			return Swal.fire({
				title: 'Error!',
				icon: 'error',
				text: message,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
			});
		}
	};
	return (
		<>
			{isLoading || loading ? (
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
						{user?.user?.role === 'ADMIN' && data?.status !== 'COMPLETED' ? (
							<button
								className="w-full max-w-[300px] mx-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
								onClick={handleClick}
							>
								Confirm booking
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
