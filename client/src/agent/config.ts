import { ConfigDeleteBody, ConfigGetBody, ConfigPostBody, ConfigPutBody, GetConfigResult } from 'achieve-it-contract';
import { createCRUD } from '@/agent/index';

const configAPI = createCRUD<ConfigGetBody, ConfigDeleteBody, ConfigPutBody, ConfigPostBody, GetConfigResult>('config');

export default configAPI;
