import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	wallet: { type: Number, required: true, default: 100 },
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	phone: { type: String, required: true },
	regId: { type: String, required: true },
	rank: { type: String, required: true },
	password: { type: String, required: true },
	role: {
		type: String,
		enum: ['USER', 'ADMIN', 'SUPER_ADMIN'],
		default: 'USER',
	},
});

const User = mongoose.model('User', userSchema);
export default User;
