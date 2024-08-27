import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
export const fetchUser = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/users/${props.id}`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchDashboard = async (accessToken) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
		const data = await axios
			.get(`${apiUrl}/users/user/dashboard`, config)
			.then((res) => res.data);
		return data;
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};
export const fetchBookings = async (accessToken) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
		const data = await axios
			.get(`${apiUrl}/bookings`, config)
			.then((res) => res.data);
		return data;
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};
export const fetchBooking = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/bookings/${props.id}`, config)
			.then((res) => res.data);
		// console.log('fetchuser data', data);
		return data;
	} catch (error) {
		console.log(error?.message);
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

	console.log(props);
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
	try {
		const response = await axios.get(
			`/buses/search?from=${from}&to=${to}&date=${date}`,
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
		// console.log('fetch search trips res data', response.data);
		// console.log('fetch search trips res', );
		// console.log('fetch search trips data', data);
		return response.data;
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
			Authorization: `Bearer ${props?.accessToken}`,
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
