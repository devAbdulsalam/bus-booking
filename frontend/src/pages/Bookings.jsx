import { useContext } from 'react';
import Loader from '../components/Loader';
import { fetchBookings } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

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
							{user.user.role === 'Admin' ? 'My Bookings' : 'Bookings'}
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
										<div className="flex justify-between items-center">
											<p className="">From: {item?.tripId?.from}</p>
											<p className="">To: {item?.tripId?.to}</p>
										</div>
										<div className="flex justify-between items-center">
											<p className="text-green-500">Seat(s): {item?.seat}</p>
											<p className="text-red-500">Price: {item?.price}</p>
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
