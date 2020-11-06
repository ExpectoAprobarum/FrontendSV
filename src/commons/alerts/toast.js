import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export const notify_email_or_password_err = () => {
    toast.error('Email or password are invalid', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000})
}

export const notify_user_created_succ = () => {
    toast.success('The user was successfully created', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000})
}

export const notify_user_created_err = () => {
    toast.error('User or Email was already in use', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000})
}