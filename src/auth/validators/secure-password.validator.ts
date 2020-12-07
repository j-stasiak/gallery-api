import { ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';

export function IsPasswordSecure(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordSecure',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedValue = (args.object as any)[propertyName];
          return /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(relatedValue);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Given password does not satisfy securitiy requirements!';
        }
      },
    });
  }
}