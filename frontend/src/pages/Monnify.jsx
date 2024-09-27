import React, { useEffect, useState } from 'react';
import {
	useMonnifyPayment,
	MonnifyButton,
	MonnifyConsumer,
} from 'react-monnify';

const App = () => {
	// Define the necessary states
	const [customerFullName, setCustomerFullName] = useState('John Doe');
	const [customerEmail, setCustomerEmail] = useState('johndoe@example.com');
	const [customerMobileNumber, setCustomerMobileNumber] =
		useState('08012345678');
	const [amount, setAmount] = useState(5000); // Example amount
	const [apiKey, setApiKey] = useState('YOUR_API_KEY'); // Use your actual API key here
	const [contractCode, setContractCode] = useState('YOUR_CONTRACT_CODE'); // Your contract code
	const [reference, setReference] = useState('TRANS_' + new Date().getTime()); // Unique transaction reference

	useEffect(() => {
		if (data) {
			setAmount(data.amount);
			setContractCode(data?.contractCode);
			setCustomerEmail(data?.customerEmail);
			setCustomerFullName(data?.name);
			setCustomerMobileNumber(data?.name);
		}
	});
	// Callback for when payment is completed
	const onComplete = (response) => {
		console.log('Payment successful:', response);
	};

	// Callback for when payment is closed or cancelled
	const close = (response) => {
		console.log('Payment closed:', response);
	};

	// Monnify component props for MonnifyButton and MonnifyConsumer
	const componentProps = {
		customerFullName,
		customerEmail,
		customerMobileNumber,
		amount,
		apiKey,
		contractCode,
		reference,
		onComplete,
		close,
		embed: true, // Embed the payment within the app
		disabled: false, // Make payment button clickable
		tag: 'button', // Can be button or other tags
	};

	return (
		<div>
			{/* Monnify Payment Button using MonnifyButton */}
			<div>
				<MonnifyButton
					text="Make Payment"
					className="payButton"
					{...componentProps}
				/>
			</div>

			{/* Monnify Payment Button using MonnifyConsumer */}
			<div>
				<MonnifyConsumer {...componentProps}>
					{({ initializePayment }) => (
						<button className="btn" onClick={() => initializePayment()}>
							Pay Now
						</button>
					)}
				</MonnifyConsumer>
			</div>
		</div>
	);
};

export default App;
