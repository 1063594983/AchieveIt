import { GetMemberResult, MemberDeleteBody, MemberGetBody, MemberPostBody, MemberPutBody } from 'achieve-it-contract';
import { createCRUD, baseURL } from "@/agent/utils";
import axios from 'axios';

const memberCRUD = createCRUD<MemberGetBody, MemberDeleteBody, MemberPutBody, MemberPostBody, GetMemberResult>('member');

const memberAPI = {
    ...memberCRUD,
    getAll: async () => {
        const result = await axios.get(`${baseURL}/member/getAllMembers`);
        return result.data;
    },
    ofProject: async (project_id) => {
        const result = await axios.get(`${baseURL}/member/getMemberRoleInProject/${project_id}`);
        return result.data;
    }
}

export default memberAPI;
