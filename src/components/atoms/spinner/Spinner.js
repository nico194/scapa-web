import { CircularProgress } from '@mui/material'

export const Spinner = ({ type = 'dark' }) => {
	return <CircularProgress color={type} />
}
