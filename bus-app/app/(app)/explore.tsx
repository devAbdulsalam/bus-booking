import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React from 'react';
import { fetchTrips } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import SafeFlatListView from '@/components/SafeFlatListView';
import Header from '@/components/Header';
import { router } from 'expo-router';
import dayjs from 'dayjs';

export default function Explore() {
	const { token } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ['trips'],
		queryFn: async () => fetchTrips(token),
	});
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
				<SafeFlatListView
					header={
						<Header
							title="Explore trips"
							backButtonHandler={() => router.back()}
						/>
					}
					marginBottom={0}
				>
					<View style={styles.container}>
						<FlatList
							keyExtractor={(item) => item._id.toString()}
							showsVerticalScrollIndicator={false}
							data={data?.trips}
							renderItem={({ item }) => (
								<Pressable
									key={item._id}
									onPress={() => handlePress(item._id)}
									style={styles.card}
								>
									<View
										style={{
											...styles.titleContainer,
											width: '100%',
											justifyContent: 'space-between',
										}}
									>
										<Text style={styles.text}>From: {item?.from}</Text>
										<Text style={styles.text}>To: {item.to}</Text>
									</View>
									<View style={{ marginBottom: 5 }}>
										<Text style={styles.text}>
											Date: {dayjs(item?.date).format('DD/MM/YYYY')}
										</Text>
									</View>
									<View
										style={{
											...styles.titleContainer,
											width: '100%',
											justifyContent: 'space-between',
										}}
									>
										<Text style={styles.text}>Bus: {item?.bus?.name}</Text>
										<Text style={styles.price}>Price: {item.price}</Text>
									</View>
								</Pressable>
							)}
						/>
					</View>
				</SafeFlatListView>
			)}
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'ghostwhite',
	},
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
	card: {
		padding: 6,
		marginVertical: 10,
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
		marginBottom: 16,
	},
});
