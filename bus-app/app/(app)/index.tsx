import React from 'react';
// import { Colors } from '@/constants/Colors';
// import { accounts, transactions, services } from '@/constants/Data';
import { fetchDashboard } from '@/api/index';
import { useQuery } from '@tanstack/react-query';
import { FontAwesome } from '@expo/vector-icons';
import {
	SafeAreaView,
	Image,
	StyleSheet,
	Platform,
	StatusBar,
	View,
	Text,
	FlatList,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/context/authContext';
import Loader from '@/components/Loader';
import SearchCard from '@/components/SearchCard';
import Transaction from '@/components/Transaction';
import dayjs from 'dayjs';

export default function HomeScreen() {
	const theme = useTheme();
	const { profile, token } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ['dashboard'],
		queryFn: async () => fetchDashboard(token),
	});

	if (error) {
		return <Text>Error :</Text>;
	}
	// console.log('profile?.name', profile?.name);
	if (!data) return null;
	const handlePress = (id: string) => {
		router.navigate({
			pathname: '/bookings/booking-info',
			params: { id },
		});
	};
	const handleTripPress = (id: string) => {
		router.navigate({
			pathname: '/bookings/trip-info',
			params: { id },
		});
	};
	const renderItem = ({ item }: any) => {
		return (
			<TouchableOpacity
				onPress={() => handleTripPress(item._id)}
				key={item._id}
				style={styles.serviceItem}
			>
				<View
					style={{
						// height: 50,
						// width: 50,
						marginBottom: 5,
						borderRadius: 20,
						backgroundColor: item.backgroundColor,
						// alignItems: 'center',
						// justifyContent: 'center',
					}}
				>
					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 5}}>

					<Text>From : {item.from}</Text>
					<Text>To: {item.to}</Text>
					</View>
					<Text>Date: {dayjs(item.date).format('DD/MM/YYYY')}</Text>
					<Text>Time: {dayjs(item.tripTime).format('HH:mm A')}</Text>
				</View>
				<Text style={{ ...styles.serviceText }}>Price: {item.price}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<SafeAreaView style={styles.container}>
					<View style={styles.header}>
						<Pressable
							onPress={() => router.navigate('/profile')}
							style={{
								padding: 10,
							}}
						>
							<Image
								source={{
									uri: `https://ui-avatars.com/api/?name=${profile?.name}`,
								}}
								style={{
									height: 48,
									width: 48,
									borderRadius: 24,
									borderWidth: 1,
									// borderColor: theme.colors.secondary,
									// tintColor: theme.colors.primary,
								}}
							/>
						</Pressable>
						<Link href="/(app)/">
							<FontAwesome name="bell-o" size={24} color="black" />
						</Link>
					</View>
					<View
						style={{
							...styles.section,
							backgroundColor: theme.colors.background,
						}}
					>
						<FlatList
							ListHeaderComponent={() => (
								<>
									<SearchCard />
									<View style={styles.sectionHeaderContainer}>
										<Text style={styles.sectionHeader}>Latest Trip</Text>
										<FlatList
											data={data?.trips}
											horizontal
											pagingEnabled
											// showsHorizontalScrollIndicator={false}
											keyExtractor={(item) => `${item._id}`}
											renderItem={renderItem}
											style={{ marginTop: 12, gap: 5 }}
										/>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
												paddingVertical: 5,
											}}
										>
											<Text style={styles.sectionHeader}>Recent Bookings</Text>
											<Link href="/booking">
												<Text style={styles.transactionText}>See all</Text>
											</Link>
										</View>
									</View>
								</>
							)}
							showsVerticalScrollIndicator={false}
							// showsHorizontalScrollIndicator={false}
							data={data?.bookings}
							renderItem={({ item }) => <Transaction item={item} />}
						/>
					</View>
				</SafeAreaView>
			)}
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'ghostwhite',
		// paddingTop: StatusBar.currentHeight,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		backgroundColor: 'white',
		paddingTop: StatusBar.currentHeight,
	},
	headerImage: {
		height: 24,
		width: 24,
	},
	balanceContainer: {
		marginVertical: 16,
		padding: 16,
		borderRadius: 8,
	},
	balanceCard: {
		width: '90%',
		gap: 4,
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 16,
		shadowColor: 'white',
	},
	balanceText: {
		color: 'white',
		fontSize: 20,
		marginVertical: 12,
	},
	balanceAmount: {
		color: 'white',
		fontSize: 22,
		fontWeight: 'bold',
	},
	AccountText: {
		color: 'white',
	},
	section: {
		paddingHorizontal: 16,
		// paddingTop: 16,
		backgroundColor: '#D0D0D0',
		flex: 1,
	},
	sectionHeaderContainer: {
		flex: 1,
		paddingVertical: 10,
	},
	sectionHeader: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	serviceItem: {
		flex: 1,
		padding: 10,
		marginVertical: 10,
		marginHorizontal: 10,
		borderRadius: 10,
		backgroundColor: 'white',
		flexDirection: 'column',
		// justifyContent: 'center',
		// alignItems: 'center',
		shadowColor: 'white',
		elevation: 1,
		shadowOpacity: 0.5,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 2,
		},
	},
	serviceText: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 4,
	},
	transactionText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
});
