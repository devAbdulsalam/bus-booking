import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { rankData } from '@/constants/Data';
import { Link } from 'expo-router';
export default function App() {
	const [rank, setRank] = useState('student');
	return (
		<View>
			<View>
				<RadioGroup
					radioButtons={rankData}
					onPress={setRank}
					selectedId={rank}
					layout="row"
				/>
			</View>
			<Text>{rank}</Text>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginVertical: 10,
					marginBottom: 20,
				}}
			>
				<Text style={{ color: 'black' }}>Already have account? </Text>
				<Link href={'/login'} style={styles.textButton}>
					Login
				</Link>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	radioButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 45,
	},
	textButton: {
		alignSelf: 'center',
		fontWeight: 'bold',
		// color: COLORS.primary,
		marginVertical: 10,
	},
});
// +234 902 791 0607
