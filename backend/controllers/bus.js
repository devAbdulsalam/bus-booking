import Bus from '../models/Bus.js';

export const createBus = async (req, res) => {
	const { tripTime, seatCapacity, name, price } = req.body;
	try {
		const bus = new Bus({ name, tripTime, seatCapacity });
		await bus.save();
		res.status(201).json({ message: 'Bus created successfully', bus });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const getBuses = async (req, res) => {
	try {
		const buses = await Bus.findAndUpdate({ price: 500 });

		res.status(200).json(buses);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
export const getBus = async (req, res) => {
	try {
		const busId = req.params.id;
		const bus = await Bus.findById(busId).exec();
		res.status(200).json(bus);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
export const updateBusWithNotification = async (req, res) => {
	const { id } = req.query;
	const { travel_date } = req.body;
	try {
		const result = await Bus.findByIdAndUpdate(id, { travel_date });
		// write a notification model
		// Find bookings with bus id, if any, create a notification for the uniqe users
		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

export const deleteBus = async (req, res) => {
	const { bus_id } = req.body;
	try {
		const result = await Bus.findByIdAndDelete(bus_id).exec();
		res.status(201).json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
