import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import SafeScrollView from '@/components/SafeScrollView';
import Header from '@/components/Header';
import { router } from 'expo-router';
import Loader from '@/components/Loader';
import { useState } from 'react';

export default function Index() {
	const [isLoading, setIsLoading] = useState(false);
	return (<>
			{isLoading ? (
				<Loader />
			) : (
		<SafeScrollView
			header={
				<Header
					title="Update Booking"
					backButtonHandler={() => router.back()}
				/>
			}
		>
			<Text>Update Booking</Text>
		</SafeScrollView>
	)}
		</>
	);
};
const styles = StyleSheet.create({
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
});
