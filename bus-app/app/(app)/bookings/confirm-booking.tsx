import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, View, Text, Pressable, Alert } from 'react-native';
import SafeScrollView from '@/components/SafeScrollView';
import Header from '@/components/Header';
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import Loader from '@/components/LoadingModal';
import { getAxiosError } from '@/hooks/getError';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function Explore() {
	const { token } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const { tripId, from, to, date, price, bookedseat } = useLocalSearchParams();

	const handlePress = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(
				`${apiUrl}/bookings`,
				{
					tripId,
					seat: bookedseat,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (data) {
				Alert.alert('Trip booked successfully', 'Trip booked successfully');
				router.replace('/(app)/');
			}
			setIsLoading(false);
		} catch (error) {
			// console.warn('Error', '@post login', { ...error });
			const message = await getAxiosError(error);
			// const message = error?.data || 'Something went wrong!';
			Alert.alert('Error booking trip', message, [
				{
					text: 'cancel',
					onPress: () => {
						console.log('cancel');
					},
				},
				{
					text: 'ok',
					onPress: () => {
						console.log('cancel');
					},
				},
			]);
			setIsLoading(false);
		}
	};
	return (
		<>
			{isLoading ? (
				<Loader loading={isLoading} />
			) : (
				<SafeScrollView
					header={
						<Header
							title="Confirm-booking"
							backButtonHandler={() => router.back()}
						/>
					}
				>
					<View>
						<Text>Trip Info</Text>
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
}

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
