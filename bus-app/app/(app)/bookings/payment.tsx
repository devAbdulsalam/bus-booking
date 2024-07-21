// screens/PaymentScreen.js
import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const PaymentScreen = ({ route }) => {
	const { paymentUrl } = route.params;

	return (
		<View style={styles.container}>
			<WebView
				source={{ uri: paymentUrl }}
				startInLoadingState={true}
				renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default PaymentScreen;
