import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import DatePicker from '@/components/DatePicker';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SearchCard = () => {
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [selected, setSelected] = useState(new Date());
	const data = {
		from: ['Kano', 'University'],
		to: ['Kano', 'University'],
	};

	const handleFromChange = (value: string) => {
		setFrom(value);
		if (to === value) {
			setTo('');
		}
	};
	const handleSearch = () => {
		if (!from || !to || !selected) {
			return;
		}
		router.navigate({
			pathname: '/bookings/search-trip',
			params: { from, to, tripDate: selected.toISOString() },
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Search Trip</Text>
			<View style={styles.row}>
				<View style={styles.dropdownContainer}>
					<Text style={styles.subTitle}>From</Text>
					<Picker
						selectedValue={from}
						style={styles.picker}
						onValueChange={(itemValue) => handleFromChange(itemValue)}
					>
						<Picker.Item label="Select from" value="" />
						{data.from.map((location) => (
							<Picker.Item key={location} label={location} value={location} />
						))}
					</Picker>
				</View>
				<View style={styles.dropdownContainer}>
					<Text style={styles.subTitle}>To</Text>
					<Picker
						selectedValue={to}
						style={styles.picker}
						onValueChange={(itemValue) => setTo(itemValue)}
					>
						<Picker.Item label="Select to" value="" />
						{data.to
							.filter((location) => location !== from)
							.map((location) => (
								<Picker.Item key={location} label={location} value={location} />
							))}
					</Picker>
				</View>
			</View>
			<View style={styles.dateContainer}>
				<Text style={styles.subTitle}>Date</Text>
				<DatePicker date={selected} setDate={setSelected} />
			</View>
			<Pressable style={styles.searchButton} onPress={handleSearch}>
				<Ionicons name="search" size={24} color="white" />
				<Text style={styles.searchButtonText}>Search</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 6,
		marginVertical: 10,
		backgroundColor: '#fff',
		borderRadius: 8,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	subTitle: {
		fontSize: 12,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	row: {
		flexDirection: 'row',
		marginBottom: 16,
	},
	dropdownContainer: {
		flex: 1,
		marginHorizontal: 2,
	},
	picker: {
		height: 40,
		width: '100%',
	},
	dateContainer: {
		marginBottom: 16,
	},
	searchButton: {
		backgroundColor: 'green',
		padding: 10,
		borderRadius: 8,
		alignItems: 'center',
	},
	searchButtonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default SearchCard;
