/* eslint-disable no-unused-expressions*/
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const mocha = require('mocha');
const ui = require('./utils/ui');
const categories = ['animals', 'cars', 'clothing', 'man', 'school',
    'space', 'sport', 'women', 'sex', 'movies',
    'music', 'programming', 'work', 'other', 'games',
];

describe('Home', () => {
    let driver = null;
    // Uncomment this only to get intellisence, then use driver=null for real testing
    // let driver = new webdriver.Builder().build();

    const appUrl = 'http://localhost:3002';
    const username = 'TestUser-3';
    const password = '1234';
    const email = 'tests@mail.com';
    const newChatMsg = 'Heey';

    beforeEach(() => {
        driver = setupDriver('chrome');
        driver.manage().window().maximize();
        ui.setDriver(driver);
        return driver.get(appUrl);
    });
    // after(() => {
    //     ui.click('#nav-button-logout');
    // });
    afterEach(() => {
        return driver.quit();
    });
    describe('Home routes correct redirect', () => {
        it('Expect Lets go button to rediderct to Register form', (done) => {
            Promise.resolve()
                .then(() => ui.click('#lets-go-register-btn'))
                .then(() => {
                    return ui.getText('#legend');
                })
                .then((text) => {
                    expect(text).to.equals('Register');
                    done();
                })
                .catch((err) => {
                    throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
                });
        });
        for (const category of categories) {
            it(`Expect to open ${category} category`, (done) => {
                Promise.resolve()
                    .then(() => ui.click(`#${category}`))
                    .then(() => {
                        return ui.getText('.container h1');
                    })
                    .then((text) => {
                        expect(text).to.equals(`${category} posts`);
                        done();
                    })
                    .catch((err) => {
                        throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
                    });
            });
        }
    });
    describe('Chat functionality', () => {
        it('Expect log in', (done) => {
            Promise.resolve()
                .then(() => ui.click('#nav-button-register'))
                .then(() => ui.setValue('#username', username))
                .then(() => ui.setValue('#email.input-xlarge', email))
                .then(() => ui.setValue('#password.input-xlarge', password))
                .then(() => ui.setValue('#password_confirm', password))
                .then(() => ui.click('#register-btn'))
                .then(() => ui.click('#title-nav-button'))
                .then(() => ui.getText('#nav-button-user span'))
                .then((user) => {
                    expect(user).to.equals(username.toUpperCase());
                    done();
                })
                .catch((err) => {
                    throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
                });
        });
        it('Expect to be able to chat, when logged in', (done) => {
            Promise.resolve()
                .then(() => ui.setValue('#m', newChatMsg))
                .then(() => ui.click('form button'))
                .then(() => {
                    return ui.getText('#messages li');
                })
                .then((msg) => {
                    expect(msg).to.equals(`${username.toUpperCase()}: ${newChatMsg}`);
                    done();
                })
                .catch((err) => {
                    throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
                });
        });
        it('Expext to logout', (done) => {
            Promise.resolve()
                .then(() => ui.click('#nav-button-logout'))
                .then(() => {
                    return ui.getText('.navbar-nav li:last-child a span');
                })
                .then((buttonText) => {
                    expect(buttonText).to.equals('ABOUT');
                    done();
                })
                .catch((err) => {
                    throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
                });
        });
    });
});