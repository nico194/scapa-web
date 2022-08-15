import { Typography } from '@mui/material'
import React from 'react'
import { Card } from '../../molecules/card/Card'

export const Pictogram = ({ img, description, styles, onClick = () => {} }) => {
	return (
		<Card
			image={img}
			stylesImage={{ width: '100px', margin: '0 auto' }}
			content={<Typography variant='h6'>{description}</Typography>}
			onClick={onClick}
			stylesCard={styles}
		/>
	)
}
