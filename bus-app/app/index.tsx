import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, responsiveFontSize, responsiveHeight } from '../AppStyles';
import { useAuth } from '@/context/authContext';

import { router } from 'expo-router';

const ProgressPoints = ({ step }: any) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				width: 100,
				marginTop: 20,
			}}
		>
			{[1, 2, 3].map((index) => (
				<View
					key={index}
					style={{
						height: 10,
						width: 10 + 7 * Number(step === index),
						borderRadius: 5,
						borderColor: step === index ? 'green' : 'green',
						borderWidth: 1,
						marginHorizontal: 5,
						backgroundColor: step === index ? 'green' : 'white',
					}}
				/>
			))}
		</View>
	);
};

const Welcome = () => {
	const [step, setStep] = useState(1);
	const { session } = useAuth();
	useEffect(() => {
		console.log(session);
		if (session) {
			router.push('/(app)/');
		}
	}, [session]);

	const handleNext = () => {
		if (step < 3) {
			setStep(step + 1);
		} else {
			router.navigate('/login');
		}
	};

	const handleSkip = () => {
		setStep(1);
		router.navigate('/login');
	};

	const steps = [
		'Book your bus tickets with ease and convenience.',
		'Easily check the availability of buses at your desired pickup points.',
		'Book, pay, and confirm your seat with just a few clicks.',
	];

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground
				source={require('../assets/logo.jpg')}
				style={styles.imageBg}
				resizeMode="contain"
			>
				<Text style={styles.skip} onPress={handleSkip}>
					Skip
				</Text>
				<View style={styles.contentBox}>
					<Text style={styles.text}>{steps[step - 1]}</Text>
					<View style={styles.progress}>
						<ProgressPoints step={step} />
						<TouchableOpacity onPress={handleNext} style={styles.nextIcon}>
							<MaterialIcons name="navigate-next" size={24} color="white" />
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	imageBg: {
		flex: 1,
		height: Dimensions.get('window').height,
		width: '100%',
		justifyContent: 'flex-end',
	},
	skip: {
		position: 'absolute',
		top: responsiveHeight(50),
		right: 20,
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.GreyII,
	},
	contentBox: {
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 1)',
		elevation: 2,
		borderRadius: 10,
		margin: 20,
		marginBottom: 20,
		padding: 10,
	},
	progress: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		marginTop: 20,
	},
	nextIcon: {
		backgroundColor: colors.Green,
		padding: 10,
		borderRadius: 50,
	},
	head: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	text: {
		fontSize: responsiveFontSize(16),
		color: colors.Green,
		textAlign: 'center',
	},
});

export default Welcome;
