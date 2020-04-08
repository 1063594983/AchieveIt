// React user loves composition api and JSX 😊
import { onMounted } from '@vue/composition-api';
import { useDevice } from '@/agent/device';

const DevicePage = () => {
  const { load, state } = useDevice();
  onMounted(async () => {
    await load();
  });
  return () => (
    <div>
      <h1>设备管理</h1>
      <el-table data={state.deviceList} v-loading={state.isLoading}>
        <el-table-column label="ID" prop="device_id" width="100px" />
        <el-table-column label="名称" prop="device_name" />
        <el-table-column label="可用性">
          {({ row }) => (
            <el-tag type={row.device_status === 1 ? 'success' : 'info'}>
              {row.device_status === 1 ? '可用' : '不可用'}
            </el-tag>
          )}
        </el-table-column>
      </el-table>
    </div>
  );
};

export default DevicePage;
