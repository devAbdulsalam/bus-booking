import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { fetchSearchTrip } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { router, useLocalSearchParams } from 'expo-router';
import SafeScrollView from '@/components/SafeScrollView';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
const bookings = () => {
	const { token } = useAuth();
	const { date, from, to } = useLocalSearchParams();
	const [showModal, setShowModal] = useState(false);
	const props = { date, from, to, token };
	const { data, isLoading, error } = useQuery({
		queryKey: ['trips', date, from, to],
		queryFn: async () => fetchSearchTrip(props),
	});

	const handlePress = (id: string) => {
		router.navigate({
			pathname: '/bookings/booking-info',
			params: { id },
		});
	};
	if (error) {
		console.log(error);
		return <Text>Something went wrong</Text>;
	}

	const SearchHeader = () => {
		return (
			<View style={{ flexDirection: 'row' }}>
				<Header
					title="Search Bookings"
					backButtonHandler={() => router.back()}
				/>
				<Pressable onPress={() => setShowModal(!showModal)}>
					<Ionicons name="search" size={24} color="black" />
				</Pressable>
			</View>
		);
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<SafeScrollView header={<SearchHeader />}>
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
						ListEmptyComponent={() => <Text>No data</Text>}
					/>
					{showModal && <Text>hello</Text>}
				</SafeScrollView>
			)}
		</>
	);
};
export default bookings;

const styles = StyleSheet.create({});
