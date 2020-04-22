<template>
  <div>
    <h1>配置管理</h1>
    <div class="flex items-center justify-between">
      <el-button icon="el-icon-document-add" @click="setCreateVisible">添加配置</el-button>
    </div>

    <el-card shadow="hover" class="mt2" v-for="config in configs" :key="config.config_id">
      <div class="flex justify-between items-center mb2">
        <div class="bold h3">项目ID: {{ config.project_id }}</div>
        <div class="h6 opacity">ID: {{ config.config_id }}</div>
      </div>
      <div class="my1 h5">
        <b class="opacity">git地址</b>
        {{ config.git_address }}
      </div>
      <div class="my1 h5">
        <b class="opacity">文件服务器上的根目录</b>
        {{ config.server_menu }}
      </div>
      <div class="my1 h5">
        <b class="opacity">虚拟机空间</b>
        {{ config.vm_space }}
      </div>

      <div class="flex justify-between items-center mt2">
        <div class="flex items-center">
          <el-button @click="setChangeVisible(config)" >修改</el-button>
        </div>
      </div>
    </el-card>

    <el-dialog title="修改配置" :visible.sync="changeFormVisible">
      <el-form :model="form" label-position="left" label-width="10rem">
        <el-form-item label="git地址">
          <el-input placeholder="请输入git地址" v-model="form.git_address"></el-input>
        </el-form-item>
        <el-form-item label="文件服务器上的根目录">
          <el-input placeholder="请输入根目录" v-model="form.server_menu"></el-input>
        </el-form-item>
        <el-form-item label="虚拟机空间">
          <el-input placeholder="请输入虚拟机空间" v-model="form.vm_space"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="changeConfig">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加配置" :visible.sync="configFormVisible">
      <el-form :model="form" label-position="left" label-width="10rem">
        <el-form-item label="项目ID">
          <el-autocomplete
            class="inline-input"
            v-model="form.project_id"
            :fetch-suggestions="querySearch"
            placeholder="请输入项目ID"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="git地址">
          <el-input placeholder="请输入git地址" v-model="form.git_address"></el-input>
        </el-form-item>
        <el-form-item label="文件服务器上的根目录">
          <el-input placeholder="请输入根目录" v-model="form.server_menu"></el-input>
        </el-form-item>
        <el-form-item label="虚拟机空间">
          <el-input placeholder="请输入虚拟机空间" v-model="form.vm_space"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="createConfig">创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Config, Project } from 'achieve-it-contract';
import agent from '@/agent';
import { Notify } from '../../theme';
import { userStore } from '@/store';

@Component
export default class Configs extends Vue {
  configs: Config[] = [];
  projects: { value: string }[] = [];
  existed_projects: string[] = [];
  configFormVisible = false;
  changeFormVisible = false;
  form = {
    project_id: '',
  };

  async refresh() {
    const result = await agent.config.getAll();

    const result2 = await agent.project.getAll();
    this.configs = result.data.config_list;
    console.log(this.projects)
    this.projects = result2.project_list.filter(x=>x.status=='申请立项').map((x) => {
      return { value: x.project_id.toString() };
    });
    this.existed_projects = this.configs.map((x) => {
      return x.project_id.toString();
    });
  }
  mounted() {
    this.refresh();
  }
  createFilter(queryString) {
    return (restaurant) => {
      return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    };
  }
  async querySearch(queryString, cb) {
    const projects = this.projects;
    const results = queryString ? projects.filter(this.createFilter(queryString)) : projects;
    // 调用 callback 返回建议列表的数据
    cb(results);
  }
  async createConfig() {
    if (this.existed_projects.indexOf(this.form.project_id) !== -1) {
      Notify.error('失败', '此项目已存在配置，若需要更改请点击修改按钮');
    } else {
      const result = await agent.config.postConfig(this.form);
      if(result.data.status == 'ok') {
        // 修改项目状态为已建立配置库
        await agent.project.setStatus(this.form.project_id, {
          is_config: 1
        });
        Notify.success('成功', '配置项目成功');
      } else {
        Notify.error('失败', `项目${this.form.project_id}配置失败`);
      }
    }
    this.refresh();
    this.configFormVisible = false;
  }
  setCreateVisible() {
     if(userStore.member.job == "组织级配置管理员") {
      this.configFormVisible = true;
    } else {
      Notify.error('无法创建', `只有配置管理员才能创建，您没有权限`)
    }
  }
  setChangeVisible(config) {
    if(userStore.member.job == "组织级配置管理员") {
      this.changeFormVisible = true;
      this.form = JSON.parse(JSON.stringify(config));
    } else {
      Notify.error('无法修改', `只有配置管理员才能修改，您没有权限`)
    }
  }
  async changeConfig() {
    const result = await agent.config.putConfig(this.form);
    if(result.data.status == 'ok') {
        Notify.success('成功', '修改项目配置成功');
      } else {
        Notify.error('失败', `修改项目${this.form.project_id}配置失败`);
      }
      this.refresh();
      this.changeFormVisible = false;
  }
  FormInit() {
    return {
      project_id: '',
      defect_content: '',
    };
  }
  onClose() {
    this.form = this.FormInit();
    this.configFormVisible = false;
    this.changeFormVisible = false;
  }
}
</script>

<style scoped></style>
