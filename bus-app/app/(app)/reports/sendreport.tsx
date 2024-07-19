import { FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useState } from 'react';
import { router } from 'expo-router';
import {
	Alert,
	Button,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import Loader from '@/components/Loader';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const sendreport = () => {
	const [facing, setFacing] = useState('back');
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [location, setLocation] = useState(null);
	const [address, setAddress] = useState(null);

	Location.setGoogleApiKey('AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg');
	const { token } = useAuth();
	const getPremissions = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert(
				'Location access denied',
				'Permission to access location was denied',
				[
					{
						text: 'cancel',
						onPress: () => {
							console.log('cancel');
						},
					},
					{
						text: 'ok',
						onPress: () => {
							console.log('cancel');
						},
					},
				]
			);
			return router.navigate('/(app)');
		}
		const currentLocation = await Location.getCurrentPositionAsync({});
		const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
			longitude: currentLocation.coords.longitude,
			latitude: currentLocation.coords.latitude,
		});

		// console.log('Location:', currentLocation);
		// console.log(
		// 	'Reverse Geocoded:',
		// 	reverseGeocodedAddress[0]?.formattedAddress
		// );
		setLocation(currentLocation);
		setAddress(reverseGeocodedAddress[0]?.formattedAddress);
	};
	const sendImage = async () => {
		try {
			setIsLoading(true);
			const description = `longitude:${location?.coords?.longitude} and latitude:${location?.coords?.latitude}`;
			const latitude = location?.coords?.latitude;
			const longitude = location?.coords?.longitude;
			const option = { latitude, longitude, image, address, description };
			const { data } = await axios.post(`${apiUrl}/reports`, option, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (data) {
				Alert.alert('Report sent', 'Incident reported successfully');
				setImage(null);
				router.replace('/(app)');
			}
		} catch (error) {
			console.log(error);
			Alert.alert('Something went wrong', 'Something went wrong');
			router.replace('/(app)');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<View>
					<Text>sendreport</Text>
				</View>
			)}
		</>
	);
};

export default sendreport;

const styles = StyleSheet.create({});
