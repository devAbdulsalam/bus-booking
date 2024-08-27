import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { fetchBooking } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { router, useLocalSearchParams } from 'expo-router';
import SafeScrollView from '@/components/SafeScrollView';
import Header from '@/components/Header';
const bookingInfo = () => {
	const { token } = useAuth();
	const { from, to } = useLocalSearchParams();
	const { id } = useLocalSearchParams();
	const props = { token, id };
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookings', id],
		queryFn: async () => fetchBooking(props),
	});

	const handlePress = () => {
		console.log(data);
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<SafeScrollView
					header={
						<Header
							title="Ticket-info"
							backButtonHandler={() => router.back()}
						/>
					}
				>
					<View>
						<Text>Ticket Info</Text>
						<View>
							<Text>From: {data?.from}</Text>
							<Text>To: {data?.to}</Text>
							<Text>Price: {data?.price}</Text>
							<Text>Date: {data?.date}</Text>
							<Text>Booked Seat(s): {data?.seat}</Text>
							<Text>
								Total Price: {Number(data?.seat) * Number(data?.price)}
							</Text>
						</View>
					</View>
					{data.status !== 'COMPLETED' && (
						<Pressable style={styles.button} onPress={handlePress}>
							<Text style={styles.buttonText}>Book now</Text>
						</Pressable>
					)}
				</SafeScrollView>
			)}
		</>
	);
};
const styles = StyleSheet.create({
	button: {
		backgroundColor: 'green',
		padding: 10,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default bookingInfo;
