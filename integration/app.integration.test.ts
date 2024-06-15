import { beforeEach, afterEach, describe, it, expect } from '@jest/globals';
import { App } from '../src/app';
import { GalaxiaCore } from '../src/galaxia-core';
import { Container } from 'typedi';
import { Logger } from '../src/logger';
import { Request, Response } from 'express';
import * as supertest from 'upertest';
import * as nock from 'nock';

jest.setTimeout(30000); // 30 seconds

describe('App Integration', () => {
  let app: App;
  let galaxiaCore: GalaxiaCore;
  let logger: Logger;
  let request: supertest.SuperTest<supertest.Test>;

  beforeEach(async () => {
    Container.reset();
    galaxiaCore = new GalaxiaCore();
    logger = new Logger();
    app = new App(galaxiaCore, logger);
    await app.init();
    request = supertest(app.expressApp);
  });

  afterEach(async () => {
    await app.stop();
    nock.cleanAll();
  });

  it('should start the app successfully', async () => {
    await request.get('/healthcheck').expect(200);
  });

  it('should handle GET /galaxia-core/version', async () => {
    nock('https://galaxia-core.com')
     .get('/version')
     .reply(200, { version: '1.0.0' });

    await request.get('/galaxia-core/version').expect(200, { version: '1.0.0' });
  });

  it('should handle POST /galaxia-core/command', async () => {
    nock('https://galaxia-core.com')
     .post('/command')
     .reply(200, { result: 'Command executed successfully' });

    await request
     .post('/galaxia-core/command')
     .send({ command: 'test command' })
     .expect(200, { result: 'Command executed successfully' });
  });

  it('should handle errors', async () => {
    nock('https://galaxia-core.com')
     .get('/version')
     .reply(500, { error: 'Internal Server Error' });

    await request.get('/galaxia-core/version').expect(500, { error: 'Internal Server Error' });
  });

  it('should handle uncaught exceptions', async () => {
    process.emit('uncaughtException', new Error('Test uncaught exception'));

    await request.get('/healthcheck').expect(500, { error: 'Internal Server Error' });
  });
});
