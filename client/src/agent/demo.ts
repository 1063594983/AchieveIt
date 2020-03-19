import { DemoResult } from 'achieve-it-contract';
import { axiosGet } from '@/agent/utils';

const demo = {
  getHello: () => axiosGet<DemoResult>('demo', 'hello')
};

export default demo;
