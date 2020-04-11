// React user loves composition api and JSX 😊
import { defineComponent, onMounted, reactive } from '@vue/composition-api';
import DeviceCreateDialog from '@/components/DeviceCreateDialog.vue';
import { useDevice } from '@/agent/device';
import { DevicePostBody } from 'achieve-it-contract';
import agent from '@/agent';
import { Confirm, Notify, Prompt } from '@/theme';

const DevicePage = defineComponent({
  components: { DeviceCreateDialog },
  setup() {
    const { load, state: devices } = useDevice();
    const state = reactive({
      createDialogVisible: false,
    });

    function openCreateDialog() {
      state.createDialogVisible = true;
    }

    function closeCreateDialog() {
      state.createDialogVisible = false;
    }

    async function openUpdateDialog(id: string) {
      const result = await Prompt.open('输入', '输入设备更新后的名字');
      if (!result) return;
      try {
        await agent.device.update(id, { device_name: result, device_status: 0 });
        Notify.success('更改名字为' + result + '成功');
      } catch (e) {
        Notify.error('更改名字失败');
      }
    }

    async function openDeleteDialog(id: string) {
      const result = await Confirm.warning('确认', `是否要删除设备(ID=${id})？`);
      if (!result) return;
      try {
        await agent.device.delete(id, {});
        devices.deviceList = devices.deviceList.filter((i) => i.device_id !== Number(id));
        Notify.success('删除成功');
      } catch (e) {
        Notify.error('删除失败');
      }
    }

    async function insertDevice(form: DevicePostBody) {
      try {
        if (form.device_name !== '') await agent.device.insert(form);
        else {
          Notify.error('设备名不为空');
          return false;
        }
        await load();
        return true;
      } catch (e) {
        return false;
      }
    }

    onMounted(async () => {
      await load();
    });

    return () => (
      <div>
        <h1>设备管理</h1>
        <div class="my1">后端未实现，当ID=0已有的时候，就无法继续插入</div>
        <div>
          <el-button onClick={openCreateDialog}>登记新的设备</el-button>
        </div>
        <el-table data={devices.deviceList} v-loading={devices.isLoading}>
          <el-table-column label="ID" prop="device_id" width="100px" />
          <el-table-column label="名称" prop="device_name" />
          <el-table-column label="可用性">
            {({ row }) => (
              <el-tag type={row.device_status === 1 ? 'success' : 'info'}>
                {row.device_status === 1 ? '可用' : '不可用'}
              </el-tag>
            )}
          </el-table-column>
          <el-table-column>
            {({ row }) => (
              <el-button-group>
                <el-button size="mini" onClick={() => openUpdateDialog(row.device_id)}>
                  修改
                </el-button>
                <el-button type="danger" size="mini" onClick={() => openDeleteDialog(row.device_id)}>
                  删除
                </el-button>
              </el-button-group>
            )}
          </el-table-column>
        </el-table>
        <device-create-dialog visible={state.createDialogVisible} close={closeCreateDialog} insert={insertDevice} />
      </div>
    );
  },
});

export default DevicePage;
