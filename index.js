import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
const port = 5501

dotenv.config()

const configuration = new Configuration({
	apiKey: `${process.env.API_KEY}`,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors({
	origin: "*"
}))
app.use(express.json())

app.get('/', async (req, res) => {
	res.status(200).send({
		message: 'Hello World ;)'
	})
})

app.post('/chatgpt', async (req, res) => {
	try {
		const response = await openai.createCompletion({
			model: `${req.body.model}`,
			prompt: `${req.body.prompt}`,
			temperature: 0,
			max_tokens: 3000,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0,
		});

		res.status(200).send({
			bot: response.data.choices[0].text
		});

	} catch (error) {
		console.error(error)
		res.status(500).send(error || 'Something went wrong');
	}
})

app.listen(port, () => {
	console.log(`AI app listening on port ${port}`)
})