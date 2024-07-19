export const getAxiosError = (error: any) => {
	if (error.response) {
		return (
			error?.response?.data?.error?.message ||
			error?.response?.data?.error ||
			error?.response?.data?.message ||
			error?.message ||
			'An unknown error occurred.'
		);
	} else if (error.request) {
		// The request was made but no response was received
		return 'Error: No response received from the server. Please check your network connection.';
	}
	return 'No error message available.';
};
