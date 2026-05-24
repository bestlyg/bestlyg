import { Type } from '@nestjs/common';
import { isZodModel } from '@bestlyg/server-shared';
import z from 'zod';
import path from 'path';
// import { createSchema } from 'zod-openapi';

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */

type SchemaObjectFactoryClass = {
    exploreModelSchema(type: any, schemas: Record<string, any>, schemaRefsStack: string[]): string;
    isLazyTypeFunc(type: any): boolean;
};

type SchemaObjectFactoryConstructor = Type<SchemaObjectFactoryClass> & {
    prototype: SchemaObjectFactoryClass & Record<PropertyKey, any>;
};

function getSchemaObjectFactory(): Type<SchemaObjectFactoryClass> {
    const packagePath = require.resolve('@nestjs/swagger/package.json');
    const factoryPath = path.join(
        path.dirname(packagePath),
        'dist',
        'services',
        'schema-object-factory.js',
    );
    return require(factoryPath).SchemaObjectFactory;
}

const patchedNestJsSwagger = Symbol('patchedNestJsSwagger');

function patchNestJsSwagger(
    SchemaObjectFactory = getSchemaObjectFactory() as SchemaObjectFactoryConstructor,
) {
    if (SchemaObjectFactory.prototype[patchedNestJsSwagger]) return;
    const defaultExplore = SchemaObjectFactory.prototype.exploreModelSchema;

    const extendedExplore: SchemaObjectFactoryClass['exploreModelSchema'] =
        function exploreModelSchema(this, type, schemas, schemaRefsStack) {
            if (this && this['isLazyTypeFunc'](type)) {
                const factory = type as () => Type<unknown>;
                type = factory();
            }
            if (isZodModel(type)) {
                // schemas[type.name] = createSchema(type.getSchema()).schema as any;
                const zodModel = type as any;
                const modelName = zodModel.getModelName?.() ?? zodModel.name;
                schemas[modelName] = z.toJSONSchema(zodModel.getSchema()) as any;
                return modelName;
            }
            return defaultExplore.call(this, type, schemas, schemaRefsStack);
        };

    SchemaObjectFactory.prototype.exploreModelSchema = extendedExplore;
    SchemaObjectFactory.prototype[patchedNestJsSwagger] = true;
}

patchNestJsSwagger();
