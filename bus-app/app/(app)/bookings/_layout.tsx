import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="book-trip" options={{ headerShown: false }} />
			<Stack.Screen name="trip-info" options={{ headerShown: false }} />
		</Stack>
	);
};

export default _layout;
