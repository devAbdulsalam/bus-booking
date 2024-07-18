import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
	from: { type: String, required: true },
	to: { type: String, required: true },
	tripTime: { type: Date, required: true, index: true },
	date: { type: Date, required: true, index: true },
	price: { type: Number, required: true },
	bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
});

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
