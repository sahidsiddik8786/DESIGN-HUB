import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';


export const registerContoller = async (req, res) => {
    try {
        console.log("Received registration request #########");
        const { name, email, password, phone, address,answer } = req.body;
        //validation
        if (!name) {
            return res.send({ error: 'Name is Required' })
        }

        if (!email) {
            return res.send({ message: 'email is Required' })
        }

        if (!password) {
            return res.send({ message: 'Phone is Required' })
        }
        if (!phone) {
            return res.send({ message: 'email is Required' })
        }

        if (!address) {
            return res.send({ message: 'address is Required' })
        }

        if (!answer) {
            return res.send({ error: 'Answer is Required' })
        }


        //check User
        const exsistingUser = await userModel.findOne({ email: email })
        //Exsisting user ?
        if (exsistingUser) {
            return res.status(200).send({
                success: false,
                message: 'Alredy Registerd , please login',
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        if (!hashedPassword) {
            return res.status(500).send({
                success: false,
                message: 'Error in hashing password',
            });
        }

        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword,answer }).save()

        res.status(201).send({
            success: true,
            message: 'user Registration Successful',
            user,

        });
    } catch (error) {
        console.error("Error in registration: ########", error);
        console.log(error)
        res.status(500).send({
            success: false,
            messsage: 'Error in Registration',
            error
        })

    }
};

//export default { registerContoller };

//POST - LOGIN----------------------------------------------------------------

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                sucsess: false,
                message: "Email is not registerd"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "invalid password"
            })
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).send({
            success: true,
            message: "login sucessfull",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.email,
                address: user.address,
                role: user.role,
            },
            token,
        });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
};

//--------------------------------------------------------------------forgot password

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Emai is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "Enter New Password" });
        }
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

//test Controller
export const testController = (req, res) => {
    //console.log('Protected Route')   //(terminnnnal)
    res.send('protected Route ');  //(response in post man)
}
//--------------------------------------------------------------------------------profile update

export const updateProfileController = async (req, res) => {
    try {

            const { name, password, address, phone } = req.body;
            const user = await userModel.findById(req.user._id);
        
            console.log("Request Body:", req.body); // Debugging log
            console.log("Found User:", user); // Debugging log
        
            if (!user) {
              return res.status(404).send({
                success: false,
                message: "User not found",
              });
            }
        
            // Validate incoming data
            if (name && typeof name !== 'string') {
              return res.status(400).json({
                success: false,
                message: 'Invalid name format',
              });
            }
        
            if (password && typeof password !== 'string') {
              return res.status(400).json({
                success: false,
                message: 'Invalid password format',
              });
            }
        
            if (address && typeof address !== 'string') {
              return res.status(400).json({
                success: false,
                message: 'Invalid address format',
              });
            }
        
            // Validate phone format (e.g., allow only digits, optional dashes, and parentheses)
            if (phone && !/^\d{10}$/.test(phone)) {
              return res.status(400).json({
                success: false,
                message: 'Invalid phone number format',
              });
            }
        
            // Update user properties with the new values
            user.name = name || user.name;
            user.password = password ? await hashPassword(password) : user.password;
            user.address = address || user.address;
            user.phone = phone || user.phone;
        
            const updatedUser = await user.save();
            // console.log("Updated User:", updatedUser); // Debugging log
        
            res.status(200).send({
              success: true,
              message: "Profile Updated Successfully",
              updatedUser,
            });
          } catch (error) {
            console.error("Error:", error); // Debugging log
            res.status(400).send({
              success: false,
              message: "Error While Updating Profile",
              error: error.message, // Include the error message for better debugging
            });
          }
        };
        