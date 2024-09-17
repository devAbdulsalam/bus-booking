import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fetchTrip } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import SafeScrollView from '@/components/SafeScrollView';
import Header from '@/components/Header';
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
		<>
			<SafeScrollView
				header={
					<Header title="Trip info" backButtonHandler={() => router.back()} />
				}
			>
				{isLoading && <Loader />}
				{data && (
					<View>
						<View style={{ padding: 10 }}>
							<Text style={styles.text}>From: {data.from}</Text>
							<Text style={styles.price}>To: {data.to}</Text>
							<Text style={styles.text}>Price: {data.price}</Text>
							<Text style={styles.text}>Date: {data.date}</Text>
							<Text style={styles.text}>Available Seat: {data.seat}</Text>
						</View>
						{!isAdmin ? (
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
			</SafeScrollView>
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
	sectionHeader: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	price: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	text: {
		fontSize: 12,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default tripInfo;
