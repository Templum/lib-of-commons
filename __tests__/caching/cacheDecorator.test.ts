import { Cache } from "../../lib";

async function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test('it should cache the result based on the input parameters', async () => {
    const spy = jest.fn((x) => x);

    class Example {
        @Cache(30 * 1000)
        static method(key1: string, key2: number, key3: object) {
            spy(key1);
            return Date.now();
        }
    }

    const firstCall = Example.method('hello', 32, {});
    const secondCall = Example.method('hello', 32, {});

    await wait(200);

    const thirdCall = Example.method('hello', 32, { param: true });
    const fourthCall = Example.method('hello', 32, {});

    expect(firstCall).toEqual(secondCall);
    expect(firstCall).toEqual(fourthCall)
    expect(firstCall).not.toEqual(thirdCall);

    expect(spy).toBeCalledTimes(2);
});

test('it should cache the result for the defined timespan', async () => {
    const spy = jest.fn((x) => x + Date.now());

    class Example {
        @Cache(1000)
        static method(key1: string) {
            return spy(key1);
        }
    }

    const firstCall = Example.method('hello');
    const secondCall = Example.method('hello');

    await wait(1500);

    const thirdCall = Example.method('hello');

    expect(firstCall).toEqual(secondCall);
    expect(firstCall).not.toEqual(thirdCall);
    expect(spy).toBeCalledTimes(2);
});