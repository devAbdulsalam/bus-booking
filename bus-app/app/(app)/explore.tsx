import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React from 'react';
import { fetchTrips } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import SafeScrollView from '@/components/SafeScrollView';
import Header from '@/components/Header';
import { router } from 'expo-router';

export default function Explore() {
	const { token } = useAuth();

	const { data, isLoading, error } = useQuery({
		queryKey: ['trips'],
		queryFn: async () => fetchTrips(token),
	});
	console.log(data);
	if (error) {
		console.log(error);
	}
	const handlePress = (id: string) => {
		router.navigate({
			pathname: '/bookings/trip-info',
			params: { id },
		});
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<SafeScrollView
					header={
						<Header
							title="Explore trips"
							backButtonHandler={() => router.back()}
						/>
					}
				>
					<FlatList
						keyExtractor={(item) => item._id.toString()}
						showsVerticalScrollIndicator={false}
						data={data?.data}
						renderItem={({ item }) => (
							<Pressable key={item._id} onPress={() => handlePress(item._id)}>
								<View>
									<Text>{item.address}</Text>
								</View>
								<View>
									<Text>{item.status}</Text>
								</View>
							</Pressable>
						)}
					/>
				</SafeScrollView>
			)}
		</>
	);
}
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
