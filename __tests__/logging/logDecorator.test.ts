import { Level, Log } from "../../lib";
import { MockLogger } from "../__mocks__/logger.mock";

describe('Log Decorator', () => {

    describe('Contract', () => {
        it('should log method name and passed parameters', () => {
            const mock: MockLogger = new MockLogger();

            class Example {
                @Log(undefined, mock)
                static staticMethod(param: any) { return param; }
                @Log(undefined, mock)
                method(param: any) { return param; }
            }
            const instance = new Example();

            Example.staticMethod('Hello World');
            {
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Info);
                expect(record.message).toEqual('Call: staticMethod("Hello World")');
            }


            instance.method('Hello World');
            {
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Info);
                expect(record.message).toEqual('Call: method("Hello World")');
            }
        });

        it('should use the defined log level to log', () => {
            const mock: MockLogger = new MockLogger();

            class Example {
                @Log(Level.Debug, mock)
                static logToDebug(param: any) { return param; }
                @Log(Level.Info, mock)
                static logToInfo(param: any) { return param; }
                @Log(Level.Warn, mock)
                static logToWarn(param: any) { return param; }
                @Log(Level.Error, mock)
                static logToError(param: any) { return param; }
            }

            {
                Example.logToDebug('Hello World');
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Debug);
                expect(record.message).toEqual('Call: logToDebug("Hello World")');
            }

            {
                Example.logToInfo('Hello World');
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Info);
                expect(record.message).toEqual('Call: logToInfo("Hello World")');
            }


            {
                Example.logToWarn('Hello World');
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Warn);
                expect(record.message).toEqual('Call: logToWarn("Hello World")');
            }


            {
                Example.logToError('Hello World');
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Error);
                expect(record.message).toEqual('Call: logToError("Hello World")');
            }
        });
    });

    describe('Special Cases', () => {
        it('should successfully log different types of parameter', () => {
            const mock: MockLogger = new MockLogger();

            class Example {
                @Log(Level.Debug, mock)
                static staticMethod(param: any) { return param; }
            }

            Example.staticMethod('string');
            {
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Debug);
                expect(record.message).toEqual('Call: staticMethod("string")');
            }

            Example.staticMethod(4.3);
            {
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Debug);
                expect(record.message).toEqual('Call: staticMethod(4.3)');
            }

            Example.staticMethod(Number.NaN);
            {
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Debug);
                expect(record.message).toEqual('Call: staticMethod("NaN")');
            }

            Example.staticMethod(Infinity);
            {
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Debug);
                expect(record.message).toEqual('Call: staticMethod("Infinity")');
            }

            Example.staticMethod(true);
            {
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Debug);
                expect(record.message).toEqual('Call: staticMethod(true)');
            }

            Example.staticMethod({ arg: true });
            {
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Debug);
                expect(record.message).toEqual('Call: staticMethod({"arg":true})');
            }

            Example.staticMethod([1, 2, 3]);
            {
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Debug);
                expect(record.message).toEqual('Call: staticMethod([1,2,3])');
            }

            Example.staticMethod(null);
            {
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Debug);
                expect(record.message).toEqual('Call: staticMethod(null)');
            }

            Example.staticMethod(undefined);
            {
                const record = mock.getRecord();
                expect(record.level).toEqual(Level.Debug);
                expect(record.message).toEqual('Call: staticMethod()');
            }
        });

        it('should log even when the method throws an error', () => {
            const mock: MockLogger = new MockLogger();

            class Example {
                @Log(Level.Warn, mock)
                static fails(param: any) { throw new Error('Expected'); }
            }

            expect(Example.fails).toThrowError('Expected')

            const record = mock.getRecord();
            expect(record.level).toEqual(Level.Warn);
            expect(record.message).toEqual('Call: fails()');
        });

        it('should fallback to console if no logger is provided', () => {
            class Example {
                @Log()
                static staticMethod(param: any) { return param; }
            }

            Example.staticMethod('anything');

        });
    })
});
