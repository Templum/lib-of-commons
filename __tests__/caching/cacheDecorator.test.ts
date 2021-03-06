import { Cache, CacheKey } from "../../lib";

async function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Cache Decorator', () => {
    describe('Contract', () => {
        it('should cache the computed value based on the input parameters', async () => {
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

        it('should cache the computed value for the defined timespan', async () => {
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

        it('should cache the computed value only based on the marked input parameters', () => {
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
    });

    describe('Special Cases', () => {
        it('should handle null or undefined keys', () => {
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
            expect(() => instance.method()).not.toThrow();
            expect(() => instance.method(undefined)).not.toThrow();
            expect(() => instance.method(null)).not.toThrow();
        });

        it('should cache the computed value even if there is no input paremter', async () => {
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

        it('should treat null & undefined as different keys during caching', () => {
            class Example {
                @Cache()
                static method(@CacheKey important?: any) {
                    return Math.floor((Math.random() * 100));
                }
            }

            const callWithNull = Example.method(null);
            const callWithUndefined = Example.method(undefined);
            const callWithImplicitUndefined = Example.method();

            expect(callWithUndefined).toEqual(callWithImplicitUndefined);
            expect(callWithNull).not.toEqual(callWithUndefined);
            expect(callWithNull).not.toEqual(callWithImplicitUndefined);
        });
    });
});
