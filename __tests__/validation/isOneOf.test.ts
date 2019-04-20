import { isOneOf, Validate } from "../../lib";


describe('isOneOf', () => {
    describe('Contract', () => {
        it('should pass if the marked paramter is part of whitelist', () => {
            class Example {
                @Validate()
                static invoke(@isOneOf([1, 2, 3, 4]) input: number): boolean {
                    return true;
                }
            }

            const result = Example.invoke(1);
            expect(result).toBeTruthy;
        });

        it('should throw an error if the marked parameter is not in whitelist', () => {
            class Example {
                @Validate()
                static invoke(@isOneOf([1, 2, 3, 4]) input: any): boolean {
                    return true;
                }
            }

            try {
                Example.invoke(4123);
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not in whitelist'));
            }
        });
    });
});