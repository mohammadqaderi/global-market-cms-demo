export class ErrorMessages {
  requiredField(field: string) {
    return `${field} is required`;
  }

  minLength(field: string, length: number) {
    return `${field} length must not be less than ${length} characters`;
  }

  maxLength(field: string, length: number) {
    return `${field} length must not be more than ${length} characters`;
  }

  notValidField(field: string) {
    return `Please provide a valid ${field}`;
  }

  mustMatch(fields: string) {
    return `${fields} must match!`;
  }
}
