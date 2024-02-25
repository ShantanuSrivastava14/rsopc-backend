import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";

export const createUser = async (req, res) => {
    try {
        if(!req.body){
            return res.status(400).json("Values missing");
        }
        const newUser = await userModel.create(req.body);
        if(!newUser){
            return res.status(500).json("Could not create user");
        }
        res.status(201).json(newUser);
    } catch(error){
        console.log(error);
        res.status(500).json(error.message);
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await userModel.find({});
        console.log(users);      
        res.status(200).json(users);
    } catch(error){
        console.log(error);
        return res.status(500).json(error.message);
    }
};

export const updateUser = async (req, res) => {
    try{
        if(!req.params.userId){
            return res.status(400).json("User id missing");
        }
        const existingUser = await userModel.findById(req.params.userId);
        if(!existingUser){
            return res.status(400).json("User id does not exist");
        }
        const updatedUser = await userModel.findByIdAndUpdate(req.params.userId, req.body, {new: true});
        res.status(200).json(updatedUser);
    } catch(error){
        res.status(500).json(error.message);
    }
};

export const deleteUser = async (req, res) => {
    try {
        if(!req.params.userId){
            return res.status(400).json("User id missing");
        }
        const existingUser = await userModel.findById(req.params.userId);
        if(!existingUser){
            return res.status(400).json("User Id does not exist");
        }
        await userModel.findByIdAndDelete(req.params.userId);
        res.status(200).json("User deleted successfully");
    } catch(error){
        res.status(500).json(error.message);
    }
};

export const sendEmail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "work.shasri@gmail.com",
                pass: "ouyc efuw ybtx utqi",
            },
        });
        const userIds = req.body.userIds;

        let emailBody = '<table><tr><th>Name</th><th>Email</th><th>Phone Number</th><th>Hobbies</th></tr>';

        for(const userId of userIds){
            const user = await userModel.findById(userId);
            if(user){
                emailBody += `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.phoneNumber}</td><td>${user.hobbies}</td></tr>`;
            }
        }

        emailBody +='</table>';
        const mailOptions = {
            from: 'work.shasri@gmail.com',
            to: 'info@redpositive.in',
            subject: 'User Data',
            html: emailBody,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              res.status(500).json('Error sending email' );
            } else {
              res.status(200).json( 'Email sent successfully');
            }
          });
    } catch(error){
        console.log("Error sending email:", error);
        res.status(500).json(error.message);
    }
};