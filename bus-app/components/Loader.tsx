import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/Colors';

const Loader = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={'large'} color={COLORS.primary} />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
});
export default Loader;
