import { type Config, createGenerator } from 'ts-json-schema-generator';
import { Ajv } from 'ajv';
import type { DatabasePatches } from './patch.ts';
export function generateSchemaJson() {
    const config: Config = {
        path: 'src/lib/db/patch/patch.ts',
        type: 'Patch',
    };

    const schema = createGenerator(config).createSchema(config.type);
    return schema;
}

export type JsonSchema = ReturnType<typeof generateSchemaJson>;

export function validateSchema(schema: JsonSchema, data: unknown): data is DatabasePatches {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    return validate(data);
}
