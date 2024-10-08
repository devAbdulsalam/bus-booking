import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'home' : 'home-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: 'Explore',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'bus' : 'bus-sharp'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="bookings"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="booking"
				options={{
					title: 'Bookings',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'calendar' : 'calendar-sharp'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="report"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="reports"
				options={{
					title: 'Reports',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'call' : 'call-outline'}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
