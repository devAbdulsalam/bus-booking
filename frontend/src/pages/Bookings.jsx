import { useContext } from 'react';
import Loader from '../components/Loader';
import { fetchBookings } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function Bookings() {
	const { user } = useContext(AuthContext);
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookings'],
		queryFn: async () => fetchBookings(user.accessToken || user.token),
	});

	const navigate = useNavigate();
	if (error) {
		console.log(error);
	}
	if (data) {
		console.log(data);
	}
	const handleClick = (id) => {
		navigate(`/bookings/${id}`);
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7">
						<h3 className="mb-0 text-4xl">
							{user?.user?.role !== 'Admin' ? 'My Bookings' : 'Bookings'}
						</h3>
					</div>
					<div>
						{data?.length > 0 &&
							data?.map((item) => {
								return (
									<div
										key={item._id}
										onClick={() => handleClick(item._id)}
										className="bg-white shadow rounded-lg my-2 px-6 py-5 cursor-pointer"
									>
										<div className="grid grid-cols-2 justify-between items-center">
											<p className="">From: {item?.from}</p>
											<p className="">To: {item?.to}</p>
											<p className="">
												Date: {moment(item?.date).format('MMM Do')}
											</p>
											<p className="">Seat(s): {item?.seat}</p>
											<p className="text-green-500">Price: {item?.price}</p>
											<p
												className={`${
													item?.status === 'COMPLETED'
														? 'text-green-500'
														: 'text-yellow-700'
												}`}
											>
												Status: {item?.status}
											</p>
										</div>
									</div>
								);
							})}
					</div>
				</main>
			)}
		</>
	);
}

export default Bookings;
