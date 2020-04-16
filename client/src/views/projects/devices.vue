<template>
  <div>
    <h1>设备管理</h1>
    <div>
      <el-button @click="openCreateDialog">登记新的设备</el-button>
    </div>
    <el-table :data="devices">
      <el-table-column label="ID" prop="device_id" width="100px" />
      <el-table-column label="名称" prop="device_name" />
      <el-table-column label="可用性">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.device_status === 0 ? 'success' : 'info'"
          >{{ scope.row.device_status === 0 ? '可用' : '不可用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="scope.row.device_status === 0 ? openRentDialog(scope.row.device_id) : openUnRentMessage(scope.row.device_id)">
            {{ scope.row.device_status === 0 ? '租用' : '取消租用' }}
          </el-button>
          <el-button size="mini" @click="openUpdateDialog(scope.row.device_id)">修改</el-button>
          <el-button type="danger" size="mini" @click="openDeleteDialog(scope.row.device_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 设备租用窗口 -->
    <el-dialog :visible="state.rentVisible" title="设备租用" :before-close="() => state.rentVisible = false">
      <!-- 项目名 -->
      <el-form>
        <el-form-item label="项目选择">
          <el-select v-model="project_id" placeholder="请选择">
            <el-option
              v-for="item in projects"
              :key="item.project_id"
              :label="`${item.project_id}(${item.project_name})`"
              :value="item.project_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="rentDevice">确定</el-button>
      <el-button @click="state.rentVisible=false">取消</el-button>
    </el-dialog>
    <device-create-dialog
      :visible="state.createDialogVisible"
      :close="closeCreateDialog"
      :insert="insertDevice"
    />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import DeviceCreateDialog from '@/components/DeviceCreateDialog.vue';
import agent from '@/agent';
import { Confirm, Notify, Prompt } from '@/theme';
import { userStore } from '../../store';

@Component({
  components: { DeviceCreateDialog },
})
export default class Devices extends Vue {
    devices = [];
    joinProjects = [];
    projects = [];
    selectedDeviceId = "";
    state = {
        createDialogVisible: false,
        rentVisible: false
    }
    project_id = "";
    async rentDevice() {
        if (this.project_id == "") {
            Notify.error('失败', '请选择项目');
            return;
        }
        const result = await agent.device.update(this.selectedDeviceId, {
            device_status: "1",
            project_id: this.project_id
        })
        Notify.success('成功', '设备租用成功');
        this.load();
        this.state.rentVisible = false;
    }
    async unRentDevice() {
      const result = await agent.device.update(this.selectedDeviceId, {
        device_status: "0",
        project_id: null
      })
      console.log(result)
      Notify.success('取消成功', '取消设备租用');
      this.load();
    }
    openCreateDialog() {
      this.state.createDialogVisible = true;
    }
    closeCreateDialog() {
      this.state.createDialogVisible = false;
    }
    async openUpdateDialog(id) {
      const result = await Prompt.open('输入', '输入设备更新后的名字');
      if (!result) return;
      try {
        await agent.device.update(id, { device_name: result });
        Notify.success('更改名字为' + result + '成功');
      } catch (e) {
        Notify.error('更改名字失败');
      }
    }
    async openRentDialog(id) {
        this.selectedDeviceId = id;
        this.state.rentVisible = true;
    }

    async openUnRentMessage(id) {
      this.selectedDeviceId = id;
      const result = await Confirm.warning("警告", "确认取消设备绑定吗");
      if (result) await this.unRentDevice();
    }

    async openDeleteDialog(id) {
      const result = await Confirm.warning('确认', `是否要删除设备(ID=${id})？`);
      if (!result) return;
      try {
        await agent.device.delete(id, {});
        this.devices.deviceList = this.devices.deviceList.filter((i) => i.device_id !== Number(id));
        Notify.success('删除成功');
      } catch (e) {
        Notify.error('删除失败');
      }
    }

    async insertDevice(form) {
      try {
        if (form.device_name !== '') await agent.device.insert(form);
        else {
          Notify.error('设备名不为空');
          return false;
        }
        await this.load();
        return true;
      } catch (e) {
        return false;
      }
    }
    async load() {
        const result = await agent.device.getAll();
        this.devices = result.device_list;
        const joinProjects = await agent.project.getJoinProjects(userStore.currentUser.member_id);
        // 筛选进行中的项目
        this.projects = joinProjects.project_list.filter(x=>x.status=='进行中');
    }
    async mounted() {
        await this.load();
    }
}
</script>
