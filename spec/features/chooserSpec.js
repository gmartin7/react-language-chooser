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
        browser.click('.chooser-button', (err) => {
          if (err) return done.fail(err);
          done();
        });
      });
    });

    browser.visit('/', (err) => {
      if (err) return done.fail(err);
      browser.assert.success();
    });
  });

  describe('UI', () => {
    it('structures the modal', () => {
      browser.assert.element('nav.chooser');

      browser.assert.element('.language-list');
      browser.assert.element('.language-list section.language-table .close');

      browser.assert.text('.language-list h1', 'Select a New Input System Language');
      browser.assert.element('.language-list input[type=text]');
      browser.assert.element('.language-list section.language-table');
      browser.assert.elements('.language-list header span', 4);
      browser.assert.text('.language-list header span:nth-child(1)', 'Name');
      browser.assert.text('.language-list header span:nth-child(2)', 'Code');
      browser.assert.text('.language-list header span:nth-child(3)', 'Country');
      browser.assert.text('.language-list header span:nth-child(4)', 'Other Names');
      browser.assert.elements('.language-list section.language-table div.lang', LANGUAGES.length);
      browser.assert.element('.language-list section.language-table footer button.add-button');
    });

    it('shows a list of languages', () => {
      LANGUAGES.forEach((lang, i) => {
        browser.assert.text(`.language-table .scrollable div.lang:nth-of-type(${i + 1}) .lang-name`, lang.name);
        browser.assert.text(`.language-table .scrollable div.lang:nth-of-type(${i + 1}) .lang-code`, lang.code);
        browser.assert.text(`.language-table .scrollable div.lang:nth-of-type(${i + 1}) .lang-country`, lang.country);
        browser.assert.text(`.language-table .scrollable div.lang:nth-of-type(${i + 1}) .lang-other`, lang.otherNames);
      });
    });

    it('closes the list when chooser button is clicked', (done) => {
      browser.assert.element('.language-list');
      browser.click('.chooser-button', (err) => {
        if (err) return done.fail(err);
        browser.assert.elements('.language-list', 0);
        done();
      });
    });

    it('closes the list when the gray background is clicked', (done) => {
      browser.assert.element('.language-list');
      browser.click('.language-list', (err) => {
        if (err) return done.fail(err);
        browser.assert.elements('.language-list', 0);
        done();
      });
    });

    it('does not close the list when the language table is clicked', (done) => {
      browser.assert.element('.language-list');
      browser.click('.language-table', (err) => {
        if (err) return done.fail(err);
        browser.assert.elements('.language-list', 1);
        done();
      });
    });

    it('closes the list when the X is clicked', (done) => {
      browser.assert.element('.language-list');
      browser.click('.close span', (err) => {
        if (err) return done.fail(err);
        browser.assert.elements('.language-list', 0);
        done();
      });
    });
  });

  describe('language search', () => {

    it('gives focus to search input', () => {
      browser.assert.hasFocus('input[name=search]')
    });

    it('only shows matching language codes', (done) => {
      browser.fill('search', 'lo');
      browser.fire('input[name=search]', 'change', () => {
        browser.assert.elements('.language-list section.language-table div.lang', 1);
        done();
      });
    });

    it('only shows matching countries', (done) => {
      browser.fill('search', 'China');
      browser.fire('input[name=search]', 'change', () => {
        browser.assert.elements('.language-list section.language-table div.lang', 4);
        done();
      });
    });

    it('is case-insensitive in its searches', (done) => {
      browser.fill('search', 'THAILAND');
      browser.fire('input[name=search]', 'change', () => {
        browser.assert.elements('.language-list section.language-table div.lang', 4);
        done();
      });
    });

    it('is displays a message if there are no matches', (done) => {
      browser.fill('search', 'Klingon');
      browser.fire('input[name=search]', 'change', () => {
        browser.assert.elements('.language-list section.language-table div.no-match', 1);
        done();
      });
    });

    it('resets the search when the modal is closed and opened again', (done) => {
      browser.assert.elements('.language-list section.language-table div.lang', LANGUAGES.length);
      browser.fill('search', 'Klingon');
      browser.fire('input[name=search]', 'change', () => {

        browser.assert.elements('.language-list section.language-table div.no-match', 1);
        browser.assert.elements('.language-list section.language-table div.lang', 0);

        browser.click('.close span', (err) => {
          if (err) return done.fail(err);

          browser.click('.chooser-button', (err) => {
            if (err) return done.fail(err);
            browser.assert.elements('.language-list section.language-table div.lang', LANGUAGES.length);
            done();
          });
        });
      });
    });
  });

  describe('describe language selection', () => {
    it('highlights the selected language', (done) => {
      browser.assert.hasNoClass('section.language-table div.lang:nth-of-type(2)', 'selected');
      browser.click('section.language-table div.lang:nth-of-type(2)', (err) => {
        if (err) return done.fail(err);
        browser.assert.hasClass('section.language-table div.lang:nth-of-type(2)', 'selected');
        done();
      });
    });

    it('removes highlight if a language is clicked twice', (done) => {
      browser.assert.hasNoClass('section.language-table div.lang:nth-of-type(2)', 'selected');
      browser.click('section.language-table div.lang:nth-of-type(2)', (err) => {
        if (err) return done.fail(err);
        browser.assert.hasClass('section.language-table div.lang:nth-of-type(2)', 'selected');
        browser.click('section.language-table div.lang:nth-of-type(2)', (err) => {
          if (err) return done.fail(err);
          browser.assert.hasNoClass('section.language-table div.lang:nth-of-type(2)', 'selected');
          done();
        });
      });
    });
  });

  describe('add button', () => {
    it('is disabled if no languages are selected', () => {
      browser.assert.attribute('button.add-button', 'disabled', '');
    });

    it('is enabled if a language is selected', (done) => {
      browser.assert.attribute('button.add-button', 'disabled', '');
      browser.click('section.language-table div.lang:nth-of-type(2)', (err) => {
        if (err) return done.fail(err);
        browser.assert.attribute('button.add-button', 'disabled', null);
        done();
      });
    });

    it('is enabled if multiple languages are selected', (done) => {
      browser.assert.attribute('button.add-button', 'disabled', '');
      browser.click('section.language-table div.lang:nth-of-type(2)', (err) => {
        if (err) return done.fail(err);
        browser.click('section.language-table div.lang:nth-of-type(3)', (err) => {
          if (err) return done.fail(err);
          browser.assert.attribute('button.add-button', 'disabled', null);
          done();
        });
      });
    });

    it('closes the modal when clicked', (done) => {
      browser.assert.element('.language-list');
      browser.click('section.language-table div.lang:nth-of-type(2)', (err) => {
        if (err) return done.fail(err);
        browser.click('.add-button', (err) => {
          if (err) return done.fail(err);
          browser.assert.elements('.language-list', 0);
          done();
        });
      });
    });

    it('does not close the modal when clicked if disabled', (done) => {
      browser.assert.attribute('button.add-button', 'disabled', '');
      browser.assert.element('.language-list');
      browser.click('.add-button', (err) => {
        if (err) return done.fail(err);
        browser.assert.element('.language-list');
        done();
      });
    });

    it('omits added languages from the language table', (done) => {
      browser.assert.elements('.language-list section.language-table div.lang', LANGUAGES.length);
      browser.click('section.language-table div.lang:nth-of-type(2)', (err) => {
        if (err) return done.fail(err);
        browser.click('section.language-table div.lang:nth-of-type(3)', (err) => {
          if (err) return done.fail(err);
          browser.assert.attribute('button.add-button', 'disabled', null);
          browser.click('.add-button', (err) => {
            if (err) return done.fail(err);
            browser.click('.chooser-button', (err) => {
              if (err) return done.fail(err);
              browser.assert.element('.language-list');
              browser.assert.elements('.language-list section.language-table div.lang', LANGUAGES.length - 2);
              done();
            });
          });
        });
      });
    });
  });

  describe('removing languages', () => {
  });
});
