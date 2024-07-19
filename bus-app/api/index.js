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
export const fetchBookings = async (props) => {
	try {
		const data = await axios.get(`${apiUrl}/bookings`).then((res) => res.data);
		return data;
	} catch (error) {
		console.log(error?.message);
		return error;
	}
};
export const fetchBooking = async (props) => {
	const config = {
		headers: {
			Authorization: `Bearer ${props?.accessToken}`,
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
