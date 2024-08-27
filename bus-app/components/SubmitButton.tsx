import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, colors } from '../AppStyles';

type buttonProps = {
	buttonText: string;
	onPress: () => void;
	isLoading?: boolean;
	color?: string;
	disabled?: boolean;
};
const Button = ({
	onPress,
	buttonText,
	isLoading = false,
	color = 'default',
	disabled = false,
}: buttonProps) => (
	<TouchableOpacity
		onPress={onPress}
		disabled={disabled || isLoading}
		activeOpacity={0.8}
	>
		<LinearGradient
			colors={
				// color === "default"
				//   ? [colors.BlueI, colors.BlueII]
				//   : [colors.White, colors.White]
				//   color: disabled ? colors.GreyII : colors.BlueI,
				color === 'default' && !disabled
					? [colors.Green, colors.LightSeaGreen]
					: disabled
					? [colors.GreyII, colors.GreyII]
					: [colors.White, colors.White]
			}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
			style={[
				styles.gradientButton,
				{
					borderColor: color === 'default' ? null : colors.Green,
					borderWidth: color === 'default' ? null : 1,
				},
			]}
		>
			<Text
				style={[
					styles.buttonText,
					{ color: color === 'default' ? colors.White : colors.Green },
				]}
			>
				{buttonText}
			</Text>
			{isLoading && <ActivityIndicator animating={isLoading} />}
		</LinearGradient>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	gradientButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: responsiveHeight(14),
		shadowColor: colors.Black,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		overflow: 'hidden',
		marginVertical: 5,
		borderRadius: 10,
	},
	buttonText: {
		color: colors.White,
		fontSize: responsiveFontSize(16),
		textAlign: 'center',
	},
});

export default Button;
