import RadioGroup from 'react-native-radio-buttons-group';
import { rankData } from '@/constants/Data';
import {
	View,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	useWindowDimensions,
	Alert,
	StyleSheet,
	StatusBar,
	Text,
	Image,
	Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { REGISTER_SCREEN } from '@/constants/Data';
import PrimaryButton from '@/components/SubmitButton';
import Icons from '@expo/vector-icons/MaterialIcons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Link, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import Loader from '@/components/LoadingModal';
import { getAxiosError } from '@/hooks/getError';
import { colors } from '@/AppStyles';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const registerScreen = () => {
	const theme = useTheme();
	const { height } = useWindowDimensions();
	const [email, onChangeEmail] = useState('');
	const [name, onChangeName] = useState('');
	const [phone, onChangePhone] = useState('');
	const [regId, setRegId] = useState('');
	const [isValid, setIsValid] = useState(true);
	const [rank, setRank] = useState('student');
	const [password, onChangePassword] = useState('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState('');
	const { session, setSesion, setToken, setProfile } = useAuth();

	// regId patterns
	const regIdPattern = /^[a-z]{2}\/\d{2}\/[a-z]{3,4}\/\d{4}$/i;

	const validateRegId = (id: string) => {
		return regIdPattern.test(id);
	};
	const onChangeRegId = (input: string) => {
		setRegId(input);
		setIsValid(validateRegId(input));
	};
	useEffect(() => {
		if (session) {
			router.push('/(app)/');
		}
	}, []);

	const clearData = () => {
		setIsError('');
		onChangeEmail('');
		onChangePassword('');
	};
	const handleLogin = async () => {
		setIsError('');
		if (!email) {
			return setIsError('Email is required');
		}
		if (!isValid) {
			return setIsError('Invalid Registration ID');
		}
		if (!password) {
			return setIsError('Password is required');
		}
		setIsLoading(true);
		try {
			const { data } = await axios.post(`${apiUrl}/users/register`, {
				email,
				password,
				name,
				phone,
				rank,
				regId,
			});
			if (data) {
				console.log(data);
				Alert.alert(
					'Registarion sucessfull',
					'Registarion sucessfull, Login to continue'
				);

				router.navigate({
					pathname: '/login',
					params: { email, password },
				});
			}

			setIsLoading(false);
		} catch (error) {
			// console.warn('Error', '@post login', { ...error });
			const message = await getAxiosError(error);
			// const message = error?.data || 'Something went wrong!';
			Alert.alert('Error sigining up', message, [
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
			]);
			setIsLoading(false);
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader loading={isLoading} />
			) : (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={{ flex: 1 }}
				>
					<SafeAreaView
						style={{
							flex: 1,
							backgroundColor: theme.colors.card,
							// minHeight: height,
						}}
					>
						<View style={styles.container}>
							<View style={{ padding: 24 }}>
								<Animated.Text
									entering={FadeInDown.duration(1000).springify()}
									style={{
										fontSize: 40,
										fontWeight: '800',
										color: colors.LightSeaGreen,
									}}
								>
									{REGISTER_SCREEN.title}
								</Animated.Text>
								<Animated.Text
									entering={FadeInDown.delay(100).duration(1000).springify()}
									style={{
										// opacity: 0.5,
										marginTop: 16,
										fontSize: 16,
										color: theme.colors.text,
									}}
								>
									{REGISTER_SCREEN.description}
								</Animated.Text>
								<View style={{ alignItems: 'center', gap: 16, marginTop: 32 }}>
									<Animated.View
										entering={FadeInDown.delay(200).duration(1000).springify()}
										style={{
											position: 'relative',
											width: '100%',
											marginHorizontal: 10,
										}}
									>
										<RadioGroup
											radioButtons={rankData}
											onPress={setRank}
											selectedId={rank}
											layout="row"
											// color={colors.LightSeaGreen}
										/>
									</Animated.View>
									<Animated.View
										entering={FadeInDown.delay(200).duration(1000).springify()}
										style={{ position: 'relative', width: '100%' }}
									>
										<TextInput
											placeholder="Your Full Name"
											style={{
												fontSize: 16,
												fontWeight: '500',
												color: theme.colors.text,
												paddingLeft: 48,
												paddingRight: 12,
												height: 48,
												borderRadius: 12,
												backgroundColor: theme.colors.background,
												width: '100%',
											}}
											value={name}
											onChangeText={onChangeName}
										/>
										<Icons
											name="person"
											size={24}
											color={theme.colors.text}
											style={{
												position: 'absolute',
												left: 12,
												top: 12,
												// opacity: 0.5,
											}}
										/>
									</Animated.View>
									<Animated.View
										entering={FadeInDown.delay(200).duration(1000).springify()}
										style={{ position: 'relative', width: '100%' }}
									>
										<TextInput
											placeholder="Your Phone"
											style={{
												fontSize: 16,
												fontWeight: '500',
												color: theme.colors.text,
												paddingLeft: 48,
												paddingRight: 12,
												height: 48,
												borderRadius: 12,
												backgroundColor: theme.colors.background,
												width: '100%',
											}}
											value={phone}
											onChangeText={onChangePhone}
										/>
										<Icons
											name="phone"
											size={24}
											color={theme.colors.text}
											style={{
												position: 'absolute',
												left: 12,
												top: 12,
												// opacity: 0.5,
											}}
										/>
									</Animated.View>
									<Animated.View
										entering={FadeInDown.delay(200).duration(1000).springify()}
										style={{ position: 'relative', width: '100%' }}
									>
										<TextInput
											placeholder={`Enter your ${rank} id.`}
											style={[
												{
													fontSize: 16,
													fontWeight: '500',
													color: theme.colors.text,
													paddingLeft: 48,
													paddingRight: 12,
													height: 48,
													borderRadius: 12,
													backgroundColor: theme.colors.background,
													width: '100%',
												},
												!isValid && styles.invalid,
											]}
											value={regId}
											onChangeText={onChangeRegId}
										/>
										<Icons
											name={`email`}
											size={24}
											color={theme.colors.text}
											style={{
												position: 'absolute',
												left: 12,
												top: 12,
												// opacity: 0.5,
											}}
										/>
										{!isValid && (
											<Text style={styles.errorText}>
												Invalid Registration ID
											</Text>
										)}
									</Animated.View>
									<Animated.View
										entering={FadeInDown.delay(200).duration(1000).springify()}
										style={{ position: 'relative', width: '100%' }}
									>
										<TextInput
											placeholder="Your Email"
											style={{
												fontSize: 16,
												fontWeight: '500',
												color: theme.colors.text,
												paddingLeft: 48,
												paddingRight: 12,
												height: 48,
												borderRadius: 12,
												backgroundColor: theme.colors.background,
												width: '100%',
											}}
											value={email}
											onChangeText={onChangeEmail}
										/>
										<Icons
											name="email"
											size={24}
											color={theme.colors.text}
											style={{
												position: 'absolute',
												left: 12,
												top: 12,
												// opacity: 0.5,
											}}
										/>
									</Animated.View>
									<Animated.View
										entering={FadeInDown.delay(400).duration(1000).springify()}
										style={{ position: 'relative', width: '100%' }}
									>
										<TextInput
											onChangeText={onChangePassword}
											value={password}
											secureTextEntry={!showPassword}
											placeholder="******"
											style={{
												fontSize: 16,
												fontWeight: '500',
												color: theme.colors.text,
												paddingLeft: 48,
												paddingRight: 12,
												height: 48,
												borderRadius: 12,
												backgroundColor: theme.colors.background,
												width: '100%',
											}}
										/>
										<Icons
											name="lock"
											size={24}
											color={theme.colors.text}
											style={{
												position: 'absolute',
												left: 12,
												top: 12,
												// opacity: 0.5,
											}}
										/>

										<TouchableOpacity
											style={styles.eyes}
											onPress={() => setShowPassword(!showPassword)}
										>
											{!showPassword ? (
												<FontAwesome name="eye" size={16} />
											) : (
												<FontAwesome name="eye-slash" size={16} />
											)}
										</TouchableOpacity>
									</Animated.View>
									<View>
										{isError && <Text style={styles.error}>{isError}</Text>}
									</View>
									<Animated.View
										entering={FadeInDown.delay(600).duration(1000).springify()}
										style={{ width: '100%' }}
									>
										<PrimaryButton
											buttonText="Register"
											onPress={handleLogin}
										/>
									</Animated.View>
								</View>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'center',
										alignItems: 'center',
										marginVertical: 10,
										marginBottom: 20,
									}}
								>
									<Text style={{ color: 'black' }}>Already have account? </Text>
									<Link href={'/login'} style={styles.textButton}>
										Login
									</Link>
								</View>
								<View style={styles.horizontal}>
									<Link href={`/(auth)/forgot-password`} asChild>
										<Text
											style={{
												// color: Colors.light.tint,
												fontWeight: 'bold',
												textAlign: 'center',
												marginBottom: 14,
												width: '100%',
											}}
										>
											Forgot Password
										</Text>
									</Link>
								</View>
							</View>
						</View>
					</SafeAreaView>
				</KeyboardAvoidingView>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: StatusBar.currentHeight,
		padding: 8,
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10,
	},
	image: {
		width: '70%',
		aspectRatio: 1,
		maxHeight: 700,
		maxWidth: 400,
	},
	titleText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'green',
		marginTop: 10,
		marginBottom: 20,
	},
	lable: {
		color: 'black',
	},
	input: {
		backgroundColor: 'white',
		borderColor: 'gray',
		borderRadius: 5,
		borderWidth: 1,
		marginTop: 5,
		padding: 10,
	},
	passwordContainer: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderColor: 'gray',
		borderRadius: 5,
		borderWidth: 1,
		flexDirection: 'row',
		height: 48,
		justifyContent: 'space-between',
		marginBottom: 20,
		width: '100%',
	},
	password: {
		width: '100%',
		height: '100%',
		padding: 10,
	},
	eyes: {
		right: 5,
		top: 0,
		justifyContent: 'center',
		padding: 2,
		height: '100%',
		position: 'absolute',
		zIndex: 50,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 6,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: 'green',
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
	},
	link: {
		color: 'white',
	},
	invalid: {
		borderColor: 'red',
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
	},
	error: {
		color: 'red',
		fontSize: 16,
		lineHeight: 21,
		letterSpacing: 0.25,
	},
	textButton: {
		alignSelf: 'center',
		fontWeight: 'bold',
		// color: COLORS.primary,
		marginVertical: 10,
	},
	radioButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 45,
	},
});

export default registerScreen;

// +234 902 791 0607
