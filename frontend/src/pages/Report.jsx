import { useState, useContext } from 'react';
import AuthContext from '../context/authContext';
import axios from 'axios';
import Loader from '../components/Loader';
import getError from './../hooks/getError';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const EmergencyReport = () => {
	const [message, setMessage] = useState('');
	const [address, setAddress] = useState('');
	const [loading, setLoading] = useState(false);
	const apiUrl = import.meta.env.VITE_API_URL;
	const queryClient = useQueryClient();
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleReport = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${apiUrl}/reports`,
				{
					message,
					address,
				},
				{
					headers: {
						Authorization: `Bearer ${user?.token || user?.accessToken}`,
					},
				}
			);
			console.log('Report sent:', data);
			if (data) {
				queryClient.invalidateQueries({ queryKey: ['reports', 'dashboard'] });
				setLoading(false);
				navigate(`/reports`);
			}
		} catch (error) {
			setLoading(false);
			console.error('Error sending report:', error);
			const message = getError(error);
			toast.error(message);
		}
	};

	return (
		<>
			<main className="body-content px-8 py-8 bg-slate-100">
				<div className="page-title mb-7">
					<h3 className="mb-0 text-4xl">Reports Info</h3>
				</div>
				<div className="bg-white shadow rounded-lg my-2 px-6 py-5">
					<div className="flex items-center justify-center p-12">
						<div className="mx-auto w-full max-w-[550px] bg-white">
							<form onSubmit={handleReport}>
								<div className="mb-4">
									<label
										htmlFor="address"
										className="mb-3 block text-base font-medium text-[#07074D]"
									>
										Address
									</label>
									<input
										className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
										id="address"
										type="text"
										placeholder="address"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
								</div>
								<div className="mb-4">
									<label
										htmlFor="message"
										className="mb-3 block text-base font-medium text-[#07074D]"
									>
										Message
									</label>
									<textarea
										id="message"
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										placeholder="Emergency Message"
										required
										cols={30}
										rows={30}
										className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
									></textarea>
								</div>
								<button
									type="submit"
									className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
								>
									Send Report
								</button>
							</form>
						</div>
					</div>
				</div>
			</main>
			{loading && <Loader />}
		</>
	);
};

export default EmergencyReport;
