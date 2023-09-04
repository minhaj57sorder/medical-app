import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import doctorRouter from './routes/doctorRoutes.js'
import appointmentRoute from './routes/appointmentRoutes.js'
import userRouter from './routes/userRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

connectDB()
dotenv.config()

const app = express()

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5004

app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// This routes is example route to allaw react getting data from same origin
// This res.set route will remove Access-Control-Allow-OriginAccess
// to fetch at 'http://localhost:8080/' from origin 'http://localhost:3000'
// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is
// present on the requested resource. If an opaque response serves your needs,
// set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send({ "msg": "This has CORS enabled 🎈" })
})

// User router
app.use('/api/users', userRouter)

// Doctor router fetch doctors
app.use('/api/doctors', doctorRouter)

// Appointment router fetch appointments
app.use('/api/appointment', appointmentRoute)

// Upload router
app.use('/api/upload', uploadRouter)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Custom error handler
app.use(errorHandler)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}else{
    // hands up routes
    app.get('/', (req, res) => {
        res.send('Api is running now')
    })
}

app.use(notFound)

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`))