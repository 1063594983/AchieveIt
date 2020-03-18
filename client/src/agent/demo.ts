import axios from 'axios';
const baseURL = 'api/demo';
const demo = {
  getHello: async function(): Promise<string> {
    try {
      const result = await axios.get<{ project: string }>(`${baseURL}/hello`);
      return result.data.project;
    } catch (e) {
      console.error();
      return '';
    }
  }
};

export default demo;
