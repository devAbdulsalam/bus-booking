import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fetchTrip } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
const tripInfo = () => {
	const { token, isAdmin } = useAuth();
	const { id } = useLocalSearchParams();
	const { data, isLoading, error } = useQuery({
		queryKey: ['trips', id],
		queryFn: async () => fetchTrip({ token, id }),
	});
	const handlePress = () => {
		console.log(data);
		router.navigate({
			pathname: '/bookings/book-trip',
			params: { id, ...data },
		});
	};
	return (
		<View>
			<Text>Trip info</Text>
			{isLoading && <Loader />}
			{data && (
				<View>
					{isAdmin && (
						<View>
							<Text>Trip Info</Text>
							<View>
								<Text>From: {data.from}</Text>
								<Text>To: {data.to}</Text>
								<Text>Price: {data.price}</Text>
								<Text>Date: {data.date}</Text>
								<Text>Available Seat: {data.seat}</Text>
							</View>
						</View>
					)}
					{isAdmin ? (
						<Pressable onPress={handlePress} style={styles.button}>
							<Text style={styles.buttonText}>Book trip</Text>
						</Pressable>
					) : (
						<Pressable style={styles.button}>
							<Text style={styles.buttonText}>Update trip</Text>
						</Pressable>
					)}
				</View>
			)}
		</View>
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

export default tripInfo;
