import { beforeEach, afterEach, describe, it, expect } from '@jest/globals';
import { App } from '../src/app';
import { GalaxiaCore } from '../src/galaxia-core';
import { MockGalaxiaCore } from './mocks/galaxia-core.mock';
import { MockLogger } from './mocks/logger.mock';
import { Container } from 'typedi';
import { Logger } from '../src/logger';

jest.mock('../src/logger', () => ({
  __esModule: true,
  default: MockLogger,
}));

describe('App', () => {
  let app: App;
  let galaxiaCore: GalaxiaCore;
  let logger: Logger;

  beforeEach(async () => {
    Container.reset();
    galaxiaCore = new MockGalaxiaCore();
    logger = new MockLogger();
    app = new App(galaxiaCore, logger);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should create an instance of App', () => {
    expect(app).toBeInstanceOf(App);
  });

  it('should initialize Galaxia Core', async () => {
    await app.init();
    expect(galaxiaCore.init).toHaveBeenCalledTimes(1);
  });

  it('should start the app', async () => {
    await app.start();
    expect(galaxiaCore.start).toHaveBeenCalledTimes(1);
  });

  it('should stop the app', async () => {
    await app.stop();
    expect(galaxiaCore.stop).toHaveBeenCalledTimes(1);
  });

  it('should handle errors', async () => {
    const error = new Error('Test error');
    await app.handleError(error);
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(error);
  });

  it('should handle uncaught exceptions', async () => {
    const error = new Error('Test uncaught exception');
    process.emit('uncaughtException', error);
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(error);
  });
});
