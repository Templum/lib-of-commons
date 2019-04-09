import { Level, Log } from "../../lib";
import { MockLogger } from "../__mocks__/logger.mock";

test('it should log name and parameter of a decorated method', () => {
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

test('it should log on the defined level', () => {
    const mock: MockLogger = new MockLogger();

    class Example {
        @Log(Level.Error, mock)
        static staticMethod(param: any) { return param; }
    }

    Example.staticMethod('Hello World');
    const record = mock.getRecord();
    expect(record.level).toEqual(Level.Error);
    expect(record.message).toEqual('Call: staticMethod("Hello World")');
});

test('it should support the logging of different parameter types', () => {
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

test('it should log even if the method throws an error', () => {
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