import { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { fetchReport } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import getError from './../hooks/getError';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const Reports = () => {
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const props = { token: user.accessToken || user.token, id };
	const { data, isLoading, error } = useQuery({
		queryKey: ['reports', id],
		queryFn: async () => fetchReport(props),
	});

	const navigate = useNavigate();
	useEffect(() => {
		if (error) {
			console.log(error);
		}
		if (data) {
			console.log(data);
		}
	}, [data]);
	console.log(user);

	const apiUrl = import.meta.env.VITE_API_URL;
	const handleClick = async () => {
		try {
			setLoading(true);
			const { data } = await axios.patch(
				`${apiUrl}/reports/${id}`,
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
						<h3 className="mb-0 text-4xl">Reports Info</h3>
					</div>
					<div className="bg-white shadow rounded-lg my-2 px-6 py-5 text-lg">
						<div>
							<p className="text-black">Report address: {data?.address}</p>
							<p>Report message: {data?.message}</p>
							<p
								className={`${
									data?.status === 'COMPLETED'
										? 'text-green-500'
										: 'text-yellow-700'
								}`}
							>
								Report Status: {data?.status}
							</p>

							<p>Report date: {moment(data?.timestamp).format('MMM Do')}</p>
						</div>
						{user?.user?.role === 'ADMIN' && data?.userId ? (
							<div>
								<h4 className=" text-2xl">User Info</h4>
								<div>
									<p>Name: {data?.userId?.name}</p>
									<p>Rank {data?.userId?.rank}</p>
									<p>Phone {data?.userId?.phone}</p>
									<p>Email {data?.userId?.email}</p>
								</div>
							</div>
						) : (
							''
						)}
					</div>

					<div className="flex justify-center my-10">
						{user?.user?.role === 'ADMIN' && data?.status !== 'COMPLETED' ? (
							<button
								className="w-full max-w-[300px] mx-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
								onClick={handleClick}
							>
								Confirm Report
							</button>
						) : (
							''
						)}
					</div>
				</main>
			)}
		</>
	);
};

export default Reports;
