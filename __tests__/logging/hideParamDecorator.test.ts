import { Hide, Level, Log } from "../../lib";
import { MockLogger } from "../__mocks__/logger.mock";

test('it should hide the value of the marked parameter', () => {
    const mock: MockLogger = new MockLogger();

    class Example {
        @Log(Level.Info, mock)
        static method(param: any, @Hide() secret: string) { return param; }
    }

    Example.method('Visible', 'secretKey');
    const record = mock.getRecord();
    expect(record.message).toEqual(expect.stringContaining('Visible'));
    expect(record.message).toEqual(expect.not.stringContaining('secretKey'));
});

test('it should hide the value of the marked parameter with the specified value', () => {
    const mock: MockLogger = new MockLogger();

    class Example {
        @Log(Level.Info, mock)
        static method(param: any, @Hide('geheim') secret: string) { return param; }
    }

    Example.method('Visible', 'secretKey');
    const record = mock.getRecord();
    expect(record.message).toEqual(expect.stringContaining('Visible'));
    expect(record.message).toEqual(expect.stringContaining('geheim'));
    expect(record.message).toEqual(expect.not.stringContaining('secretKey'));
});