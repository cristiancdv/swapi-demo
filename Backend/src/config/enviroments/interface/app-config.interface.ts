export default interface AppConfigInterface {
  port: number;

  cluster: boolean;

  isLocalEnvironment: boolean;

  corsAllowOrigin: string;

  globalPrefix: string;

  method: string[];

  logLevel: string;

  logFile: string;
}
