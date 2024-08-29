import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { fetchSearchTrip } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { router, useLocalSearchParams } from 'expo-router';
import SafeFlatListView from '@/components/SafeFlatListView';
import SearchHeader from '@/components/SearchHeader';
import SearchCard from '@/components/SearchCard';
const bookings = () => {
	const { token } = useAuth();
	const { date, from, to } = useLocalSearchParams();
	const [showModal, setShowModal] = useState(false);
	const props = { date, from, to, token };
	// console.log(props);
	const getDate = new Date();
	const { data, isLoading, error } = useQuery({
		queryKey: ['trips', date, from, to, getDate],
		queryFn: async () => fetchSearchTrip(props),
	});

	const handlePress = (id: string) => {
		router.navigate({
			pathname: '/bookings/booking-info',
			params: { id },
		});
	};
	// if (data) {
	// 	console.log('datata', data);
	// }
	// if (error) {
	// 	console.log(error);
	// 	return <Text>Something went wrong</Text>;
	// }

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<SafeFlatListView
					header={
						<SearchHeader
							title="Search"
							backButtonHandler={() => router.back()}
							pressHandler={() => setShowModal(!showModal)}
						/>
					}
				>
					<FlatList
						keyExtractor={(item) => item?._id.toString()}
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
						ListEmptyComponent={() => (
							<Text style={{ padding: 10, textAlign: 'center' }}>No data</Text>
						)}
					/>
					{showModal && (
						<View>
							<SearchCard />
						</View>
					)}
				</SafeFlatListView>
			)}
		</>
	);
};
export default bookings;

const styles = StyleSheet.create({});
