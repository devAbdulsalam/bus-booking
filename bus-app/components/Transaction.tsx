import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import {
	EvilIcons,
	FontAwesome6,
	AntDesign,
	Fontisto,
	MaterialIcons,
	MaterialCommunityIcons,
	Ionicons,
	Entypo,
	FontAwesome,
	Feather,
	FontAwesome5,
} from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

type transactionProps = {
	item: {
		name: string;
		amount: number | string;
		id: number;
		type: string;
		description: string | null;
		logo: string | null;
	};
};
const Transaction = ({ item }: transactionProps) => {
	const theme = useTheme();
	const getTransactionIcon = (type: string) => {
		switch (type) {
			case 'mobile':
				return <Entypo name="mobile" size={24} color="black" />;
			case 'Airtime':
				return <Entypo name="mobile" size={24} color="black" />;
			case 'bill':
				return <MaterialCommunityIcons name="cash" size={24} color="black" />;
			case 'electricity':
				return <MaterialIcons name="electric-bolt" size={24} color="black" />;
			default:
				return (
					<FontAwesome6
						name={
							type === 'transfer'
							? 'money-bill-transfer'
							: 'arrow-right-arrow-left'
						}
						size={24}
						color="white"
					/>
				);
		}
	};
	return (
		<View key={item.id} style={styles.transaction}>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
				{item?.logo ? (
					<Image
						source={{
							uri:
								item?.logo || `https://ui-avatars.com/api/?name=${item?.logo}`,
						}}
						style={{
							height: 38,
							width: 38,
							borderRadius: 19,
							borderWidth: 1,
							borderColor: '#D0D0D0',
						}}
					/>
				) : (
					<View style={styles.transactionIcon}>
						{getTransactionIcon(item.type)}
					</View>
				)}
				<View>
					<Text style={styles.transactionTitle}>{item.name}</Text>
					<Text style={styles.transactionText}>Banking</Text>
				</View>
			</View>
			<Text
				style={{
					...styles.transactionTitle,
					color: item.type === 'Deposit' ? 'green' : 'red',
				}}
			>
				{item.type === 'Deposite' ? `₦${item.amount}` : `₦${item.amount}`}
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
		// backgroundColor: 'white',
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