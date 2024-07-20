import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fetchBooking } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
const bookingInfo = () => {
	const { token } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookings'],
		queryFn: async () => fetchBooking(token),
	});
	console.log(data);
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<View>
					<Text>Bookings</Text>
				</View>
			)}
		</>
	);
};
export default bookingInfo;

const styles = StyleSheet.create({});
