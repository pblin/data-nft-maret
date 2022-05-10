import Ajv from 'ajv';

export const uploadSchema = {
  type: "object",
  required: ['fields', 'schema_name'],
  properties: {
    fields: {
      type: "array",
      minItems: 1,
      items: {
        "type": "object",
        required: ["type", "name", "description", "label"],
        additionalProperties: false,
        "properties": {
          description: {type: "string"},
          type: {type: "string"},
          name: {type: "string"},
          label: {type: "string"}
        }
      }
    },
    "schema_name": {
      type: "string"
    }
  }
};

export class SchemaValidator {
  async validate(schema: any, data: any) {
    return new Promise((resolve) => {
      let ajv = new Ajv({allErrors: true});
      let validate = ajv.compile(schema);
      let valid = validate(data);

      if(valid) {
        resolve([]);
      } else {
        resolve(validate.errors);
      }
    })
  }
}
