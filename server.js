import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/database.js'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import routes from './src/routes/routes.js';
import cors from 'cors'

// Load environment variables from .env file
dotenv.config()

// Create Express app
const app = express()
// Use the cors() middleware to enable CORS support
app.use(cors())

// Set the port and hostname for the server
const port = process.env.PORT || 3000
const hostname = process.env.HOST || 'localhost'

/**
 * Use Morgan for HTTP request and response logging
 * In a production environment, "combined" or "common" might be more suitable for comprehensive logging while serving requests.
 **/
app.use(morgan(process.env.LOGGING_FORMAT || 'dev'))

// Set view engine to 'ejs'
app.set('view engine', 'ejs')

// Set view path
app.set('views', './src/views')

// Import MongoDB connection and establish the database connection
connectDB()

// Middleware to handle JSON data only for a specific route
app.use(bodyParser.json())
// Set up middleware to parse incoming JSON and urlencoded data
app.use(express.urlencoded({ extended: false }))

// Use the routes
app.use('/', routes);

/**
 * Define application routes
 */
// configureRoutes(app)

app.use('/public', express.static('public'))

// Start the server and listen on the specified port and hostname
app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`)
})
