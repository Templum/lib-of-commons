import { Debounce } from "../../lib";


describe('Debounce Decorator', () => {
    describe('Contract', () => {
        it('should ignore additional calls for debounce period', async () => {
            class Example {
                public spy: () => void;
                constructor() {
                    const mock = jest
                        .fn()
                        .mockImplementation(() => { });
                    this.spy = mock;
                }

                @Debounce(4)
                invoke(): void {
                    return this.spy();
                }
            }

            const instance = new Example();

            instance.invoke();
            instance.invoke();
            instance.invoke();
            instance.invoke();

            await new Promise(resolve => setTimeout(resolve, 8));

            instance.invoke();
            instance.invoke();
            instance.invoke();
            instance.invoke();
            expect(instance.spy).toBeCalledTimes(2);
        });
    });

    describe('Special Cases', () => {
        it('should not debounce if value is 0', () => {
            class Example {
                public spy: () => void;
                constructor() {
                    const mock = jest
                        .fn()
                        .mockImplementation(() => { });
                    this.spy = mock;
                }

                @Debounce(0)
                invoke(): void {
                    return this.spy();
                }
            }

            const instance = new Example();

            instance.invoke();
            instance.invoke();
            expect(instance.spy).toBeCalledTimes(2);
        });

        it('should not debounce if value is negative', () => {
            class Example {
                public spy: () => void;
                constructor() {
                    const mock = jest
                        .fn()
                        .mockImplementation(() => { });
                    this.spy = mock;
                }

                @Debounce(-1)
                invoke(): void {
                    return this.spy();
                }
            }

            const instance = new Example();

            instance.invoke();
            instance.invoke();
            expect(instance.spy).toBeCalledTimes(2);
        });
    });
});