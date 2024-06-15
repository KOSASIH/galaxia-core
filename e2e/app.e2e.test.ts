import { beforeEach, afterEach, describe, it, expect } from '@jest/globals';
import { App } from '../src/app';
import { GalaxiaCore } from '../src/galaxia-core';
import { Container } from 'typedi';
import { Logger } from '../src/logger';
import * as puppeteer from 'puppeteer';
import * as nock from 'nock';

jest.setTimeout(30000); // 30 seconds

describe('App E2E', () => {
  let app: App;
  let galaxiaCore: GalaxiaCore;
  let logger: Logger;
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeEach(async () => {
    Container.reset();
    galaxiaCore = new GalaxiaCore();
    logger = new Logger();
    app = new App(galaxiaCore, logger);
    await app.init();
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterEach(async () => {
    await app.stop();
    await browser.close();
    nock.cleanAll();
  });

  it('should display the Galaxia Core version', async () => {
    nock('https://galaxia-core.com')
    .get('/version')
    .reply(200, { version: '1.0.0' });

    await page.goto('http://localhost:3000/galaxia-core/version');
    await page.waitForSelector('div.version');
    const versionText = await page.$eval('div.version', (el) => el.textContent);
    expect(versionText).toBe('1.0.0');
  });

  it('should execute a command successfully', async () => {
    nock('https://galaxia-core.com')
    .post('/command')
    .reply(200, { result: 'Command executed successfully' });

    await page.goto('http://localhost:3000/galaxia-core/command');
    await page.type('input[name="command"]', 'test command');
    await page.click('button[type="submit"]');
    await page.waitForSelector('div.result');
    const resultText = await page.$eval('div.result', (el) => el.textContent);
    expect(resultText).toBe('Command executed successfully');
  });

  it('should handle errors', async () => {
    nock('https://galaxia-core.com')
    .get('/version')
    .reply(500, { error: 'Internal Server Error' });

    await page.goto('http://localhost:3000/galaxia-core/version');
    await page.waitForSelector('div.error');
    const errorText = await page.$eval('div.error', (el) => el.textContent);
    expect(errorText).toBe('Internal Server Error');
  });

  it('should handle uncaught exceptions', async () => {
    process.emit('uncaughtException', new Error('Test uncaught exception'));

    await page.goto('http://localhost:3000/healthcheck');
    await page.waitForSelector('div.error');
    const errorText = await page.$eval('div.error', (el) => el.textContent);
    expect(errorText).toBe('Internal Server Error');
  });
});
