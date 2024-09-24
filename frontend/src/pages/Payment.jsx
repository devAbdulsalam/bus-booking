import { useContext, useState } from 'react';
import { fetchTrip } from '../hooks/axiosApis';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useQuery } from '@tanstack/react-query';
import AuthContext from '../context/authContext';
import getError from './../hooks/getError';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import moment from 'moment';

const Payment = () => {
	const [loading, setLoading] = useState(false);
	const { user } = useContext(AuthContext);
	const [searchParams] = useSearchParams();
	const { id } = useParams();
	const seats = searchParams.get('seats');
	const { data, isLoading, error } = useQuery({
		queryKey: ['trips', id],
		queryFn: async () =>
			fetchTrip({ token: user.token || user.accessToken, id }),
	});
	const navigate = useNavigate();
	if (error) {
		console.log(error);
	}
	if (data) {
		console.log(data);
	}

	const apiUrl = import.meta.env.VITE_API_URL;
	const handleClick = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${apiUrl}/bookings`,
				{
					tripId: id,
					seat: seats,
				},
				{
					headers: {
						Authorization: `Bearer ${user?.token || user?.accessToken}`,
					},
				}
			);
			if (data) {
				console.log(data);
				toast.success('Trip booked successfully');
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
						<h3 className="mb-0 text-4xl">Confirm Booking</h3>
					</div>
					<div className="bg-white shadow rounded-lg my-2 px-6 py-5">
						<div>
							<div className="flex justify-between items-center">
								<p>From: {data?.from}</p>
								<p>To: {data?.to}</p>
								<p>Price: {data?.price}</p>
							</div>
							<div className="flex justify-between items-center">
								<p>Date: {moment(data?.date).format('MMM Do')}</p>
								<p>Booked Seat(s): {seats}</p>
								<p>Total Price: {Number(seats) * Number(data?.price)}</p>
							</div>
						</div>
						<div className="flex justify-center my-10">
							<button
								className="w-full max-w-[300px] mx-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
								onClick={handleClick}
							>
								Book now
							</button>
						</div>
					</div>
				</main>
			)}
		</>
	);
};

export default Payment;
