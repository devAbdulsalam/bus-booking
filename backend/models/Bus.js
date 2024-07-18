import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
	name: { type: String, required: true },
	seatCapacity: { type: Number, required: true, default: 62 },
	seatsFilled: { type: Number, default: 0 },
	trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
});

const Bus = mongoose.model('Bus', busSchema);
export default Bus;
