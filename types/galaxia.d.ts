interface GalaxiaCoreOptions {
  apiUrl: string;
  apiToken: string;
  logger: Logger;
}

interface GalaxiaCore {
  init(): Promise<void>;
  getVersion(): Promise<string>;
  executeCommand(command: string): Promise<string>;
}

interface Logger {
  log(message: string): void;
  error(message: string): void;
  warn(message: string): void;
  info(message: string): void;
  debug(message: string): void;
}

interface AppOptions {
  galaxiaCore: GalaxiaCore;
  logger: Logger;
  port: number;
}

interface App {
  init(): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  expressApp: Express.Application;
}

interface ExpressApplication {
  use middleware: (middleware: (req: Request, res: Response, next: NextFunction) => void) => this;
  get(path: string, handler: (req: Request, res: Response) => void): this;
  post(path: string, handler: (req: Request, res: Response) => void): this;
  listen(port: number, callback: () => void): this;
}

interface Request {
  body: any;
  query: any;
  params: any;
  headers: any;
}

interface Response {
  status(code: number): this;
  send(body: any): this;
  json(body: any): this;
}

interface NextFunction {
  (): void;
}

interface Error {
  message: string;
  stack: string;
}
