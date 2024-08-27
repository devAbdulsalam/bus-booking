import { StyleSheet, Text, SafeAreaView, Pressable } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

type DatePikerProps = {
	date: Date | String;
	setDate: any;
};
export const App = ({ date, setDate }: DatePikerProps) => {
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);

	const onChange = (event: any, selectedDate: any) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(() => currentDate.toLocaleString());
	};

	const showMode = (currentMode: string) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};
	return (
		<SafeAreaView>
			<Pressable onPress={showDatepicker} style={styles.inputButton}>
				{/* <Text>{dayjs(date).format('DD/MM/YYYY')}</Text> */}
				<Text>{date.toLocaleString()}</Text>
			</Pressable>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
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
