casper.options.timeout = 10000;

casper.test.begin('you cannot register when you are under 13 - registration fails when age is under 13', 1, function suite(test) {
  casper.start('https://mewe.com', function () {
    casper.waitForSelector('#registration-form', function () {
      this.fillSelectors('#registration-form', {
        'input#reg-first-filled': 'John',
        'input#reg-last-filled': 'Doe',
        'input#reg-email-phone-filled': 'doe@mewe.com',
        'input#reg-email-phone-filled-repeat': 'doe@mewe.com',
        'input#reg-password-filled': 'abc123',
        'input#reg-user-age': '10'
      }, true);

      this.click('#submit-registration');

      casper.waitForSelector('input#reg-user-age.input-error', function () {
        test.pass("Input error exists");
      })
    })
  }).run(function () {
    test.done();
  });
});

casper.test.begin('when user clicks on "Terms of Service" link under registration, new dialog with terms is open', 2, function suite(test) {
  casper.start('https://mewe.com', function () {
    casper.waitForSelector('a#terms-of-service', function () {
      test.assertNotVisible('#terms')
      this.click('a#terms-of-service')
      test.assertVisible('#terms')
    })
  }).run(function () {
    test.done();
  });
});


casper.test.begin('/privacy page exists, is accesible and there is displayed "SIGN UP FOR FREE!" button', 1, function suite(test) {
  casper.start('https://mewe.com/privacy', function () {
    casper.waitForSelector('a[title="Sign Up For Free!"]', function () {
      test.assertSelectorHasText('a[title="Sign Up For Free!"]', 'Sign Up For Free!');
    })
  }).run(function () {
    test.done();
  });
});


