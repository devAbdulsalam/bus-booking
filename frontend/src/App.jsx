import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './hooks/ProtectedRoutes';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './NotFound';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import AddBus from './pages/Addbus';
import Bookings from './pages/Bookings';
import BookingInfo from './pages/BookingInfo';
import Payment from './pages/Payment';
// import ConfirmPayment from './pages/ConfirmPayment';
import BookTrip from './pages/BookTrip';
import TripInfo from './pages/TripInfo';
import Trips from './pages/Trips';
import Report from './pages/Report';
import Reports from './pages/Reports';
import ReportInfo from './pages/ReportInfo';
import Users from './pages/Users';
import Monnify from './pages/Monnify';
import DashboardLayout from './pages/DashboardLayout';
function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route element={<ProtectedRoutes />}>
					<Route exact path="/" element={<DashboardLayout />}>
						<Route path="/" element={<Dashboard />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/add-bus" element={<AddBus />} />
						<Route path="/fund" element={<Monnify />} />
						<Route path="/buses" element={<Trips />} />
						<Route path="/bookings" element={<Bookings />} />
						<Route path="/bookings/:id" element={<BookingInfo />} />
						<Route path="/book-trip" element={<BookTrip />} />
						{/* 
						<Route path="/trips/:id/book-trip" element={<BookTrip />} />
						<Route path="/trips/:id/payment" element={<Payment />} /> */}
						{/* <Route
							path="/trips/:id/confirm-payment"
							element={<ConfirmPayment />}
						/> */}
						<Route path="/report" element={<Report />} />
						<Route path="/reports" element={<Reports />} />
						<Route path="/reports/:id" element={<ReportInfo />} />
						<Route path="/users" element={<Users />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
