import { isInteger, Validate } from "../../lib";


describe('isInteger', () => {
    describe('Contract', () => {
        it('should pass if the marked paramter is an integer', () => {
            class Example {
                @Validate()
                static invoke(@isInteger() input: number): number {
                    return input;
                }
            }

            const result = Example.invoke(1337);
            expect(Number.isInteger(result)).toBeTruthy;
        });

        it('should throw an error if the marked parameter is not an integer', () => {
            class Example {
                @Validate()
                static invoke(@isInteger() input: any): number {
                    return input;
                }
            }

            try {
                Example.invoke('250');
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not an Integer'));
            }

            try {
                Example.invoke('3.2');
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not an Integer'));
            }

            try {
                Example.invoke(null);
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not an Integer'));
            }

            try {
                Example.invoke(undefined);
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not an Integer'));
            }

            try {
                Example.invoke({});
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not an Integer'));
            }

            try {
                Example.invoke([]);
                fail('should throw an error');
            } catch (error) {
                expect(error.message).toEqual(expect.stringContaining('was not an Integer'));
            }
        });
    });
});