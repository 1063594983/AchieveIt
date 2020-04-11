import { GetMemberResult, MemberDeleteBody, MemberGetBody, MemberPostBody, MemberPutBody } from 'achieve-it-contract';
import { createCRUD } from "@/agent/utils";

const memberAPI = createCRUD<MemberGetBody, MemberDeleteBody, MemberPutBody, MemberPostBody, GetMemberResult>('member');

export default memberAPI;
