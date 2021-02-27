const express = require("express");
const router = express.Router();
const {
	signup,
	signin,
	signout,
	requireSignin,
} = require("../controllers/auth");

// validator
const { runValidator } = require("../validators");
const {
	userSignupValidator,
	userSigninValidator,
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidator, signup);
router.post("/signin", userSigninValidator, runValidator, signin);
router.get("/signout", signout);

// Test
router.get("/secret", requireSignin, (req, res) => {
	res.json({
		message: "You have access to secret page",
	});
});

module.exports = router;
