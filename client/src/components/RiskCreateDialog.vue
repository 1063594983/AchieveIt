<template>
    <el-dialog
            title="新建风险记录"
            :visible.sync="visible"
            width="420px"
            :close-on-click-modal="false"
            :before-close="onClose"
    >
        <el-form :model="form" label-position="left" label-width="5rem">
            <el-form-item label="项目选择">
                <el-select v-model="form.project_id" placeholder="请选择">
                    <el-option
                            v-for="item in projects"
                            :key="item.project_id"
                            :label="`${item.project_name} (${item.project_id})`"
                            :value="item.project_id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="风险描述">
                <el-input type="textarea" v-model="form.detail" placeholder="输入风险描述"></el-input>
            </el-form-item>
            <!-- <el-form-item label="状态选择">
                <el-select v-model="form.solve_status" placeholder="请选择">
                    <el-option
                            v-for="i in [{
                              label: '未处理',
                              value: 0
                            }, {
                              label: '正在跟进',
                              value: 1
                            }, {
                              label: '已解决',
                              value: 2
                            }]"
                            :key="i.value"
                            :label="i.label"
                            :value="i.index"
                    ></el-option>
                </el-select>
            </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onClose">取消</el-button>
            <el-button type="primary" @click="createRisk">创建</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
  import { Component, Prop, Vue} from 'vue-property-decorator';
  import { Project, RiskPostBody } from 'achieve-it-contract';
  import { Subtract } from 'utility-types';
  import agent, { authBody } from '@/agent';
import { userStore } from '../store';

  type RiskDraft = Subtract<RiskPostBody, authBody>;
  @Component
  export default class RiskCreateDialog extends Vue {
    @Prop({ required: true }) visible!: boolean;
    @Prop({ required: true }) onClose!: () => void;
    @Prop({ required: true }) onCreate!: (record) => Promise<boolean>;

    projects: Project[] = [];

    mounted() {
      // 获得用户参与的项目
      agent.project.getJoinProjects(userStore.currentUser.member_id).then((result) => {
        // 筛选进行中的项目
        this.projects = result.project_list.filter(x=>x.status=='进行中');
      });
    }

    form = {
      detail : null,
      project_id: '',
      solve_status: 0
    };

    async createRisk() {
      const result = await this.onCreate(this.form);
      if (result) {
        this.onClose();
      }
    }
  }
</script>

<style scoped>

</style>