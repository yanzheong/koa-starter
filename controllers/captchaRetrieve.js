const config = require("../config.json");
const captchaModel = require("../models/captcha")

// Create a captcha
module.exports.createACaptcha = async(ctx) => {

	let user;

	if (ctx.isAuthenticated()) {
		user = ctx.session.passport.user;
	} else {
		return ctx.redirect("/");
	}

    const questionArr = captchaModel.createCAPTCHA(user);

	await ctx.render("captcha", {
		title: config.site.name,
		user: user,
        arrayOfCards: questionArr
	});
};


// Check for error
module.exports.checkForErr = async(ctx) => {

	let user;
	ctx.state.api = true;
    
	if (ctx.isAuthenticated()) {
		user = ctx.session.passport.user;
	} else {
		return ctx.redirect("/");
	}

    const userAnswer = ctx.request.body;

    if (!userAnswer) {
		ctx.throw(400, "Missing parameter object"); // if error is thrown from controllers
	}

    const result = captchaModel.checkCAPTCHA(user, userAnswer);

	return ctx.body = result;

};
