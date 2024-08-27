import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React from 'react';
import { fetchBookings } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { router } from 'expo-router';
import SafeFlatListView from '@/components/SafeFlatListView';
import Header from '@/components/Header';
const bookings = () => {
	const { token } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ['bookings'],
		queryFn: async () => fetchBookings(token),
	});
	// console.log(data)
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'CONFIRMED':
				return 'blue';
			case 'COMPLETED':
				return 'green';
			case 'PENDING':
				return 'orange';
			default:
				return 'red';
		}
	};

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
				<SafeFlatListView header={<Header title="Bookings" />}>
					<View style={styles.container}>
						<FlatList
							keyExtractor={(item) => item._id.toString()}
							showsVerticalScrollIndicator={false}
							data={data}
							renderItem={({ item }) => (
								<Pressable
									key={item._id}
									onPress={() => handlePress(item._id)}
									style={styles.card}
								>
									<Text style={styles.text}>No of seat(s): {item.seat}</Text>
									<View style={styles.row}>
										<Text style={styles.price}>Price: {item.price}</Text>
										<Text
											style={{
												...styles.text,
												color: getStatusColor(item?.status),
											}}
										>
											{item.status}
										</Text>
									</View>
								</Pressable>
							)}
						/>
					</View>
				</SafeFlatListView>
			)}
		</>
	);
};
export default bookings;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'ghostwhite',
	},
	card: {
		padding: 6,
		marginVertical: 4,
		backgroundColor: '#fff',
		borderRadius: 8,
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
	row: {
		flexDirection: 'row',
		// marginBottom: 16,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
