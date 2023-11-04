import bcrypt, { compare } from "bcrypt";

const hashPassword = (request, response, next) => {
	const { password } = request.body;
	const saltRounds = 10;

	bcrypt.hash(password, saltRounds)
		.then((hash) => {
			console.log("[*] Password hashed!");
			request.body.password = hash;
			next();
		})
		.catch((error) => {
			console.log("[!] Error hashing password", error);
			response.status(500).send(error);
		});
};

const comparePassword = (request, response, next) => {
	const { password } = request.body;
	const { hash } = request.body;

	bcrypt.compare(password, hash)
		.then((result) => {
			if (!result) {
				throw new Error("Passwords don't match!");
			}
			console.log("[*] Passwords match!");
			next();
		})
		.catch((error) => {
			console.log("[!] Passwords don't match!", error);
			response.status(401).json({ Error: "Passwords don't match or user doesn't exist!" });
		});
};

export { hashPassword, comparePassword };
