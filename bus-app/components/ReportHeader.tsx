// Header.js

import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import {
	responsiveFontSize,
	colors,
	responsiveHeight,
	responsiveWidth,
} from '../AppStyles';

type headerProps = {
	title: string;
	backButtonHandler: () => void;
	newButtonHandler: () => void;
};

const Header = ({
	title,
	backButtonHandler,
	newButtonHandler,
}: headerProps) => {
	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={backButtonHandler} style={styles.iconButton}>
				<MaterialIcons
					name="keyboard-arrow-left"
					size={responsiveFontSize(30)}
					color={colors.Black}
				/>
			</TouchableOpacity>
			<Text style={styles.headerTitle}>{title}</Text>
			<TouchableOpacity onPress={newButtonHandler} style={styles.rightButton}>
				<Entypo
					name="plus"
					size={responsiveFontSize(30)}
					color={colors.Black}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		marginHorizontal: responsiveWidth(12),
		marginVertical: responsiveHeight(10),
		flexDirection: 'row',
		justifyContent: 'center',
	},
	headerTitle: {
		// fontFamily: 'Cairo-SemiBold',
		fontSize: responsiveFontSize(20),
		color: colors.BlueI,
	},
	iconButton: {
		position: 'absolute',
		left: responsiveWidth(0),
	},
	rightButton: {
		position: 'absolute',
		right: responsiveWidth(2),
		padding: 2,
	},
});

export default memo(Header);