import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React from 'react';
import { fetchBookings } from '@/api/index';
import { useAuth } from '@/context/authContext';

import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
const bookings = () => {
	const { token } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookings'],
		queryFn: async () => fetchBookings(token),
	});
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<View>
					<FlatList
						keyExtractor={(item) => item._id.toString()}
						ListHeaderComponent={() => (
							<View>
								<Text>Bookings</Text>
							</View>
						)}
						showsVerticalScrollIndicator={false}
						data={data}
						renderItem={({ item }) => (
							<View style={{ marginBottom: 10, padding: 10 }}>
								<Text>{item._id}</Text>
							</View>
						)}
					/>
				</View>
			)}
		</>
	);
};
export default bookings;

const styles = StyleSheet.create({});
