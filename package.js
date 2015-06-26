Package.describe({
    name: "aalexandrakis:recaptcha",
    summary: "Implementation of Google reCAPTCHA V2 for Meteor with language support",
    git: "https://github.com/aalexandrakis/Meteor-reCAPTCHA.git",
    version: "2.0.7",
    license: "MIT"
});

Package.onUse(function(api) {

    api.versionsFrom('1.0.2');

    api.use([
        'templating',
        'handlebars',
    ], 'client');
    api.use([
        'http',
    ], 'server');

    api.addFiles(['server/server.js'], 'server');
    api.addFiles(['client/client.html', 'client/client.js'], 'client');
    api.export && api.export('reCAPTCHA', ['client', 'server']);
});
