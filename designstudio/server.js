import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import session from 'express-session';
import userModel from './models/userModel.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import categoryRoutes from "./routes/categoryRoute.js";
import designcategoryRoutes  from "./routes/designcategoryRoute.js"
import productRoutes from "./routes/productRoute.js";
import designRoutes from "./routes/designRoute.js"
import imageRoutes from "./routes/imageRoute.js"
import staffRoutes from './routes/staffRoute.js'
import bothRoutes from "./routes/bothRoute.js"
//import Payment from     "./routes/payment.js";
import designcategoryModel from './models/designcategoryModel.js';
import designsubcategoryModel from './models/designsubcategoryModel.js';
import Design from "./models/designModel.js"


const app = express();

app.use(
  session({
    secret: 'qwerty!@@@@####HHG',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/auth', authRoutes ,staffRoutes);
app.use('/api/v1/staff', staffRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/categorydesign", designcategoryRoutes)
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/design", designRoutes);
app.use("/api/v1/image", imageRoutes);

app.use("/api/v1/both", bothRoutes);
//app.use("/api/v1/payment", Payment);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to MERN stack project</h1>');
});

app.get('/users', async (req, res) => {
  try {
    const users = await userModel.find({ role: '0' });

    console.log('Filtered Users:', users); 

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sahidsiddik0977@gmail.com', // Replace with your Gmail email address
    pass: 'uhjr osxb cskd szzi', // Replace with your Gmail password
  },
});

// Function to send an email
function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    const mail_configs = {
      from: 'Design_Studio',
      to: recipient_email,
      subject: 'Design_Studio',
      text: `The code to create a new password for the design website is ${OTP}`,
    };
    transporter.sendMail(mail_configs, (error, info) => {
      if (error) {
        console.log(error);
        return reject({ message: 'An error has occurred' });
      }
      return resolve({ message: 'Email sent successfully' });
    });
  });
}

app.post('/send_recovery_email', (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.post('/update-password', async (req, res) => {
  const { newPassword } = req.body;

  // Fetch and update the user's password (assuming you have a user model)
  try {
    const user = await userModel.findOne({ /* specify your query criteria here */ });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's password by hashing it
    const saltRounds = 10; // Adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.put('/users/:userId/activate', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle the user's "active" status
    user.active = !user.active;
    await user.save();

    res.json({ message: 'User activation status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Define endpoint to handle fetching subcategories based on clicked category
app.get('/api/subcategories/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Find subcategories associated with the category
    const subcategories = await Subcategory.find({ parentCategorydesign: categoryId });

    res.json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




//----------Appoinment section----------//
// API endpoint to get available slots for the next 5 days
app.get('/api/slots', async (req, res) => {
  const currentDate = new Date();
  const nextFiveDays = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
  const availableSlots = await Appointment.find({ date: { $gte: currentDate, $lt: nextFiveDays } });
  res.json(availableSlots);
});

// API endpoint to book an appointment
app.post('/api/book', async (req, res) => {
  const { date, slot } = req.body;
  const userId = req.user.id; 
  try {
    const appointment = new appointment({ date, slot,  userId });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//----------------------------------------------------------//

// ...

// Endpoint to get designs by category
app.get('/api/v1/design/by-category/:categoryId', async (req, res) => {
  try {
    const designs = await Design.find({ category: req.params.categoryId });
    res.json({ success: true, designs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Endpoint to get designs by subcategory
app.get('/api/v1/design/by-subcategory/:subcategoryId', async (req, res) => {
  try {
    const designs = await Design.find({ subcategory: req.params.subcategoryId });
    res.json({ success: true, designs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


dotenv.config();
connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan);
});
