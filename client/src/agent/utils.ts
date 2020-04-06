import axios from 'axios';
import { Authorization, ResultCommon } from "achieve-it-contract";
import { Subtract } from "utility-types";
import { authBody, wrapToken } from "@/agent/index";

const baseURL = 'http://localhost:3000';

function sendErrorMsg(type: string, url: string, payload?: { body?: {}; response?: {} }) {
  console.error(`${type} ${url} failed`);

  if (payload) {
    console.dir(payload);
  }
}

export async function axiosPost<Response extends ResultCommon>(namespace: string, endpoint: string, body?: object) {
  const url = `${baseURL}/${namespace}/${endpoint}`;
  const result = await axios.post<Response>(url, body);
  if (result.data.status === 'error') {
    sendErrorMsg('POST', url, { body, response: result.data });
    throw new Error('error code');
  }
  return result.data;
}

export async function axiosGet<Response extends ResultCommon>(namespace: string, endpoint: string, body?: object) {
  const url = `${baseURL}/${namespace}/${endpoint}`;
  const result = await axios.get<Response>(url, body);
  if (result.data.status === 'error') {
    sendErrorMsg('GET', url, { response: result.data });
    throw new Error('error code');
  }
  return result.data;
}

export async function axiosDelete<Response extends ResultCommon>(namespace: string, endpoint: string, body?: object) {
  const url = `${baseURL}/${namespace}/${endpoint}`;
  const result = await axios.delete<Response>(url, body);
  if (result.data.status === 'error') {
    sendErrorMsg('DELETE', url, { response: result.data });
    throw new Error('error code');
  }
  return result.data;
}

export async function axiosPut<Response extends ResultCommon>(namespace: string, endpoint: string, body?: object) {
  const url = `${baseURL}/${namespace}/${endpoint}`;
  const result = await axios.put<Response>(url, body);
  if (result.data.status === 'error') {
    sendErrorMsg('PUT', url, { body, response: result.data });
    throw new Error('error code');
  }
  return result.data;
}

export function createCRUD<
  GetBody extends Authorization,
  DeleteBody extends Authorization,
  PutBody extends Authorization,
  PostBody extends Authorization,
  GetResult extends ResultCommon
  >(namespace: string) {
  return {
    get: (id: string, body: Subtract<GetBody, authBody>) => axiosGet<GetResult>(namespace, id, wrapToken(body)),
    insert: (body: Subtract<PostBody, authBody>) => axiosPost(namespace, '', wrapToken(body)),
    update: (id: string, body: Subtract<PutBody, authBody>) => axiosPut(namespace, id, wrapToken(body)),
    delete: (id: string, body: Subtract<DeleteBody, authBody>) => axiosDelete(namespace, id, wrapToken(body)),
  };
}
