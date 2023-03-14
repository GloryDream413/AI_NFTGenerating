const express = require('express')
const app = express()
const port = 8081
const cors = require('cors')
const axios = require('axios')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  console.log('hello world endpoint hit')
  return res.status(200).send({
    data: 'hello world'
  })
})

app.get('/getcountry', (req, res) => {
  console.log('getting one country endpoint got a hit')
  return res.status(200).send('CountryList Return')
})

async function getPredictionStatus (id) {
  const response = await axios.get(
    'https://api.replicate.com/v1/predictions/' + id,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token 57b5717e8632693a79f0747038512564a640764c`
      }
    }
  )
  const prediction = response.data
  return prediction
}

async function createPrediction (text) {
  const response = await axios.post(
    'https://api.replicate.com/v1/predictions',
    {
      version:
        '436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b',
      input: { prompt: 'nft style' + text }
    },
    {
      headers: {
        Authorization: `Token 57b5717e8632693a79f0747038512564a640764c`,
        'Content-Type': 'application/json'
      }
    }
  )
  const prediction = response.data
  return prediction
}

app.post('/getImage', async (req, res) => {
  let prompt = req.body.input
  const prediction = await createPrediction(prompt)
  let response = null
  let nCount = 0
  const sleep = ms => new Promise(r => setTimeout(r, ms))

  while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
    await sleep(1000)
    nCount++
    if (nCount >= 60) {
      break
    }
    response = await getPredictionStatus(prediction.id)
    if (response.err || response.output) {
      break
    }
  }

  if (response.output) {
    return res.status(201).send({ response: response })
  } else {
    return res.status(201).send({ response: 'fail' })
  }
})

app.listen(port, () => {
  console.log(`connected on port ${port}`)
})

module.exports = app
