import { PREFIX } from '../shared/const';
import { getMetaDataKey } from '../shared/helper';
import { ISanitizeInfo } from './hideParamDecorator';
import { IToolboxLogger } from './IToolboxLogger';

export enum Level {
    Debug,
    Info,
    Warn,
    Error,
}

/**
 *
 * @param level The Log Level
 * @param logger Used Logger, will default to console
 */
export function Log(level: Level = Level.Info, logger: IToolboxLogger = console) {
    const getKey = getMetaDataKey(PREFIX.Hide);
    return function (
        target: any,
        propertyName: string,
        propertyDesciptor: PropertyDescriptor): PropertyDescriptor {

        const method = propertyDesciptor.value;
        propertyDesciptor.value = function (...args: any[]) {
            const META_DATA_KEY = getKey(propertyName);
            const listOfParameterToHide: ISanitizeInfo[] = Reflect.getOwnMetadata(META_DATA_KEY, target, propertyName) || [];

            const params = args.map((a, i) => {
                for (const info of listOfParameterToHide) {
                    if (info.index === i) {
                        return info.value;
                    }
                }

                // JSON.stringify(Infinity) => null
                if (typeof a === 'number' && !Number.isFinite(a)) {
                    a = a.toString();
                }

                return JSON.stringify(a);
            }).join();

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
