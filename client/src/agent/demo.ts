import axios from 'axios';
import { DemoResult } from 'achieve-it-contract';
const baseURL = 'api/demo';

const demo = {
  getHello: async function(): Promise<string> {
    try {
      const result = await axios.get<DemoResult>(`${baseURL}/hello`);
      return result.data.project;
    } catch (e) {
      console.error();
      return '';
    }
  }
};

export default demo;
