import React from 'react'
import Card from '../../molecules/card/Card'

export default function Pictogram({ width, img, description, onClick = () => {} }) {
    return (
        <div onClick={onClick} className='mb-3' style={{ width: width }}>
            <Card image={img} >
                <h6 className='card-text text-break text-center'>{ description }</h6>
            </Card>
        </div>
    )
}
