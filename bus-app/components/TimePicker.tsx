// const [date, setDate] = useState(new Date(1598051730000));

import { StyleSheet, Text, SafeAreaView, Pressable } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

type DatePikerProps = {
	time: Date;
	setTime: any;
};
export const App = ({ time, setTime }: DatePikerProps) => {
	const [mode, setMode] = useState('time');
	const [show, setShow] = useState(false);

	const onChange = (event: any, selectedDate: any) => {
		const currentDate = selectedDate;
		setShow(false);
		setTime(currentDate.toLocaleString());
	};

	const showMode = (currentMode: string) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('time');
	};
	return (
		<SafeAreaView>
			<Pressable onPress={showDatepicker} style={styles.inputButton}>
				<Text>{time.toDateString()}</Text>
			</Pressable>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={time}
					mode={mode}
					// is24Hour={true}
					onChange={onChange}
				/>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	inputButton: {
		padding: 10,
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 4,
	},
});

export default App;
