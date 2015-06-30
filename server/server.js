reCAPTCHA = {
    settings: {},
    
    config: function(settings) {
        return _.extend(this.settings, settings);
    },
    verifyCaptcha : function(clientIP, response){
        if (response.captcha_challenge_id === undefined){
            var captcha_data = {
                privatekey: this.settings.privatekey,
                remoteip: clientIP,
                response: response
            };
            var serialized_captcha_data =
                'secret=' + captcha_data.privatekey +
                '&remoteip=' + captcha_data.remoteip +
                '&response=' + captcha_data.response;

            var captchaVerificationResult = null;

            try {
                captchaVerificationResult = HTTP.call("POST", "https://www.google.com/recaptcha/api/siteverify", {
                    content: serialized_captcha_data.toString('utf8'),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': serialized_captcha_data.length
                    }
                });
            } catch (e) {
                console.log(e);
                return {
                    'success': false,
                    'error-codes': 'reCaptcha service not available'
                };
            }

            return captchaVerificationResult;
        } else {
            var captcha_data = {
                privatekey: this.settings.privatekey,
                remoteip: clientIP,
                challenge: response.captcha_challenge_id,
                response: response.captcha_solution
            };

            var serialized_captcha_data =
                'privatekey=' + captcha_data.privatekey +
                '&remoteip=' + captcha_data.remoteip +
                '&challenge=' + captcha_data.challenge +
                '&response=' + captcha_data.response;
            var captchaVerificationResult = null;
            var success, parts; // used to process response string

            try {
                captchaVerificationResult = HTTP.call("POST", "http://www.google.com/recaptcha/api/verify", {
                    content: serialized_captcha_data.toString('utf8'),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': serialized_captcha_data.length
                    }
                });
            } catch (e) {
                console.log(e);
                return { data :
                            {
                               'success': false,
                                'error': 'service_not_available'
                            }
                };
            }

            parts = captchaVerificationResult.content.split('\n');
            success = parts[0];

            if (success !== 'true') {
                return { data :
                         {
                            'success': false,
                            'error': 'entered_text_not_match'
                         }
                };
            }

            return { data :
                {
                    'success': true
                }
            };
        }
    }
}


