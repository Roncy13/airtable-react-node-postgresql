import { ConnectionOptions, createConnection, getRepository } from 'typeorm';
import ormconfig from '@base/ormconfig';
delete ormconfig.migrations;
delete ormconfig.cli;

export const GetConnection = (entity: any) => getRepository(entity);
export default () => createConnection(ormconfig as ConnectionOptions);
