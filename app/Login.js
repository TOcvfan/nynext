import React, { useEffect, useState } from 'react';
import { authenticationService } from '../../services/authentication.service';
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Password from '../../components/PasswordField';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Text from '../../components/InputTextField';
import CustomizedButtons from '../../components/Button';
import Modal from '../../components/modal';
import { Box, Chip } from '@mui/material';
import { checkServer } from '../../services';
import Title from '../../components/title';

const schema = Yup.object().shape({
	email: Yup.string().required('hvad med din email???'),
	password: Yup.string().required('Du skal bruge password for at logge ind')
})

const defaultValues = {
	email: '',
	password: ''
}

export default function Login({ open, handleOpen, lan }) {
	const sprog = lan === 'Dk'
	const [message, setMessage] = useState('')
	const [error, setError] = useState(false)
	const [isLoading, setIsLoading] = useState(false);
	const [login, setlogin] = useState(false);
	const [status, setStatus] = useState('');
	const navigate = useNavigate();


	const { handleSubmit, formState: { errors }, control } = useForm({
		defaultValues,
		resolver: yupResolver(schema)
	});

	useEffect(() => {
		let cancel = false;
		checkServer(setMessage, setError)
		return () => {
			cancel = true;
		}

	}, [])

	const errormessage = sprog ? 'Beklager men serveren er nede, prøv igen senere ellers kontakt mig på ' : 'Sorry but the server is down, try again later otherwise contact me on ';
	const contactMail = <a href="mailto:christian@hammervig.dk">christian@hammervig.dk</a>
	const serverError = <Box sx={{ textAlign: 'center', textShadow: '-1px 0px 0px black' }}><Title font='Chango' color='#e1c043' size={10}>{errormessage}{contactMail}</Title></Box>;

	const onSubmit = (data) => {
		let cancel = false
		setIsLoading(true)

		authenticationService.login(data, setStatus, setlogin)
			.then(
				() => {
					if (cancel) return
					status === 'email' ? setStatus('forkert email') : setStatus('forkert password');
					setIsLoading(false);
					if (login) { navigate("profil") }
				}).catch(error => {
					console.log(status)
					//setSubmitted(false);
					//setFejl(true)
				});
		return () => {
			cancel = true;
		}
	}

	const logIndFormular = <Modal titel='Login' open={open} handleOpen={handleOpen} >
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
		}}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb3">
					<Chip label='Email' color='info' />
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, onBlur, value, ref } }) =>
							<Text
								label="E-mail"
								errors={errors.email}
								onChange={onChange}
								onBlur={onBlur}
								selected={value}
								icon={<EmailOutlinedIcon />}
							/>
						}
						rules={{ required: true }}
						type="email"
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				{errors && errors.email?.message}
				<div className="mb4">
					<Chip label='Password' color='info' />
					<Controller
						id='password'
						control={control}
						name="password"
						render={({ field: { onChange, onBlur, value, ref } }) =>
							<Password
								id="password"
								placeholder='Password'
								errors={errors.password}
								onChange={onChange}
								onBlur={onBlur}
								selected={value}
							/>
						}
						rules={{
							required: true
						}}

						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				{errors && errors.password?.message}
				<div className="tc">
					<CustomizedButtons type="submit" label="Log ind" disabled={isLoading} />
					{isLoading && <div className="loader">
						<div className="outer"></div>
						<div className="middle"></div>
						<div className="inner"></div>
					</div>
					}
				</div>
				{<label>{status}</label>}
			</form>
		</Box>
	</Modal>




	const Visning = () => error ? serverError : logIndFormular;

	return (
		<div className="">
			<CustomizedButtons type='button' onClick={handleOpen} label='Login' />
			<Visning />
		</div>
	);
}