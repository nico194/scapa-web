import { Card as CardUI, CardActions, CardContent, CardMedia } from '@mui/material'
export const Card = ({ image, content, actions, stylesCard, stylesImage, onClick }) => {
	return (
		<CardUI sx={stylesCard} elevation={6} onClick={onClick}>
      { image && <CardMedia component='img' src={image} sx={stylesImage} /> }
      <CardContent>
        {content}
      </CardContent>
      <CardActions>
        {actions}
      </CardActions>
		</CardUI>
	)
}
