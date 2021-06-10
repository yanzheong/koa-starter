const config = require("../config.json");
const captchaModel = require("../models/captcha")

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
        array: questionArr
	});
};



module.exports.checkForErr = async(ctx) => {

	let user;
    
	if (ctx.isAuthenticated()) {
		user = ctx.session.passport.user;
	} else {
		return ctx.redirect("/");
	}

    const userAnswer = ctx.request.body;

    if (!userAnswer) {
		throw new Error("Missing parameter object");
	}

    const result = captchaModel.checkCAPTCHA(user, userAnswer);

    if(result == "WRONG"){
        throw new Error(result);
    }
};
