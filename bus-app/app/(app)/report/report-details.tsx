import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fetchReport } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
const reportDetails = () => {
	const { token, isAdmin } = useAuth();
	const { id } = useLocalSearchParams();
	const { data, isLoading, error } = useQuery({
		queryKey: ['reports', id],
		queryFn: async () => fetchReport({ token, id }),
	});

	return (
		<View>
			<Text>Report-details</Text>
			{isLoading && <Loader />}
			{error && <Text>Error: {error.message}</Text>}
			{data && (
				<View>
					{isAdmin && (
						<View>
							<Text>User Info</Text>
							<View>
								<Text>Name: {data?.userId?.name}</Text>
								<Text>Rank {data?.userId?.rank}</Text>
								<Text>Phone {data?.userId?.phone}</Text>
								<Text>Email {data?.userId?.email}</Text>
							</View>
						</View>
					)}
					<Text>Report address: {data.address}</Text>
					<Text>Report message: {data.message}</Text>
					<Text>Report status: {data.status}</Text>
					{isAdmin && (
						<Pressable onPress={() => router.push(`/report/${data._id}/edit`)}>
							<Text>Update Report status</Text>
						</Pressable>
					)}
				</View>
			)}
		</View>
	);
};

export default reportDetails;

const styles = StyleSheet.create({});
