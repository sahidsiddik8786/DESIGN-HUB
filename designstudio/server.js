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
import Payment from     "./routes/payment.js";
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

app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/categorydesign", designcategoryRoutes)
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/design", designRoutes);
app.use("/api/v1/image", imageRoutes);
app.use("/api/v1/payment", Payment);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to MERN stack project</h1>');
});

app.get('/users', async (req, res) => {
  try {
    const users = await userModel.find({ role: '0' });

    console.log('Filtered Users:', users); // Add this line for debugging

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
    pass: 'wwet hllo cnhz fdzh', // Replace with your Gmail password
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



dotenv.config();
connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan);
});
