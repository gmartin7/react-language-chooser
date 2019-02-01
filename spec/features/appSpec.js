'use strict';

const app = require('../../app');  
const Browser = require('zombie');
const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001; 
Browser.localhost('example.com', PORT);
      
describe('client', () => {
      
  let browser, document;       
  beforeEach((done) => {       
    browser = new Browser({ waitDuration: '30s', loadCss: false });

    // document
    browser.on('loading', (doc) => {
      document = doc;
      document.addEventListener("DOMContentLoaded", (event) => {
        done();
      });
    });

    browser.visit('/', (err) => {
      if (err) done.fail(err);
      browser.assert.success();
    });
  });

  describe('UI', () => {
    it('has a friendly greeting', () => {
      browser.assert.text('h1', 'React Language Picker Component');
    });

    it('has a language chooser button', () => {
      browser.assert.element('button.chooser-button');
      browser.assert.text('button.chooser-button', 'Add Languages');
    });

    it('does not display the chooser dialog', () => {
      browser.assert.elements('.language-list', 0);
    });
  });

  describe('language chooser button', () => {

    it('displays the selected languages on the landing page', (done) => {
      browser.assert.elements('.lang', 0);
      browser.click('.chooser-button', (err) => {
        if (err) return done.fail(err);
        browser.click('section.language-table div.lang:nth-of-type(2)', (err) => {
          if (err) return done.fail(err);
          browser.click('.add-button', (err) => {
            if (err) return done.fail(err);
            browser.assert.elements('.lang', 1);
            done();
          });
        });
      });
    });

    it('displays multiple selected languages on the landing page', (done) => {
      browser.assert.elements('.lang', 0);
      browser.click('.chooser-button', (err) => {
        if (err) return done.fail(err);
        browser.click('section.language-table div.lang:nth-of-type(2)', (err) => {
          if (err) return done.fail(err);
          browser.click('section.language-table div.lang:nth-of-type(3)', (err) => {
            if (err) return done.fail(err);
            browser.click('.add-button', (err) => {
              if (err) return done.fail(err);
              browser.assert.elements('.lang', 2);
              done();
            });
          });
        });
      });
    });

    it('only displays languages if the Add button was clicked', (done) => { 
      browser.assert.elements('.lang', 0);
      browser.click('.chooser-button', (err) => {
        if (err) return done.fail(err);
        browser.click('section.language-table div.lang:nth-of-type(2)', (err) => {
          if (err) return done.fail(err);
          browser.click('section.language-table div.lang:nth-of-type(3)', (err) => {
            if (err) return done.fail(err);
            browser.click('.close span', (err) => {
              if (err) return done.fail(err);
              browser.assert.elements('.language-list', 0);
              if (err) return done.fail(err);
              browser.assert.elements('.lang', 0);
              done();
            });
          });
        });
      });
    });
  });
});
