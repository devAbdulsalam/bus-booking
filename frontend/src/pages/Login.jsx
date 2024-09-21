import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import getError from './../hooks/getError';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { LocalStorage } from '../hooks/LocalStorage';
import AuthContext from '../context/authContext';
import Swal from 'sweetalert2';
import logo from '../assets/logo.jpg';
import bgImage from '../assets/adust.png';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const apiUrl = import.meta.env.VITE_API_URL;
	const { user, setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	console.log(user);
	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post(`${apiUrl}/users/login`, {
				email,
				password,
			});

			setLoading(false);
			console.log('Login successful:', response.data);
			setUser({ ...response.data });
			LocalStorage.set('user', { ...response.data });
			Swal.fire({
				title: 'Login successfull',
				icon: 'success',
				text: 'Log in account successfully',
			});
		} catch (error) {
			setLoading(false);
			console.error('Error registering:', error);
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
			<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
				<div className="4xl:max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
					<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center ">
						<div>
							<img src={logo} className="w-mx-auto h-32 mx-auto" />
						</div>
						<div className="mt-2 flex flex-col items-center border rounded-sm pb-4 p-4 md:p-0">
							<div className="w-full flex-1 mt-8 ">
								<div className="flex flex-col items-center">
									<form className="mx-auto max-w-xs" onSubmit={handleLogin}>
										<label
											className="block mb-2 text-sm font-bold text-gray-700 "
											htmlFor="email"
										>
											Email
										</label>
										<input
											className="w-full px-3 py-2 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											type="email"
											id="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="Email"
											required
										/>
										<p className="text-xs italic text-red-500 mt-1">
											Email is required.
										</p>
										<div className="mt-4 relative">
											<label
												className="block mb-2 text-sm font-bold text-gray-700 "
												htmlFor="password"
											>
												Password
											</label>
											<input
												className="w-full px-3 py-2 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
												type={showPassword ? 'text' : 'password'}
												value={password}
												id="password"
												onChange={(e) => setPassword(e.target.value)}
												placeholder="Password"
												required
											/>
											{/* Eye icon to toggle password visibility */}
											<div className="absolute inset-y-0 right-0  mt-6 flex items-center pr-4 z-10">
												{showPassword ? (
													<FiEyeOff
														onClick={() => setShowPassword(false)}
														className="text-gray-600 cursor-pointer"
													/>
												) : (
													<FiEye
														onClick={() => setShowPassword(true)}
														className="text-gray-600 cursor-pointer"
													/>
												)}
											</div>
										</div>
										<p className="text-xs italic text-red-500 mt-1">
											Please enter your password.
										</p>
										<div className="flex flex-wrap -mx-4 my-6 text-sm items-center justify-between">
											<div className="w-full lg:w-auto px-4 mb-4 lg:mb-0">
												<label htmlFor="">
													<input type="checkbox" />
													<span className="ml-1">Remember me</span>
												</label>
											</div>
											<div className="w-full lg:w-auto px-4">
												<a
													className="inline-block hover:underline text-blue-500"
													href="#"
												>
													Forgot password?
												</a>
											</div>
										</div>
										<button
											type="submit"
											className="mt-5 tracking-wide text-white font-semibold bg-green-400 text-white-500 w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
										>
											<svg
												className="w-6 h-5 -ml-5"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
												<circle cx="8.5" cy="7" r="4" />
												<path d="M20 8v6M23 11h-6" />
											</svg>
											<span className="ml-4">Sign In</span>
										</button>
										<p className="text-center text-sm mt-6">
											Don&rsquo;t have an account?{' '}
											<Link
												to="/register"
												className="ml-1text-red-500 hover:underline text-blue-500"
											>
												Sign up
											</Link>
										</p>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="flex-1 bg-green-100 text-center hidden lg:flex">
						<div
							className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
							style={{
								backgroundImage: `url(${bgImage})`,
							}}
						></div>
					</div>
				</div>
			</div>
			{loading && <Loader />}
		</>
	);
};

export default Login;
