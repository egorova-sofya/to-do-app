interface Inputs {
  [key: string]: string | number | File;
}

export interface ValidationSchema {
  [key: string]: {
    required?: string;
    min?: {
      value: number;
      message: string;
    };
    max?: {
      value: number;
      message: string;
    };

    oneOf?: {
      value: string[];
      message: string;
    };
    matchedFields?: {
      value: string[];
      message: string;
    };
  };
}

export interface InputErrors {
  [key: string]: string | undefined;
}

export const getInputErrors = (
  inputs: Inputs,
  schema: ValidationSchema
): InputErrors | null => {
  let errors: InputErrors | null = {};

  for (const [schemaName, _] of Object.entries(schema)) {
    for (const [inputName, inputValue] of Object.entries(inputs)) {
      if (schema[schemaName]?.required && schemaName === inputName) {
        if (typeof inputValue == "string" && inputValue.length === 0) {
          errors = {
            ...errors,
            [schemaName]: schema[schemaName]?.required,
          };
        } else if (inputValue instanceof File && inputValue.size === 0) {
          errors = {
            ...errors,
            [schemaName]: schema[schemaName]?.required,
          };
        }
      }

      if (
        schema[schemaName]?.oneOf &&
        schema[schemaName]?.oneOf?.value.filter(
          (item) => item == inputs[schemaName]
        ).length == 0
      ) {
        errors = {
          ...errors,
          [schemaName]: schema[schemaName]?.oneOf?.message,
        };
      }

      if (
        schema[schemaName]?.matchedFields &&
        schema[schemaName]?.matchedFields?.value.filter(
          (item) => inputs[item] == inputs[schemaName]
        ).length == 0
      ) {
        errors = {
          ...errors,
          [schemaName]: schema[schemaName]?.matchedFields?.message,
        };
      }

      if (schema[schemaName].max && schemaName == inputName) {
        if (
          inputValue instanceof File &&
          inputValue.size > schema[schemaName]!.max!.value
        ) {
          errors = {
            ...errors,
            [schemaName]: schema[schemaName]?.max?.message,
          };
        } else if (
          typeof inputs[schemaName] == "string" &&
          inputs[schemaName].toString().length > schema[schemaName]!.max!.value
        ) {
          errors = {
            ...errors,
            [schemaName]: schema[schemaName]?.max?.message,
          };
        }
      }
      if (schema[schemaName].min && schemaName == inputName) {
        if (
          inputValue instanceof File &&
          inputValue.size < schema[schemaName]!.min!.value
        ) {
          errors = {
            ...errors,
            [schemaName]: schema[schemaName]?.min?.message,
          };
        } else if (
          typeof inputs[schemaName] == "string" &&
          +inputs[schemaName] < schema[schemaName]!.min!.value
        ) {
          errors = {
            ...errors,
            [schemaName]: schema[schemaName]?.min?.message,
          };
        } else if (
          typeof inputs[schemaName] == "number" &&
          inputs[schemaName] < schema[schemaName]!.min!.value
        ) {
          errors = {
            ...errors,
            [schemaName]: schema[schemaName]?.min?.message,
          };
        }
      }
    }
  }
  return Object.entries(errors).length === 0 ? null : errors;
};
