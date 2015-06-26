reCAPTCHA = {
    settings: {},
    
    config: function(settings) {
        if (this.settings.lang === undefined){
            this.settings.lang = "en";
        }
        if (this.settings.fallback === undefined){
            this.settings.fallback = false;
        }
        return _.extend(this.settings, settings);
    },
}


window.onloadcaptcha = function() { 
	$( "#recaptcha-container" ).empty();
	grecaptcha.render('recaptcha-container', {
        	sitekey: reCAPTCHA.settings.publickey,
            theme: reCAPTCHA.settings.theme,
            callback: function () {
            return;
        }
    });
};

Template.reCAPTCHA.rendered = function() {
    if (reCAPTCHA.settings.fallback){
        $.getScript('//www.google.com/recaptcha/api.js?fallback=true&onload=onloadcaptcha&render=explicit&hl=' + reCAPTCHA.settings.lang);
    } else {
        $.getScript('//www.google.com/recaptcha/api.js?onload=onloadcaptcha&render=explicit&hl=' + reCAPTCHA.settings.lang);
    }
}
