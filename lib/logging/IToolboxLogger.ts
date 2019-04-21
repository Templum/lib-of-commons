/**
 * Interface that the Logger needs to statisfy. It is compatible
 * with the console interface, which is also the default implementation.
 */
export interface IToolboxLogger {
    debug(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
}
