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
	Pressable,
	View,
	TextInput,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import SafeScrollView from '@/components/SafeScrollView';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import { getAxiosError } from '@/hooks/getError';
import { useQueryClient } from '@tanstack/react-query';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const sendreport = () => {
	const [image, setImage] = useState(null);
	const [message, setMessage] = useState('');
	const [address, setAddress] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { token } = useAuth();
	const queryClient = useQueryClient();

	const handelSendReport = async () => {
		try {
			if (!message) {
				return Alert.alert('Error', 'Please enter a message');
			}
			if (!address) {
				return Alert.alert('Error', 'Please enter a message');
			}
			setIsLoading(true);
			const option = {
				address,
				message,
			};
			console.log(option);
			const { data } = await axios.post(`${apiUrl}/reports`, option, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (data) {
				queryClient.invalidateQueries({ queryKey: ['reports'] });
				Alert.alert('Report sent', 'Incident reported successfully');
				setImage(null);
				router.replace('/(app)/reports');
			}
		} catch (error) {
			console.log(error);
			const message = getAxiosError(error);
			Alert.alert('Something went wrong', message || 'Something went wrong');
			router.replace('/(app)/reports');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<SafeScrollView
					header={
						<Header
							title="Send Report"
							backButtonHandler={() => router.back()}
						/>
					}
				>
					<View>
						<Text style={styles.lable}>Address</Text>
						<TextInput
							value={address}
							onChangeText={setAddress}
							placeholder="Kano nigeria"
							style={styles.textInput}
						/>
					</View>
					<View>
						<Text style={styles.lable}>Message</Text>
						<TextInput
							value={message}
							multiline={true}
							numberOfLines={6}
							onChangeText={setMessage}
							placeholder="Enter a message"
							style={styles.textArea}
						/>
					</View>
					<Pressable style={styles.button} onPress={handelSendReport}>
						<Text style={styles.buttonText}>Send Report</Text>
					</Pressable>
				</SafeScrollView>
			)}
		</>
	);
};

export default sendreport;

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'green',
		marginTop: 10,
		padding: 10,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	lable: {
		marginVertical: 10,
		marginHorizontal: 10,
	},
	textInput: {
		borderWidth: 1,
		padding: 5,
		borderRadius: 3,
		borderColor: 'ghostWhite',
	},
	textArea: {
		flex: 1,
		textAlignVertical: 'top',
		justifyContent: 'flex-start',
		height: 150,
		borderWidth: 1,
		padding: 5,
		borderRadius: 3,
		borderColor: 'ghostWhite',
	},
});
