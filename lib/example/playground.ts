import { Level, Log } from "../logging/logDecorator";
import { Sanitize } from "../logging/sanitizeParamDecorator";

class Employee {

    constructor(
        private firstName: string,
        private lastName: string,
    ) {
    }

    @Log(Level.Info)
    public greet(message: string, @Sanitize('Geheim!') password: string, @Sanitize() secret: string): string {
        return `${this.firstName} ${this.lastName} says: ${message} and has password ${password}`;
    }

}

const emp = new Employee('Mohan Ram', 'Ratnakumar');
emp.greet('hello', '12312412312', 'secret');
