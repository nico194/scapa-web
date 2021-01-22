import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn } from '../../redux/actions/users'
import Card from '../../components/molecules/card/Card'
import Input from '../../components/atoms/input/Input'
import './Login.scss';
import Spinner from '../../components/atoms/spinner/Spinner';

function Login({ history }) {

	const dispatch = useDispatch();
	const { loading, login } = useSelector( state => state.users);

	const [ email, setEmail ] = useState('');
	const [ password, setPassword] = useState('');

	useEffect(() => {
		
	})

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(signIn({email, password}))
	}

	return (
		<div className='p-login vh-100 w-100 d-flex justify-content-center align-items-center'>
			<Card>
				<h3 className='card-title text-center'>Iniciar sesión</h3>
				<form onSubmit={handleSubmit}>
					<Input label='Email' type='text' placeholer='Ingrese aqui su email...' onChange={ e => setEmail(e.target.value)} />
					<Input label='Contraseña' type='password' placeholer='Ingrese aqui su contraseña...' onChange={ e => setPassword(e.target.value)} />
					<button type='submit' className='btn btn-primary w-100'>
						{
							loading ? 
								<Spinner type='light' />
								:
								<span>Ingresar</span>
						}
					</button>
					{ login && <Redirect to='/categories' /> }
				</form>	
			</Card>
		</div>
	);
}

export default Login;
