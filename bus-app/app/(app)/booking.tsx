import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React from 'react';
import { fetchBookings } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { router } from 'expo-router';
import SafeScrollView from '@/components/SafeScrollView';
import Header from '@/components/Header';
const bookings = () => {
	const { token } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookings'],
		queryFn: async () => fetchBookings(token),
	});

	const handlePress = (id: string) => {
		router.navigate({
			pathname: '/bookings/booking-info',
			params: { id },
		});
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<SafeScrollView header={<Header title="Bookings" />}>
					<FlatList
						keyExtractor={(item) => item._id.toString()}
						showsVerticalScrollIndicator={false}
						data={data}
						renderItem={({ item }) => (
							<Pressable
								key={item._id}
								onPress={() => handlePress(item._id)}
								style={{ marginBottom: 10, padding: 10 }}
							>
								<Text>No of seat(s): {item.seat}</Text>
								<Text>Price: {item.price}</Text>
								<Text>Status: {item.status}</Text>
							</Pressable>
						)}
					/>
				</SafeScrollView>
			)}
		</>
	);
};
export default bookings;

const styles = StyleSheet.create({});
