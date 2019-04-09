import { Cache, CacheKey } from "../../lib";

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

test('it should be able to handle null and undefined as keys', () => {
    class Example {
        private counter: number = 0;
        @Cache()
        method(@CacheKey important?: any) {
            return this.counter++;
        }
    }
    const instance = new Example();

    expect(() => instance.method()).not.toThrow();
    expect(() => instance.method(undefined)).not.toThrow();
    expect(() => instance.method(null)).not.toThrow();
});

test('it should also cache the values of functions with no parameters', () => {

    class Example {
        private counter: number = 0;
        @Cache()
        increase() {
            return this.counter++;
        }
    }
    const instance = new Example();

    const firstCall = instance.increase();
    const secondCall = instance.increase();
    const thirdCall = instance.increase();

    expect(firstCall).toEqual(secondCall);
    expect(secondCall).toEqual(thirdCall);
});

test('it should treat null & undefined as keys different during caching', () => {
    class Example {
        @Cache()
        static method(@CacheKey important?: any) {
            return Date.now() + Math.floor((Math.random() * 50));
        }
    }

    const callWithNull = Example.method(null);
    const callWithUndefined = Example.method(undefined);
    const callWithImplicitUndefined = Example.method();

    expect(callWithUndefined).toEqual(callWithImplicitUndefined);
    expect(callWithNull).not.toEqual(callWithUndefined);
    expect(callWithNull).not.toEqual(callWithImplicitUndefined);
});

test('it should cache based on the specified parameters', () => {
    class Example {
        private counter: number = 0;
        @Cache()
        method(@CacheKey important: string, timestamp: number, isAdmin: boolean) {
            return this.counter++;
        }
    }
    const instance = new Example();
    const firstCall = instance.method('firstKey', Date.now(), false);
    const secondCall = instance.method('secondKey', Date.now(), true);
    const thirdCall = instance.method('firstKey', Date.now(), true);
    const fourthCall = instance.method('secondKey', Date.now(), false);

    expect(firstCall).toEqual(thirdCall);
    expect(secondCall).toEqual(fourthCall);
    expect(firstCall).not.toEqual(secondCall);
});