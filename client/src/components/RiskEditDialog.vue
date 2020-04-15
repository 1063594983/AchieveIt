<template>
    <el-dialog
            title="修改风险记录"
            :visible.sync="visible"
            width="420px"
            :close-on-click-modal="false"
            :before-close="onClose"
    >
        <el-form :model="form" label-position="left" label-width="5rem">
            <el-form-item label="项目选择">
                <el-select v-model="form.project_id" placeholder="选择项目名称">
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
            <el-form-item label="状态选择">
                <el-select v-model="form.solve_status" placeholder="请选择">
                    <el-option
                            v-for="i in [0,1,2]"
                            :key="i"
                            :label="i"
                            :value="i"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onClose">取消</el-button>
            <el-button type="primary" @click="editRisk">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
  import { Component, Prop, Vue} from 'vue-property-decorator';
  import { Project, ProjectPutBBody, Risk, RiskGetBody, RiskPostBody, RiskPutBody } from "achieve-it-contract";
  import { Subtract } from 'utility-types';
  import agent, { authBody } from '@/agent';

  type RiskDraft = Subtract<RiskPostBody, authBody>;
  @Component
  export default class RiskEditDialog extends Vue {
    @Prop({ required: true }) visible!: boolean;
    @Prop({ required: true }) onClose!: () => void;
    @Prop({ required: true }) onCreate!: ( record) => Promise<boolean>;

    projects: Project[] = [];


    mounted() {
      agent.project.getAll().then((result) => {
        this.projects = result.project_list;
      });
    }

    form = {
      detail : null,
      project_id: '',
      solve_status: 0,
    };

    async editRisk() {
      const result = await this.onCreate(this.form);
      if (result) {
        this.onClose();
      }
    }
  }
</script>

<style scoped>

</style>