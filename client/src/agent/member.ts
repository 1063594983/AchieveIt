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
        const result = await axios.get(`${baseURL}/member/getProjectMemberList/${project_id}`);
        return result.data;
    },
    addToProject: async (project_id, details) => {
        const result = await axios.post(`${baseURL}/member/addMemberToProject/${project_id}`, details);
        return result.data;
    },
    deleteFromProject: async (project_id, member_id) => {
        const result = await axios.delete(`${baseURL}/member/deleteFromProject/${project_id}/${member_id}`);
        return result;
    },
    changeProjectRole: async (project_id, details) => {
        // console.log(details);
        const result = await axios.put(`${baseURL}/member/changeMemberRole/${project_id}`, {
            ...details
        })
        return result.data;
    }
    // getProjectMembers: async (project_id) => {
    //     const result = await axios.get(`${baseURL}/member/getProjectMemberList/${project_id}`);
    //     return result.data;
    // }
}

export default memberAPI;
