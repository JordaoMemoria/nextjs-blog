import { FormEvent, useState, useEffect } from 'react'
import classes from './contact-form.module.css'
import Notification from '../ui/notification'

interface TNotification {
	status: string
	title: string
	message: string
}

const sendContactData = async (
	name: string,
	email: string,
	message: string
) => {
	const response = await fetch('/api/contact', {
		method: 'POST',
		body: JSON.stringify({
			name,
			email,
			message,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const data = await response.json()
	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong!')
	}
}

export default function ContactForm() {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [message, setMessage] = useState('')
	const [status, setStatus] = useState('') // pending, success, error
	const [errorMessage, setErrorMessage] = useState('')

	const clear = () => {
		setMessage('')
		setName('')
		setEmail('')
	}

	const sendMessageHandler = async (event: FormEvent) => {
		event.preventDefault()

		setStatus('pending')
		try {
			await sendContactData(name, email, message)
			setStatus('success')
			clear()
		} catch (error) {
			setStatus('error')
			if (error instanceof Error) {
				setErrorMessage(error.message)
			}
		}
	}

	let notification: TNotification | null = null
	if (status === 'pending') {
		notification = {
			status: 'pending',
			title: 'Sending message...',
			message: 'Your message is on its way!',
		}
	} else if (status === 'success') {
		notification = {
			status: 'success',
			title: 'Success!',
			message: 'Message sent successfully!!!!!!',
		}
	} else if (status === 'error') {
		notification = {
			status: 'error',
			title: 'Error!',
			message: errorMessage,
		}
	}

	const loadNotification = () => {
		if (notification) {
			const { status, title, message } = notification
			return <Notification status={status} title={title} message={message} />
		}
	}

	useEffect(() => {
		if (status === 'success' || status === 'error') {
			const timer = setTimeout(() => {
				setStatus('')
				setErrorMessage('')
			}, 3000)
			return () => {
				clearTimeout(timer)
			}
		}
	}, [status])

	return (
		<section className={classes.contact}>
			<h1>How can I help you?</h1>
			<form className={classes.form} onSubmit={sendMessageHandler}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor='email'>Your email</label>
						<input
							type='email'
							id='email'
							required
							value={email}
							onChange={event => setEmail(event.target.value)}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor='name'>Your Name</label>
						<input
							type='text'
							id='name'
							required
							value={name}
							onChange={event => setName(event.target.value)}
						/>
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor='message'>Your Message</label>
					<textarea
						id='message'
						rows={5}
						value={message}
						onChange={event => setMessage(event.target.value)}
					/>
				</div>
				<div className={classes.actions}>
					<button>Send Message</button>
				</div>
			</form>
			{loadNotification()}
		</section>
	)
}
