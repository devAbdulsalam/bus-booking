import React from 'react';
import {
	Image,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	View,
	Alert,
	ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useAuth } from '@/context/authContext';
import { useTheme } from '@react-navigation/native';
import { settingData } from '@/constants/Data';
import { getIconComponent } from '@/hooks/getIcon';

// const apiUrl = process.env.EXPO_PUBLIC_API_URL;
type SettingItem = {
	id: number;
	name: string;
	icon: string;
	iconType: string;
	link: string;
};

const Index = () => {
	// const { profile, token } = useAuth();
	const theme = useTheme();
	const { profile, logout } = useAuth();
	const logoutFn = async () => {
		await logout();
		router.navigate('/');
	};
	const handleLogout = () => {
		Alert.alert('Logout', 'Are you sure you want to log out?', [
			{
				text: 'cancel',
				onPress: () => {
					console.log('cancel');
				},
			},
			{
				text: 'ok',
				onPress: logoutFn,
			},
		]);
	};

	const SettingItem = ({ item }: { item: SettingItem }) => {
		const IconComponent = getIconComponent(item.iconType);
		return (
			<Pressable
				key={item.id}
				onPress={() => router.navigate(item.link)}
				style={styles.pressable}
			>
				<View style={styles.iconContainer}>
					<IconComponent name={item.icon} size={24} color={theme.colors.text} />
				</View>
				<Text style={[styles.text, { color: theme.colors.text }]}>
					{item.name}
				</Text>
			</Pressable>
		);
	};

	return (
		<View style={styles.header}>
			<View
				style={{
					justifyContent: 'space-between',
					flexDirection: 'row',
					backgroundColor: 'white',
					padding: 15,
				}}
			>
				<View
					style={{
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Pressable
						onPress={() => router.navigate('/profile')}
						style={{
							padding: 10,
						}}
					>
						<Image
							source={{
								uri:
									profile?.avatar?.url ||
									`https://ui-avatars.com/api/?name=${profile?.firstName}`,
							}}
							style={{
								height: 48,
								width: 48,
								borderRadius: 24,
								borderWidth: 1,
								// borderColor: COLORS.secondary,
							}}
						/>
					</Pressable>
					<View style={{ marginLeft: 10 }}>
						<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
							{profile?.firstName} {profile?.lastName}
						</Text>
						<Text style={{ fontSize: 14, color: 'gray' }}>
							{profile?.email}
						</Text>
					</View>
				</View>
				<Pressable
					onPress={() => router.push('/(app)/profile')}
					style={{
						paddingHorizontal: 10,
						paddingVertical: 12,
						borderRadius: 10,
					}}
				>
					<FontAwesome name="edit" size={18} color={theme.colors.text} />
				</Pressable>
			</View>
			<ScrollView style={{ paddingHorizontal: 10, marginTop: 4 }}>
				{settingData.map((item: any) => (
					<SettingItem key={item.id} item={item} />
				))}
				<Pressable
					onPress={handleLogout}
					style={[
						styles.pressable,
						{
							// justifyContent: 'center',
							// backgroundColor: 'red',
							alignContent: 'center',
							flexDirection: 'row',
							padding: 15,
							borderRadius: 10,
						},
					]}
				>
					<View
						style={{
							paddingHorizontal: 10,
							paddingVertical: 12,
							borderRadius: 10,
						}}
					>
						<Feather name="log-out" size={24} color="red" />
					</View>
					<Text style={[styles.text, { color: 'red' }]}>Log out</Text>
				</Pressable>
			</ScrollView>
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	header: {
		width: '100%',
		paddingTop: StatusBar.currentHeight,
	},
	headerText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	button: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		height: 56,
		borderRadius: 8,
	},
	text: {
		fontWeight: '600',
		fontSize: 16,
		color: 'white',
		textAlign: 'center',
	},
	pressable: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: 8,
		borderRadius: 10,
		marginBottom: 2, // added to separate items
		backgroundColor: 'white',
		borderColor: 'gray',
		// borderRadius: 5,
		// borderWidth: 1,
		// marginBottom: 20,
	},
	iconContainer: {
		paddingHorizontal: 10,
		paddingVertical: 12,
		borderRadius: 10,
	},
});
