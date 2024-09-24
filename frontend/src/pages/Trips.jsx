import { useContext } from 'react';
import Loader from '../components/Loader';
import { fetchTrips } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function Buses() {
	const { user } = useContext(AuthContext);
	const { data, isLoading, error } = useQuery({
		queryKey: ['trips'],
		queryFn: async () => fetchTrips(user.accessToken || user.token),
	});

	const navigate = useNavigate();
	if (error) {
		console.log(error);
	}
	if (data) {
		console.log(data);
	}
	const handleClick = (id) => {
		navigate(`/trips/${id}`);
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7">
						<h3 className="mb-0 text-4xl">Trips</h3>
					</div>
					<div>
						{data?.trips?.length > 0 &&
							data?.trips?.map((item) => {
								return (
									<div
										key={item._id}
										onClick={() => handleClick(item._id)}
										className="bg-white shadow rounded-lg my-2 px-6 py-5"
									>
										<div className="flex justify-between items-center">
											<p className="">From: {item?.from}</p>
											<p className="">To: {item.to}</p>
											<p className="">Bus: {item?.bus?.name}</p>
											<p className="">Price: {item.price}</p>
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

export default Buses;
