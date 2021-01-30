import { Options } from './src/node_modules/@mikro-orm/core';
import { TsMorphMetadataProvider } from './src/node_modules/@mikro-orm/reflection';

export default {
  metadataProvider: TsMorphMetadataProvider,
  entities: ['./src/entities'],
  entitiesTs: ['./src/entities'],
  type: 'sqlite',
  dbName: 'dev-db',
  debug: true, // TODO: Make this based on the env variable
} as Options;
