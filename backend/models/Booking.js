import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
	seat: { type: Number, required: true },
	price: { type: Number, required: true },
	status: {
		type: String,
		enum: ['PENDING', 'CANCELLED', 'CONFIRMED', 'COMPLETED'],
		default: 'PENDING',
	},
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
