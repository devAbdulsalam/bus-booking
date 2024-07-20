import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
	return (
		<Stack>
			<Stack.Screen name="send-report" options={{ headerShown: false }} />
			<Stack.Screen name="report-details" options={{ headerShown: false }} />
		</Stack>
	);
};

export default _layout;
