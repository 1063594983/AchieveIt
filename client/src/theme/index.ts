import Vue from 'vue';
import { commonStore } from '@/store';

// 右下角弹窗
const Notify = {
  success(title: string, message?: string) {
    if (commonStore.notifyPosition === 'hide') return;
    Vue.prototype.$notify.success({
      position: commonStore.notifyPosition,
      title,
      message,
    });
  },
  info(title: string, message?: string) {
    if (commonStore.notifyPosition === 'hide') return;
    Vue.prototype.$notify.info({
      position: commonStore.notifyPosition,
      title,
      message,
    });
  },
  error(title: string, message?: string) {
    if (commonStore.notifyPosition === 'hide') return;
    Vue.prototype.$notify.error({
      position: commonStore.notifyPosition,
      title,
      message,
    });
  },
};

// 确认框
const Confirm = {
  async warning(title: string, message?: string): Promise<boolean> {
    try {
      await Vue.prototype.$msgbox.confirm(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      });
      return true;
    } catch (e) {
      return false;
    }
  },
};

// 文字输入框
const Prompt = {
  async open(title: string, message?: string): Promise<string> {
    try {
      const result = await Vue.prototype.$prompt(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      });
      if (result.action === 'confirm') return result.value;
      return '';
    } catch (e) {
      return '';
    }
  },
};

export { Notify, Confirm, Prompt };
