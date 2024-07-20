import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React from 'react';
import { fetchReports } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { router } from 'expo-router';
const reportDetails = () => {
	const { token } = useAuth();

	const { data, isLoading, error } = useQuery({
		queryKey: ['reports'],
		queryFn: async () => fetchReports(token),
	});
	console.log(data);

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
				<View>
					<FlatList
						keyExtractor={(item) => item._id.toString()}
						ListHeaderComponent={() => (
							<View>
								<Text>Reports</Text>
							</View>
						)}
						showsVerticalScrollIndicator={false}
						data={data}
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
				</View>
			)}
		</>
	);
};
export default reportDetails;

const styles = StyleSheet.create({});
