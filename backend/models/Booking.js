import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
	from: { type: String, required: true },
	to: { type: String, required: true },
	tripTime: {
		type: Date,
		required: true,
		default: Date.now, // Set to current date by default
	},
	date: {
		type: Date,
		required: true,
		index: true,
		default: Date.now, // Set to current date by default
	},
	price: { type: Number, required: true },
	seat: { type: Number, required: true },
	status: {
		type: String,
		enum: ['PENDING', 'CANCELLED', 'CONFIRMED', 'COMPLETED'],
		default: 'PENDING',
	},
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
