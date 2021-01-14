import { useState } from 'react';
import axios from 'axios';
import './Login.scss';

function Login({ history }) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword] = useState('');
	const [ loading, setLoading ] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true)
		console.log(`user : ${email}, ${password} `)
		setTimeout(() => {
			setLoading(false)
			console.log('reslog')
			history.push('/categories');

		}, 2000)
		// axios.post('https://scapa-backend-develop.herokuapp.com/admin/auth/sign_in', { email, password })
		// 	.then(response => {
		// 		setTimeout(() => {
		// 			setLoading(false)
		// 			console.log('res', response)

		// 		}, 2000)
		// 	})
		// 	.then(error => console.log('res', error))
	}

	return (
		<div className='p-login vh-100 w-100 container d-flex justify-content-center align-items-center'>
			<div className='card shadow'>
				<div className='card-body'>
					<h3 className='card-title text-center'>Iniciar sesión</h3>
					<form onSubmit={handleSubmit}>
						<div className='mb-3'>
							<label className='form-label'>Email:</label>
							<input type='email' name='email' className='form-control' onChange={ e => setEmail(e.target.value) } />
						</div>
						<div className='mb-3'>
							<label className='form-label'>Contraseña:</label>
							<input type='password' className='form-control' onChange={ e => setPassword(e.target.value) }/>
						</div>
                        <button type='submit' className='btn btn-primary w-100'>
							{
								loading ? 
									<>
										<div className='spinner-border text-light' role='status'>
											<span className='visually-hidden'>Loading...</span>
										</div>
									</>
									:
									<span>Ingresar</span>

							}
						</button>
					</form>					
				</div>
			</div>
		</div>
	);
}

export default Login;
