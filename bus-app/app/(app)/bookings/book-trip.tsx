import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import SafeScrollView from '@/components/SafeScrollView';
import Header from '@/components/Header';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@react-navigation/native';

export default function Book() {
	const theme = useTheme();
	const [selectedSeat, setSelectedSeat] = useState(1);
	const [isError, setIsError] = useState('');
	const { tripId, from, to, date, price, seat } = useLocalSearchParams();

	const handlePress = () => {
		router.navigate({
			pathname: '/bookings/confirm-booking',
			params: { tripId, from, to, date, price },
		});
	};
	const onTextChange = (text: string) => {
		if (isNaN(parseInt(text))) {
			setIsError('Invalid input. Please enter a number.');
		 } else if (seat && Number(text) > Number(seat)) {
			setIsError('Selected seat number exceeds available seats.');
		} else {
			setIsError('');
			setSelectedSeat(parseInt(text));
		}
	};
	return (
		<SafeScrollView
			header={
				<Header title="Book Trip" backButtonHandler={() => router.back()} />
			}
		>
			<View>
				<Text>Trip Info</Text>
				<View>
					<Text>From: {from}</Text>
					<Text>To: {to}</Text>
					<Text>Price: {price}</Text>
					<Text>Date: {date}</Text>
					<Text>Available Seat: {seat}</Text>
				</View>
			</View>

			<View>
				<Text>No of seat(s) to book</Text>
				<TextInput
					placeholder="1"
					style={{
						fontSize: 16,
						fontWeight: '500',
						color: theme.colors.text,
						paddingLeft: 48,
						paddingRight: 12,
						height: 48,
						borderRadius: 12,
						backgroundColor: theme.colors.background,
						width: '100%',
					}}
					inputMode="numeric"
					value={selectedSeat.toString()}
					onChangeText={onTextChange}
				/>
			</View>
			{isError ? <Text>{isError}</Text> : null}
			{seat === '0' ? (
				<Text>No seat available</Text>
			) : (
				<Pressable style={styles.searchButton} onPress={handlePress}>
					<Text style={styles.searchButtonText}>Book now</Text>
				</Pressable>
			)}
		</SafeScrollView>
	);
}

const styles = StyleSheet.create({
	searchButton: {
		backgroundColor: 'green',
		padding: 10,
		borderRadius: 8,
		alignItems: 'center',
	},
	searchButtonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});
