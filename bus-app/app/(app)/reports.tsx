import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React from 'react';
import { fetchReports } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import SafeFlatListView from '@/components/SafeFlatListView';
import Header from '@/components/ReportHeader';
import { router } from 'expo-router';
const reportDetails = () => {
	const { token } = useAuth();

	const { data, isLoading, error } = useQuery({
		queryKey: ['reports'],
		queryFn: async () => fetchReports(token),
	});
	// console.log(data);
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
			pathname: '/report/report-details',
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
							title="Reports"
							backButtonHandler={() => router.back()}
							newButtonHandler={() => router.push('/report/send-report')}
						/>
					}
				>
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
									<View>
										<Text style={styles.text}>{item?.address}</Text>
									</View>
									<View style={styles.row}>
										<View>
											<Text>{item?.timestamp}</Text>
										</View>
										<View>
											<Text
												style={{
													...styles.text,
													color: getStatusColor(item?.status),
												}}
											>
												{item?.status}
											</Text>
										</View>
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
export default reportDetails;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'ghostwhite',
	},
	card: {
		padding: 6,
		marginVertical: 10,
		backgroundColor: '#fff',
		borderRadius: 8,
	},
	text: {
		fontSize: 12,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	row: {
		flexDirection: 'row',
		marginBottom: 2,
		justifyContent: 'space-between',
	},
});
