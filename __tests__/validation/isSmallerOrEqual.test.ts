import { IsSmallerOrEqual, Validate } from "../../lib";


describe('isGreaterOrEqual', () => {
    describe('Contract', () => {
        it('should pass if the marked parameter is greater then target', () => {
            class Example {
                @Validate()
                static invoke(@IsSmallerOrEqual(500) input: number): number {
                    return input;
                }
            }

            const result = Example.invoke(37);
            expect(result).toBeLessThan(500);
        });

        it('should pass if the marked parameter is equal to the target', () => {
            class Example {
                @Validate()
                static invoke(@IsSmallerOrEqual(500) input: number): number {
                    return input;
                }
            }

            const result = Example.invoke(500);
            expect(result).toEqual(500);
        });

        it('should throw an error if the marked parameter is greater then target', () => {
            class Example {
                @Validate()
                static invoke(@IsSmallerOrEqual(1337) input: number): number {
                    return input;
                }
            }

            try {
                Example.invoke(9000);
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('is greather then'));
            }
        });

        it('should throw an error if the marked parameter is not a number', () => {
            class Example {
                @Validate()
                static invoke(@IsSmallerOrEqual(1337) input: any): number {
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