import Header from '../../components/organims/header/Header';

export default function Pictograms() {
    return (
        <div>
            <Header />
            <div className='container'>
                <h1 className= 'mb-4'>Pictogramas</h1>
                <div className='w-100 d-flex justify-content-end'>
                    <button className='btn btn-primary mb-4'>Agregar Pictograma</button>
                </div>
                <table class='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>First</th>
                            <th scope='col'>Last</th>
                            <th scope='col'>Handle</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row'>1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td style={{display:'flex', justifyContent:'space-around'}}>
                                <i class='bi bi-pencil-square'></i>
                                <i class='bi bi-trash-fill ml-2'></i>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'>2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td style={{display:'flex', justifyContent:'space-around'}}>
                                <i class='bi bi-pencil-square'></i>
                                <i class='bi bi-trash-fill ml-2'></i>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'>3</th>
                            <td colspan='2'>Larry the Bird</td>
                            <td>@twitter</td>
                            <td style={{display:'flex', justifyContent:'space-around'}}>
                                <i class='bi bi-pencil-square'></i>
                                <i class='bi bi-trash-fill ml-2'></i>
                            </td>
                        </tr>
                    </tbody>
                </table>                
            </div>
        </div>
    )
}
