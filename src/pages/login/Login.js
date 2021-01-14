import { useState } from 'react';
import axios from 'axios';
import './Login.scss';

function Login() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		console.log(`user : ${email}, ${password} `)
		axios.post('https://scapa-backend-develop.herokuapp.com/admin/auth/sign_in', { email, password })
			.then(response => console.log('res', response))
			.then(error => console.log('res', error))
	}

	return (
		<div className="p-login backgroundImageLogin vh-100 w-100 d-flex justify-content-center align-items-center">
			<div className="card shadow mw-">
				<div className="card-body">
					<h3 className="card-title text-center">Iniciar sesión</h3>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label className="form-label">Email:</label>
							<input type="email" name="email" className="form-control" onChange={ e => setEmail(e.target.value) } />
						</div>
						<div className="mb-3">
							<label className="form-label">Contraseña:</label>
							<input type="password" className="form-control" onChange={ e => setPassword(e.target.value) }/>
						</div>
						<button type="submit" className="btn btn-primary">Ingresar</button>
					</form>					
				</div>
			</div>
		</div>
	);
}

export default Login;
