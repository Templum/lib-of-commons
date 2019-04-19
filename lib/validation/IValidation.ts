export interface IValidation {
    validate: (i: any) => boolean;
    index: number;
    message: string;
}
