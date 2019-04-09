import { IToolboxLogger, Level } from "../../lib";

export class MockLogger implements IToolboxLogger {
    public logs: any[];

    constructor(){
        this.logs = [];
    }

    debug(message?: any, ...optionalParams: any[]): void {
        this.logs.push({level: Level.Debug, message});
    }    
    info(message?: any, ...optionalParams: any[]): void {
        this.logs.push({level: Level.Info, message});
    }
    warn(message?: any, ...optionalParams: any[]): void {
        this.logs.push({level: Level.Warn, message});
    }
    error(message?: any, ...optionalParams: any[]): void {
        this.logs.push({level: Level.Error, message});
    }

    getRecord(): {level: Level, message: any} {
        return this.logs.splice(0, 1)[0];
    }
}