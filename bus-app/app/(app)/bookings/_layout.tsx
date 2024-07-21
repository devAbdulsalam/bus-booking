import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
	return (
		<Stack>
			<Stack.Screen name="book-trip" options={{ headerShown: false }} />
			<Stack.Screen name="booking-info" options={{ headerShown: false }} />
			<Stack.Screen name="confirm-booking" options={{ headerShown: false }} />
			<Stack.Screen name="create-trip" options={{ headerShown: false }} />
			<Stack.Screen name="search-trip" options={{ headerShown: false }} />
			<Stack.Screen name="update-trip" options={{ headerShown: false }} />
			<Stack.Screen name="add-bus" options={{ headerShown: false }} />
			<Stack.Screen name="trip-info" options={{ headerShown: false }} />
			<Stack.Screen name="update-booking" options={{ headerShown: false }} />
		</Stack>
	);
};

export default _layout;
