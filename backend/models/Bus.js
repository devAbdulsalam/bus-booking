import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
	name: { type: String, required: true },
	seatCapacity: { type: Number, required: true, default: 62 },
	seatsFilled: { type: Number, default: 0 },
	price: { type: Number, default: 0 },
});

const Bus = mongoose.model('Bus', busSchema);
export default Bus;
