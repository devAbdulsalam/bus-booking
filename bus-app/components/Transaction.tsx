import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

type transactionProps = {
	item: {
		name: string;
		price: number | string;
		seat: number | string;
		_id: number;
		status: string;
	};
};
const Transaction = ({ item }: transactionProps) => {
	const theme = useTheme();
	// console.log(item);
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
	return (
		<View key={item?._id} style={styles.transaction}>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
				<Image
					source={{
						uri: `https://ui-avatars.com/api/?name=${item?._id}`,
					}}
					style={{
						height: 38,
						width: 38,
						borderRadius: 19,
						borderWidth: 1,
						borderColor: '#D0D0D0',
					}}
				/>
				<View>
					<Text style={styles.transactionTitle}>Seats: {item?.seat}</Text>
					<Text style={styles.transactionText}>Price: {item?.price}</Text>
				</View>
			</View>
			<Text
				style={{
					...styles.transactionTitle,
					color: getStatusColor(item?.status),
				}}
			>
				{item?.status}
			</Text>
		</View>
	);
};

export default Transaction;

const styles = StyleSheet.create({
	transaction: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 8,
		backgroundColor: 'white',
		shadowColor: 'white',
		elevation: 5,
		shadowOpacity: 0.8,
		shadowRadius: 10,
		shadowOffset: {
			width: 0,
			height: 20,
		},
		marginVertical: 2,
		padding: 5,
		paddingHorizontal: 8,
	},
	transactionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	transactionIcon: {
		padding: 10,
		borderRadius: 28,
		backgroundColor: '#D0D0D0',
	},
	transactionText: {
		fontSize: 16,
	},
});
