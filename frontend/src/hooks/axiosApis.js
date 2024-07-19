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
		console.log()
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
export const fetchBookings = async (user) => {
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
export const fetchBooking = async (props) => {
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
