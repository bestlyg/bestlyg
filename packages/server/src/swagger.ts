import { Type } from '@nestjs/common';
import { isZodModel } from '@bestlyg/common';
import z from 'zod';
import { createSchema } from 'zod-openapi';
import { SchemaObjectFactory as SchemaObjectFactoryClass } from '@nestjs/swagger/dist/services/schema-object-factory';

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */

function getSchemaObjectFactory(): Type<SchemaObjectFactoryClass> {
    return require('@nestjs/swagger/dist/services/schema-object-factory').SchemaObjectFactory;
}

const patchedNestJsSwagger = Symbol('patchedNestJsSwagger');

function patchNestJsSwagger(SchemaObjectFactory = getSchemaObjectFactory()) {
    if (SchemaObjectFactory.prototype[patchedNestJsSwagger]) return;
    const defaultExplore = SchemaObjectFactory.prototype.exploreModelSchema;

    const extendedExplore: SchemaObjectFactoryClass['exploreModelSchema'] =
        function exploreModelSchema(
            this: SchemaObjectFactoryClass | undefined,
            type,
            schemas,
            schemaRefsStack,
        ) {
            if (this && this['isLazyTypeFunc'](type)) {
                const factory = type as () => Type<unknown>;
                type = factory();
            }
            if (isZodModel(type)) {
                schemas[type.name] = createSchema(type.getSchema()).schema as any;
                return type.name;
            }
            return defaultExplore.call(this, type, schemas, schemaRefsStack);
        };

    SchemaObjectFactory.prototype.exploreModelSchema = extendedExplore;
    SchemaObjectFactory.prototype[patchedNestJsSwagger] = true;
}

patchNestJsSwagger();
