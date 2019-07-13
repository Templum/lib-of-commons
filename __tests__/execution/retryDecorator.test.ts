import { AsyncRetry, Retry } from "../../lib";

function isRetrieableError(error: Error) { return error.message === 'Expected'; }

describe('Retry Decorator', () => {
    describe('Contract', () => {
        it('should retry the function if it fails with an retriable error', () => {
            class Example {
                public spy: () => boolean;

                constructor() {
                    const mock = jest
                        .fn()
                        .mockImplementationOnce(() => { throw new Error('Expected') })
                        .mockImplementationOnce(() => true);
                    this.spy = mock;
                }

                @Retry(isRetrieableError)
                network(): boolean {
                    return this.spy()
                }
            }

            const instance = new Example();

            const result = instance.network();
            expect(result).toEqual(true);
            expect(instance.spy).toBeCalledTimes(2);
        });

        it('should retry the function multiple times', () => {
            class Example {
                public spy: () => boolean;

                constructor() {
                    const mock = jest
                        .fn()
                        .mockImplementationOnce(() => { throw new Error('Expected') })
                        .mockImplementationOnce(() => { throw new Error('Expected') })
                        .mockImplementationOnce(() => { throw new Error('Expected') })
                        .mockImplementationOnce(() => true);
                    this.spy = mock;
                }

                @Retry(isRetrieableError, 4)
                network(): boolean {
                    return this.spy()
                }
            }

            const instance = new Example();

            const result = instance.network();
            expect(result).toEqual(true);
            expect(instance.spy).toBeCalledTimes(4);
        });

        it('should retry at most n times before failing', () => {
            class Example {
                public spy: () => boolean;

                constructor() {
                    const mock = jest
                        .fn()
                        .mockImplementation(() => { throw new Error('Expected') })
                    this.spy = mock;
                }

                @Retry(isRetrieableError, 40)
                public network(): boolean {
                    return this.spy()
                }
            }

            const instance = new Example();

            expect(instance.network.bind(instance)).toThrowError('Expected');
            expect(instance.spy).toBeCalledTimes(40);
        });

        it('should not retry the function if the error is not retriable', () => {
            class Example {
                public spy: () => boolean;

                constructor() {
                    const mock = jest
                        .fn()
                        .mockImplementation(() => { throw new Error('Unexpected') })
                    this.spy = mock;
                }

                @Retry(isRetrieableError)
                public network(): boolean {
                    return this.spy()
                }
            }

            const instance = new Example();

            expect(instance.network.bind(instance)).toThrowError('Unexpected');
            expect(instance.spy).toBeCalledTimes(1);
        });
    });

    describe('Special Cases', () => {
        it('should not allow 0 as parameter for times', () => {
            try {
                class Example {
                    public spy: () => boolean;

                    constructor() {
                        const mock = jest.fn(() => true)
                        this.spy = mock;
                    }

                    @Retry(isRetrieableError, 0)
                    network(): boolean {
                        return this.spy()
                    }
                }
            } catch (error) {
                expect(error.message).toEqual('Times need to be at least 1')
            }
        });
    });
});

describe('Async Retry Decorator', () => {
    describe('Contract', () => {
        it('should retry the function if it fails with an retriable error', async () => {
            class Example {
                public spy: () => boolean;

                constructor() {
                    const mock = jest
                        .fn()
                        .mockImplementationOnce(() => { throw new Error('Expected') })
                        .mockImplementationOnce(() => true);
                    this.spy = mock;
                }

                @AsyncRetry(isRetrieableError)
                async network(): Promise<boolean> {
                    return this.spy()
                }
            }

            const instance = new Example();

            const result = await instance.network();
            expect(result).toEqual(true);
            expect(instance.spy).toBeCalledTimes(2);
        });

        it('should retry the function multiple times', async () => {
            class Example {
                public spy: () => boolean;

                constructor() {
                    const mock = jest
                        .fn()
                        .mockImplementationOnce(() => { throw new Error('Expected') })
                        .mockImplementationOnce(() => { throw new Error('Expected') })
                        .mockImplementationOnce(() => { throw new Error('Expected') })
                        .mockImplementationOnce(() => true);
                    this.spy = mock;
                }

                @AsyncRetry(isRetrieableError, 4)
                async network(): Promise<boolean> {
                    return this.spy()
                }
            }

            const instance = new Example();

            const result = await instance.network();
            expect(result).toEqual(true);
            expect(instance.spy).toBeCalledTimes(4);
        });

        it('should retry at most n times before failing', async () => {
            class Example {
                public spy: () => boolean;

                constructor() {
                    const mock = jest
                        .fn()
                        .mockImplementation(() => { throw new Error('Expected') })
                    this.spy = mock;
                }

                @AsyncRetry(isRetrieableError, 40)
                async network(): Promise<boolean> {
                    return this.spy()
                }
            }

            const instance = new Example();

            try {

            } catch (error) {
                expect(error.message).toEqual('Expected');
                expect(instance.spy).toBeCalledTimes(40);
            }
        });

        it('should not retry the function if the error is not retriable', async () => {
            class Example {
                public spy: () => boolean;

                constructor() {
                    const mock = jest
                        .fn()
                        .mockImplementation(() => { throw new Error('Unexpected') })
                    this.spy = mock;
                }

                @AsyncRetry(isRetrieableError)
                async network(): Promise<boolean> {
                    return this.spy()
                }
            }

            const instance = new Example();

            try {
                await instance.network();
            } catch (error) {
                expect(error.message).toEqual('Unexpected');
                expect(instance.spy).toBeCalledTimes(1);
            }
        });
    });

    describe('Special Cases', () => {
        it('should not allow 0 as parameter for times', () => {
            try {
                class Example {
                    public spy: () => boolean;

                    constructor() {
                        const mock = jest.fn(() => true)
                        this.spy = mock;
                    }

                    @AsyncRetry(isRetrieableError, 0)
                    async network(): Promise<boolean> {
                        return this.spy()
                    }
                }
            } catch (error) {
                expect(error.message).toEqual('Times need to be at least 1')
            }
        });
    });
});
