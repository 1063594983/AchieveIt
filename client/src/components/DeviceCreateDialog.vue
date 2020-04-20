<template>
  <el-dialog title="创建项目" :visible.sync="visible" width="420px" :close-on-click-modal="false" :before-close="close">
    <el-form :model="form" label-position="left" label-width="5rem">
      <el-form-item label="设备名称">
        <el-input v-model="form.device_name" placeholder="输入设备名称"></el-input>
      </el-form-item>
      <el-form-item label="设备状态">
        <el-select v-model="form.device_status" disabled>
          <el-option
            v-for="item in [0, 1]"
            :key="item"
            :label="item === 0 ? '可用' : '不可用'"
            :value="item"
          ></el-option
        ></el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button @click="onInsert">登记</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { DevicePostBody } from 'achieve-it-contract';
import { Notify } from '@/theme';

export default defineComponent<{
  close: () => void;
  insert: (form: DevicePostBody) => Promise<boolean>;
  visible: boolean;
}>({
  props: {
    close: Function,
    insert: Function,
    visible: Boolean,
  },
  setup(props) {
    const state = reactive<{
      form: DevicePostBody;
    }>({
      form: {
        device_name: '',
        device_status: 0,
        token: '',
      },
    });
    async function onInsert() {
      const result = await props.insert(state.form);
      if (result) {
        Notify.success('添加新的设备成功！');
        props.close();
      } else {
        Notify.error('添加设备失败');
      }
    }
    return { ...toRefs(state), onInsert };
  },
});
</script>

<style scoped></style>
