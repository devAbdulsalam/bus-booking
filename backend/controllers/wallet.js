import User from '../models/User.js';
export const getBalance = async (req, res) => {
	try {
		const wallet = await User.findOne();
		wallet.wallet = 1000;
		await wallet.save();
		res.status(200).json({ wallet });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
