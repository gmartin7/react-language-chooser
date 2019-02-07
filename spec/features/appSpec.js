'use strict';

const app = require('../../app');  
const Browser = require('zombie');
const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001; 
const LANGUAGES = require('../../views/data/languages');
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

  describe('removing languages', () => {
    beforeEach((done) => {
      browser.click('.chooser-button', (err) => {
        if (err) return done.fail(err);
        // Note the reversed order of language selection. This is done to ensure that
        // the elements you want to remove are the ones actually removed
        browser.click('section.language-table div.lang:nth-of-type(2)', (err) => {
          if (err) return done.fail(err);
          browser.click('section.language-table div.lang:nth-of-type(1)', (err) => {
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

    it('removes a language from the app list', (done) => {
      browser.click('div.lang-wrapper:nth-of-type(2)', (err) => {
        if (err) return done.fail(err);
        browser.assert.elements('.lang', 1);
        done();
      });
    });

    it('restores the removed language to the chooser list', (done) => {
      browser.click('.chooser-button', (err) => {
        if (err) return done.fail(err);
        browser.assert.elements('.language-list section.language-table div.lang', LANGUAGES.length - 2);

        browser.click('.close span', (err) => {
          if (err) return done.fail(err);

          browser.click('div.lang-wrapper:nth-of-type(2)', (err) => {
            if (err) return done.fail(err);
            browser.assert.elements('.lang', 1);

            browser.click('.chooser-button', (err) => {
              if (err) return done.fail(err);
              browser.assert.elements('.language-list section.language-table div.lang', LANGUAGES.length - 1);

              done();
            });
          });
        });
      });
    });

    // Cf. note in test setup
    //
    // This is a confusing problem which may not be immediately obvious.
    // I discovered it by selecting a languages out of order and then removing
    // them from the landing page interface. It may appear superfluous, but it
    // is not.
    it('removes the correct language when multiple languages have been selected out of order', (done) => { 
      // Add a third language

      browser.assert.text('div.lang-wrapper:nth-of-type(1) .lang-code', LANGUAGES[0].tag);
      browser.assert.text('div.lang-wrapper:nth-of-type(2) .lang-code', LANGUAGES[1].tag);

      browser.click('div.lang-wrapper:nth-of-type(2)', (err) => {
        if (err) return done.fail(err);
        browser.assert.elements('.lang', 1);
        browser.assert.text('div.lang-wrapper:nth-of-type(1) .lang-code', LANGUAGES[0].tag);
        browser.click('div.lang-wrapper:nth-of-type(1)', (err) => {
          if (err) return done.fail(err);
            browser.assert.elements('.lang', 0);
            done();
        });
      });
    });
  });
});
