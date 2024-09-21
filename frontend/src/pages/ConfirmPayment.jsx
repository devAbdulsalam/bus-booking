import { useContext } from 'react';
import Loader from '../components/Loader';
import { fetchReport } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const ConfirmPayment = () => {
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookings', id],
		queryFn: async () => fetchReport({ user, id }),
	});
	if (error) {
		console.log(error);
	}
	if (data) {
		console.log(data);
	}
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					<h2>ConfirmPayment</h2>
				</div>
			)}
		</>
	);
};

export default ConfirmPayment;
