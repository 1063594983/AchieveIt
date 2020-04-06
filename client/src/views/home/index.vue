<template>
  <div v-if="member">
    <div class="flex px3 pb1 pt3 ">
      <el-card shadow="never" style="min-width: 250px; height: 320px;">
        <div class="flex flex-column items-center px1 py2">
          <img alt="avatar" :src="avatarSrc" class="avatar circle" />
          <div class="h3 bold my1">{{ member.member_name }}</div>
          <div class="h4 opacity">{{ member.email }}</div>
          <div class="flex mt3">
            <div class="flex flex-column items-center mr2" style="width: 70px;">
              <div class="h3 bold mb1">3</div>
              <div class="opacity">项目进行</div>
            </div>
            <div class="flex flex-column items-center" style="width: 70px;">
              <div class="h3 bold mb1">6</div>
              <div class="opacity">最近活动</div>
            </div>
          </div>
        </div>

      </el-card>
      <el-card class="ml1" shadow="never" style="min-width: 700px;">
        <div class="flex flex-wrap py2" style="min-width: 700px;">
          <div class="mb3 px1" v-for="(value, key) of member" :key="key + value" style="min-width: 200px;">
            <div class="h4 mb1 opacity">{{ mapProperty[key] }}</div>
            <div class="h4 bold">{{ value || '未指定' }}</div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="px3">
      <el-card shadow="never">
        <h3 slot="header" class="m0">
          最近登录
        </h3>
        <el-table :data="[1, 2, 3].map((i) => ({ a: i, b: i, c: i }))" class="fit">
          <el-table-column label="日期" prop="a" width="100px"> </el-table-column>
          <el-table-column label="IP" prop="b">123.123.123.123</el-table-column>
          <el-table-column label="Name" prop="c">SOMETHING</el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userStore } from '@/store';

@Component
export default class Main extends Vue {
  get member() {
    return userStore.member;
  }
  get avatarSrc() {
    return userStore.gavatar;
  }
  mapProperty = {
    member_id: '成员编号',
    member_name: '姓名',
    email: '邮箱',
    department: '部门',
    leader_email: 'leader邮件',
    phone: '手机',
    job: '职位',
  };
  mounted() {
    userStore.loadMember();
  }
}
</script>

<style scoped lang="scss">
.avatar {
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 80px;
  height: 80px;
}
</style>
