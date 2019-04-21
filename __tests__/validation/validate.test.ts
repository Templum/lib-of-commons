import { Validate } from "../../lib";


describe('Validate Decorator', () => {
    describe('Contract', () => {
        it('should perform no validation if no Validation Decorator is declard', () => {
            class Example {
                @Validate()
                static invoke(): boolean {
                    return true;
                }
            }

            const result = Example.invoke();
            expect(result).toBeTruthy;
        });
    });
});