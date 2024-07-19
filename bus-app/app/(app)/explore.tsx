import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';

export default function Explore() {
	return (
		<View>
			<Text>Explore</Text>
		</View>
	);
}

const styles = StyleSheet.create({
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
});
