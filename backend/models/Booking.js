import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	from: { type: String, required: true },
	to: { type: String, required: true },
	tripTime: { type: Date, required: true, index: true },
	date: { type: Date, required: true, index: true },
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
