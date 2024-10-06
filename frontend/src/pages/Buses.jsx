import { useContext } from 'react';
import Loader from '../components/Loader';
import { fetchBuses } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function Buses() {
	const { user } = useContext(AuthContext);
	const { data, isLoading, error } = useQuery({
		queryKey: ['buses'],
		queryFn: async () => fetchBuses(user.accessToken || user.token),
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
						<h3 className="mb-0 text-4xl">Buses</h3>
					</div>
					<div>
						{data?.length > 0 &&
							data?.map((item) => {
								return (
									<div
										key={item._id}
										onClick={() => handleClick(item._id)}
										className="bg-white shadow rounded-lg my-2 px-6 py-5  cursor-pointer"
									>
										<p className="">Name: {item?.name}</p>
										<div className="flex justify-between items-center">
											<p className="">From: {item?.from || 'University'}</p>
											<p className="">To: {item?.to || 'Kano'}</p>
										</div>
										<div className="flex justify-between items-center">
											<p className="">
												Date:{' '}
												{moment(item?.tripTime).format('DD-MM-YYYY HH:SS A')}
											</p>
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
