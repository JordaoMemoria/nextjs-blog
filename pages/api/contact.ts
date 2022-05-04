import { MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { email, name, message } = req.body

		if (
			!email ||
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!message ||
			message.trim() === ''
		) {
			res.status(422).json({ message: 'Invalid input.' })
			return
		}

		// Store it in a database

		interface DynamicObject {
			[key: string]: any
		}
		const newMessage: DynamicObject = {
			email,
			name,
			message,
		}

		const user = process.env.mongodb_username
		const pass = process.env.mongodb_password
		const cluster = process.env.mongodb_cluster_name
		const database = process.env.mongodb_database

		const connectionString = `mongodb+srv://${user}:${pass}@${cluster}.7anjc.mongodb.net/${database}?retryWrites=true&w=majority`

		let client
		try {
			client = await MongoClient.connect(connectionString)
		} catch (error) {
			res.status(500).json({ message: 'Could not connect to database.' })
			return
		}

		const db = client.db()
		try {
			const result = await db.collection('messages').insertOne(newMessage)
			newMessage.id = result.insertedId
		} catch (error) {
			client.close()
			res.status(500).json({ message: 'Storing message failed!' })
			return
		}
		client.close()
		res
			.status(201)
			.json({ message: 'Successfully stored message!', data: newMessage })
	}
}
