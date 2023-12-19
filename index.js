const express = require('express')
const productRoutes = require('./product.routes')
const { logRequest } = require('./middleware')
const { errorResponder } = require('./error.middleware')

const app = express()
app.use(express.json())
const PORT = 3000

app.use(logRequest)
app.use(productRoutes)
app.use(errorResponder)

app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`)
})
