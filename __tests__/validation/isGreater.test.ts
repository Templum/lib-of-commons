import { isGreater, Validate } from "../../lib";


describe('isGreater', () => {
    describe('Contract', () => {
        it('should pass if the marked paramter is greater then target', () => {
            class Example {
                @Validate()
                static invoke(@isGreater(500) input: number): number {
                    return input;
                }
            }

            const result = Example.invoke(1337);
            expect(result).toBeGreaterThan(500);
        });

        it('should throw an error if the marked parameter is smaller then target', () => {
            class Example {
                @Validate()
                static invoke(@isGreater(1337) input: number): number {
                    return input;
                }
            }

            try {
                Example.invoke(0);
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not greater then'));
            }
        });

        it('should throw an error if the marked parameter is equal target', () => {
            class Example {
                @Validate()
                static invoke(@isGreater(1337) input: number): number {
                    return input;
                }
            }

            try {
                Example.invoke(1337);
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not greater then'));
            }
        });
    });
});