import User from "../model/user.model.js";
import { z } from "zod";
import  bcrypt  from "bcryptjs";
import { generateTokenandSaveCookie } from "../jwt/token.js";

const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z
      .string()
      .min(3, { message: "Username alteast 3 characters long" }),
    password: z
      .string()
      .min(6, { message: "Password alteast 6 characters long" }),
  });

export const register=async(req,res)=>{
    try{
        const{email,username,password}=req.body;
        
        if (!email || !username || !password) {
            return res.status(400).json({ errors: "All fields are required" });
          }
          const validation = userSchema.safeParse({ email, username, password });
          if (!validation.success) {
            const errorMessage = validation.error.errors.map((err) => err.message);
            return res.status(400).json({ errors: errorMessage });
          }


        const user=await User.findOne({email});
      if (user) {
          return res.status(400).json({ errors: "User already registered" });
        }
     const hashpassword=await bcrypt.hash(password,10);
        const newUser = new User({ email, username, password:hashpassword});
        await newUser.save();
        if (newUser) {
           const token= await generateTokenandSaveCookie(newUser._id,res);
          res
            .status(201)
            .json({ message: "User registered successfully", newUser ,token});
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error registering user" });
      }
}

export const login=async(req,res)=>{
    const{email,password}=req.body;
        
    try{
        if (!email || !password) {
            return res.status(400).json({ errors: "All fields are required" });
          }
          const user = await User.findOne({ email }).select("+password");
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ errors: "Invalid email or password" });
          }
          const token= await generateTokenandSaveCookie(user._id,res);
          res
          .status(200)
          .json({ message: "User logged in successfully", user,token });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Error registering user" });
    }
}

export const logout=async(req,res)=>{
    try{
        res.clearCookie("jwt",{
            path:"/"
        })
        res
        .status(200)
        .json({ message: "User logout successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Error registering user" });
    }
}