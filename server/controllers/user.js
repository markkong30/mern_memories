import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
		console.log(existingUser, password);
		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
		if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: "3h" }
		);

		return res.status(200).json({ userProfile: existingUser, token });
	} catch (err) {
		return res.status(500).json({ message: "Something went wrong" });
	}
};

export const signup = async (req, res) => {
	const { email, password, firstName, lastName, picture } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
			picture,
		});

		const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: "3h",
		});

		return res.status(201).json({ userProfile: newUser, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });

		console.log(error);
	}
};
