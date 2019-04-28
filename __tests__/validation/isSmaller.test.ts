import { isSmaller, Validate } from "../../lib";


describe('isSmaller', () => {
    describe('Contract', () => {
        it('should pass if the marked paramter is smaller then target', () => {
            class Example {
                @Validate()
                static invoke(@isSmaller(500) input: number): number {
                    return input;
                }
            }

            const result = Example.invoke(0);
            expect(result).toBeLessThan(500);
        });

        it('should throw an error if the marked parameter is greater then target', () => {
            class Example {
                @Validate()
                static invoke(@isSmaller(100) input: number): number {
                    return input;
                }
            }

            try {
                Example.invoke(250);
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not smaller then'));
            }
        });

        it('should throw an error if the marked parameter is equal target', () => {
            class Example {
                @Validate()
                static invoke(@isSmaller(1337) input: number): number {
                    return input;
                }
            }

            try {
                Example.invoke(1337);
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not smaller then'));
            }
        });

        it('should throw an error if the marked parameter is not a number', () => {
            class Example {
                @Validate()
                static invoke(@isSmaller(1337) input: any): number {
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