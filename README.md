To test the integrity of www.mewe.com, CasperJs framework and PhantomJS were used as a command line browser.

CasperJs, unlike other testing tools, does not require a graphical environment. Testing is performed from the command line.

Full documentation of CasperJs with installation conditions can be found here:  [CasperJs](http://docs.casperjs.org/en/latest/)

To run the prepared test scripts, you must first install the dependencies using `npm install` command and then start test using `npm start` command.

## Description:
The prepared script waits 10 seconds for the required part of www.mewe.com to appear, and then performs a series of tests.
Tests are performed synchronously, one after the other.
The tests are written in java script but the code works on the NodeJs platform.
When designing tests, we must keep in mind that they can only be executed when the entire DOM model is built.

## The first test checks if a person under the age of 13 can sign up for the service.

In this case, using the command: `casper.start ('https://mewe.com', ...)` invokes www.mewe.com and then executes the command `casper.waitForSelector ('# registration-form '...) `,  which will wait for the selector to appear with the indicated ID.
The next step is to call the function `This.fillSelectors ('# registration-form', ...)`, which fills the indicated form fields with the specified values.
The function `this.click ('# submit-registration');` sends a registration form with the filled values.
Next we call the function `casper.waitForSelector ('input # reg-user-age.input-error' ...)`, which expects the warning of a lack of registration for a person under the age of 13.
When such a warning appears, the test is deemed complete.

## The second test checks if "Terms of Service" is visible when user clicks link under registration. Terms should be in modal form.

The function `casper.waitForSelector('a#terms-of-service, ...)`  will wait for the selector to appear with the indicated ID.
The function `test.assertNotVisible('#terms')` checks if Terms of Service modal is not visible before we clicked "Term of Service" link.
then the function this.click('a#terms-of-service') clicks in the link and the last function `test.assertVisible('#terms')` checks if modal is visible after we clicked "Term of Service" link.

## The third test checks if privacy page exists, is accesible and there is displayed "SIGN UP FOR FREE!" button

First the function `casper.start('https://mewe.com/privacy', ...)` loads content from `www.mewe.com/privacy` and then the second function  `casper.waitForSelector('a[title="Sign Up For Free!"]', ...)` waits if the selector is available. The last function `test.assertSelectorHasText('a[title="Sign Up For Free!"]', 'Sign Up For Free!')` checks if expected test has appeared.

## How to improve tests

We can running tests in paralell on multiple processors. Right now we run them one by one but it's possible to shorten the execution time if we reach a certain limit (eg. tests running longer than 1h) by using nodejs clustering feature.
Finally, if some parts of the code begin to repeat, it is worth doing refactoring.



