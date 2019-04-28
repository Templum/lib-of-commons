import { IsGreaterOrEqual, Validate } from "../../lib";


describe('isGreaterOrEqual', () => {
    describe('Contract', () => {
        it('should pass if the marked parameter is greater then target', () => {
            class Example {
                @Validate()
                static invoke(@IsGreaterOrEqual(500) input: number): number {
                    return input;
                }
            }

            const result = Example.invoke(1337);
            expect(result).toBeGreaterThan(500);
        });

        it('should pass if the marked parameter is equal to the target', () => {
            class Example {
                @Validate()
                static invoke(@IsGreaterOrEqual(500) input: number): number {
                    return input;
                }
            }

            const result = Example.invoke(500);
            expect(result).toEqual(500);
        });

        it('should throw an error if the marked parameter is smaller then target', () => {
            class Example {
                @Validate()
                static invoke(@IsGreaterOrEqual(1337) input: number): number {
                    return input;
                }
            }

            try {
                Example.invoke(0);
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('is smaller then'));
            }
        });

        it('should throw an error if the marked parameter is not a number', () => {
            class Example {
                @Validate()
                static invoke(@IsGreaterOrEqual(1337) input: any): number {
                    return input;
                }
            }

            try {
                Example.invoke({});
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not a number'));
            }

            try {
                Example.invoke([]);
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not a number'));
            }

            try {
                Example.invoke(true);
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not a number'));
            }

            try {
                Example.invoke('123');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not a number'));
            }
        });
    });
});