import { App } from '../src/app';
import { GalaxiaCore } from '../src/galaxia-core';
import { Logger } from '../src/logger';
import * as express from 'express';

jest.mock('../src/galaxia-core');
jest.mock('../src/logger');

describe('App', () => {
  let app: App;
  let galaxiaCore: GalaxiaCore;
  let logger: Logger;

  beforeEach(() => {
    galaxiaCore = new GalaxiaCore();
    logger = new Logger();
    app = new App(galaxiaCore, logger, 3000);
  });

  it('should initialize the app successfully', async () => {
    await app.init();
    expect(galaxiaCore.init).toHaveBeenCalledTimes(1);
  });

  it('should start the app successfully', async () => {
    await app.start();
    expect(app.expressApp.listen).toHaveBeenCalledTimes(1);
  });

  it('should stop the app successfully', async () => {
    await app.stop();
    expect(app.expressApp.close).toHaveBeenCalledTimes(1);
  });

  it('should handle GET /galaxia-core/version', async () => {
    const req = { method: 'GET', url: '/galaxia-core/version' };
    const res = { send: jest.fn() };
    await app.expressApp(req, res);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({version: '1.0.0' });
  });

  it('should handle POST /galaxia-core/command', async () => {
    const req = { method: 'POST', url: '/galaxia-core/command', body: { command: 'test command' } };
    const res = { send: jest.fn() };
    await app.expressApp(req, res);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({ result: 'Command executed successfully' });
  });

  it('should handle errors', async () => {
    const req = { method: 'GET', url: '/galaxia-core/version' };
    const res = { send: jest.fn() };
    const next = jest.fn();
    app.expressApp(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new Error('Internal Server Error'));
  });
});
