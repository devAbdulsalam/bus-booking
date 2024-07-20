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
	const { from, to, price, date, bookedseat } = useLocalSearchParams();
	const { id } = useLocalSearchParams();
	const props = { token, id };
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookings'],
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
							<Text>From: {from}</Text>
							<Text>To: {to}</Text>
							<Text>Price: {price}</Text>
							<Text>Date: {date}</Text>
							<Text>Booked Seat(s): {bookedseat}</Text>
							<Text>Total Price: {Number(bookedseat) * Number(price)}</Text>
						</View>
					</View>

					<Pressable style={styles.button} onPress={handlePress}>
						<Text style={styles.buttonText}>Book now</Text>
					</Pressable>
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
