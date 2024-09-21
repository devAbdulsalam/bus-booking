import { useContext } from 'react';
import AuthContext from '../context/authContext';
import Loader from '../components/Loader';
import { fetchReports } from '../hooks/axiosApis';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
	const { user } = useContext(AuthContext);
	const { data, isLoading, error } = useQuery({
		queryKey: ['reports'],
		queryFn: async () => fetchReports(user.accessToken || user.token),
	});
	const navigate = useNavigate();
	if (error) {
		console.log(error);
	}
	if (data) {
		console.log(data);
	}

	const handleClick = (id) => {
		navigate(`/reports/${id}`);
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<main className="body-content px-8 py-8 bg-slate-100">
					<div className="page-title mb-7">
						<h3 className="mb-0 text-4xl">Reports</h3>
					</div>
					{data?.length > 0 &&
						data?.map((item) => {
							return (
								<div
									key={item._id}
									onClick={() => handleClick(item._id)}
									className="bg-white shadow rounded-lg my-2 px-6 py-5"
								>
									<div className="flex justify-between items-center">
										<div className="">
											<p className=" font-semibold">{item?.address}</p>
											<p className="">{item?.timestamp}</p>
										</div>
										<p className=" font-semibold">{item?.status}</p>
									</div>
								</div>
							);
						})}
				</main>
			)}
		</>
	);
};

export default Reports;
