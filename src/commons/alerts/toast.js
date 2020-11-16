import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export const notify_email_or_password_err = () => {
  toast.error('Email or password are invalid', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000})
}

export const notify_user_created_succ = () => {
  toast.success('The user was successfully created, please verify your email', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000})
}

export const notify_user_created_err = () => {
toast.error('User or Email was already in use', {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 2000})
}

export const notify_user_update_succ= () => {
  toast.success('The info user was successfully updated', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000})
}

export const notify_user_update_err= () => {
  toast.error('Please verify the input ', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000})
}

export const notify_user_update_invalidPass= () => {
  toast.error('The password was invalid', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000})
}

export const notify_player_choose_err= () => {
  toast.error('Please choose a valid player ', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000})
}

export const notify_player_vote_success= () => {
  toast.success('Your vote has been sent', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000})
}

export const notify_player_vote_err= () => {
  toast.error('You already voted! ', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000})
}

export const notify_gameName_invalid = () => {
  toast.error('The GameName is invalid', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000})
}

export const notify_email_verify = () => {
  toast.success('Your account has been verify', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000})
}

export const notify_verify_your_email = () => {
  toast.error('Your account need to be verify', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000})
}

export const notify_missing_fields = () => {
  toast.error('You need to type in the fields', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000})
}