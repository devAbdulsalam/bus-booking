import { useContext } from 'react';
import Loader from '../components/Loader';
import { fetchReport } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const Reports = () => {
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const props = { token: user.accessToken || user.token, id };
	const { data, isLoading, error } = useQuery({
		queryKey: ['reports', id],
		queryFn: async () => fetchReport(props),
	});
	if (error) {
		console.log(error);
	}
	if (data) {
		console.log(data);
	}
	console.log(user);
	return (
		<>
			{isLoading ? (
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
							<p>Report status: {data?.status}</p>
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
				</main>
			)}
		</>
	);
};

export default Reports;
