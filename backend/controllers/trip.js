import Trip from '../models/Trip.js';
import Bus from '../models/Bus.js';

export const createTrip = async (req, res) => {
	const { from, to, price, tripTime, date, busId } = req.body;
	try {
		const bus = await Bus.findById(busId);
		if (!bus) {
			return res.status(400).json({ message: 'bus not found' });
		}

		// Convert the date and tripTime to a proper Date object
		const [day, month, year] = date.split('/');
		const [hours, minutes] = tripTime.split(':');
		const tripDateTime = new Date(year, month - 1, day, hours, minutes);

		const trip = new Trip({
			from,
			to,
			tripTime: tripDateTime,
			date: tripDateTime,
			bus: busId,
			price,
		});
		bus.trips.push(trip._id);
		await bus.save();
		await trip.save();

		res.status(201).json({ message: 'Trips created successfully' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
export const createTrips = async (req, res) => {
	const schedules = [
		{ from: 'University', to: 'Kano', departureTime: '13:00' },
		{ from: 'University', to: 'Kano', departureTime: '16:00' },
		{ from: 'Kano', to: 'University', departureTime: '07:00' },
	];

	const { from, to, date } = req.body;
	try {
		const buses = await Bus.find();
		if (!buses.length)
			return res.status(400).json({ message: 'No buses available' });

		const tripPromises = schedules.map((schedule) => {
			return buses.map((bus) => {
				const departureTime = new Date();
				const [hours, minutes] = schedule.departureTime.split(':');
				departureTime.setHours(hours, minutes, 0, 0);

				const trip = new Trip({
					...schedule,
					departureTime,
					bus: bus._id,
				});

				bus.trips.push(trip._id);
				return trip.save();
			});
		});

		await Promise.all(tripPromises.flat());
		await Promise.all(buses.map((bus) => bus.save()));

		res.status(201).json({ message: 'Trips created successfully' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const getTrips = async (req, res) => {
	try {
		const trips = await Trip.find().populate('bus');
		res.status(200).json({ trips });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
export const getTrip = async (req, res) => {
	try {
		const trip = await Trip.findById(req.params.id).populate('bus');
		res.status(200).json(trip);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
