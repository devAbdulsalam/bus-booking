import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
export const fetchUser = async (user) => {
	try {
		const { data } = await axios.post(`${apiUrl}/users/${user.id}`, user);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchUsers = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token || user.accessToken}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/users`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchDashboard = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token || user.accessToken}`,
			},
		};
		console.log(user);
		const { data } = await axios.get(`${apiUrl}/users/admin/dashboard`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchBuses = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token || user.accessToken}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/buses`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchBus = async (props) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${props?.token || props.accessToken}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/buses/${props.id}`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchBookings = async (token) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/bookings`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchBooking = async (props) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${props?.token || props.accessToken}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/bookings/${props.id}`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchTrips = async (accessToken) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
		const data = await axios
			.get(`${apiUrl}/trips`, config)
			.then((res) => res.data);
		return data;
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};
export const fetchTrip = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/trips/${props.id}`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};
export const fetchSearchTrip = async (props) => {
	const { from, to, date, token } = props;

	// console.log(props);
	// const config = {
	// 	headers: {
	// 		Authorization: `Bearer ${props?.token}`,
	// 	},
	// 	params: {
	// 		date: props.date,
	// 		from: props.from,
	// 		to: props.to,
	// 	},
	// };
	// http://localhost:5000/api/v1/buses/search?from=University&to=Kano&date=2025-07-06

	const dateString = new Date(date);
	const formattedDate = dateString.toISOString().split('T')[0];

	try {
		const response = await axios.get(
			`/buses/search?from=${from}&to=${to}&date=${formattedDate}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		// const data = await axios
		// 	.get(`${apiUrl}/buses/search`, config)
		// 	.then((res) => res.data);
		console.log('fetch search trips res data', response.data);
		// console.log('fetch search trips res', );
		const data = response.data;
		return data;
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};
export const fetchReports = async (accessToken) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
		const data = await axios
			.get(`${apiUrl}/reports`, config)
			.then((res) => res.data);
		return data;
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};
export const fetchReport = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/reports/${props.id}`, config)
			.then((res) => res.data);
		console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};
export const fetchTransactions = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken || props?.token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/transactions`, config)
			.then((res) => res.data);
		console.log('fetch banks data', data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
