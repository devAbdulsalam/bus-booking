/* eslint-disable react/prop-types */
import moment from 'moment';
import Modal from './Modal';
import { HiXMark } from 'react-icons/hi2';

const PaymentModal = ({ show, setShow, loading, data, handleBookTrip }) => {
    console.log(data);

	return (
		<Modal show={show}>
			<div className="transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all font-josefin min-w-[450px] max-w-2xl">
				<div className="space-y-3 p-4">
					<div className="flex justify-between">
						<div>
							<h2 className="font-semibold text-lg text-primary">
								Confirm Trip
							</h2>
						</div>
						<button
							onClick={() => setShow(false)}
							className="m-1 p-1 py-1 shadow rounded-full bg-red-200 hover:bg-red-300 duration-150 ease-in-out"
						>
							<HiXMark className="fa-solid fa-xmark text-xl text-red-600 hover:text-red-800" />
						</button>
					</div>

					<div className="p-2 ">
						<h2 className="font-semibold text-lg text-primary mb-2">
							Are you sure?
						</h2>
						<div>
							<div className="flex justify-between items-center">
								<p>From: {data?.from}</p>
								<p>To: {data?.to}</p>
							</div>
							<div className="flex justify-between items-center">
								<p>Booked Seat(s): {data?.seat}</p>
							<p>Price: {data?.price}</p>
							</div>
								<p>Date: {moment(data?.date).format('MMM Do')}</p>
						</div>
						<p className="font-bold">
							Total Price: {Number(data?.seat) * Number(data?.price)}
						</p>
					</div>
					<button
						disabled={loading}
						className="bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 py-1 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
						onClick={handleBookTrip}
					>
						<span>Confirm Booking</span>
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default PaymentModal;
