import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifyGreen = (message: string) => toast.success(message, {
	position: 'top-center',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'colored',
});

export const notifyRed = (message: string) => toast.error(message, {
	position: 'top-center',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'colored',
});

export const notifyYellow = (message: string) => toast.warning(message, {
	position: 'top-center',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'colored',
});
