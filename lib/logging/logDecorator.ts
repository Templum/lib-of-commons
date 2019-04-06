import { ISanitizeInfo, META_DATA_KEY_PREFIX } from "./sanitizeParamDecorator";

export enum Level {
    Debug,
    Info,
    Warn,
    Error,
}

export interface IToolboxLogger {
    debug(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
}

/**
 *
 * @param level The Log Level
 * @param logger Used Logger, will default to console
 */
export function Log(level: Level = Level.Info, logger: IToolboxLogger = console) {
    /**
     *
     * @param _
     * @param propertyName The name of the function
     * @param propertyDesciptor
     */
    return function(
        target: any,
        propertyName: string,
        propertyDesciptor: PropertyDescriptor): PropertyDescriptor {

        const method = propertyDesciptor.value;

        propertyDesciptor.value = function(...args: any[]) {
            const META_DATA_KEY = `${META_DATA_KEY_PREFIX}_${propertyName}`;
            const paramsToSanitize = target[META_DATA_KEY] || [];
 
            const params = args.map((a, i) => getArgument(a,i, paramsToSanitize)).join();

            // display in console the function call details
            switch (level) {
                case Level.Debug:
                logger.debug(`Call: ${propertyName}(${params})`);
                break;
                case Level.Info:
                logger.info(`Call: ${propertyName}(${params})`);
                break;
                case Level.Warn:
                logger.warn(`Call: ${propertyName}(${params})`);
                break;
                case Level.Error:
                logger.error(`Call: ${propertyName}(${params})`);
                break;
            }

            // Perform the actuall invocation
            return method.apply(this, args);
        };
        return propertyDesciptor;
    };

}

function getArgument(arg: any, index: number, paramsToSanitize: ISanitizeInfo[]): string {
    for (const info of paramsToSanitize) {
        if (info.index === index){
            return info.value;
        }
    }

    return JSON.stringify(arg);
}
