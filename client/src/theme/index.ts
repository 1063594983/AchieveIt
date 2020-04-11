// @ts-ignore
import Notification from 'element-ui/lib/notification';
// @ts-ignore
import MessageBox from 'element-ui/lib/message-box';

// 右下角弹窗
const Notify = {
  success(title: string, message?: string) {
    Notification.success({
      position: 'bottom-right',
      title,
      message,
    });
  },
  info(title: string, message?: string) {
    Notification.info({
      position: 'bottom-right',
      title,
      message,
    });
  },
  error(title: string, message?: string) {
    Notification.error({
      position: 'bottom-right',
      title,
      message,
    });
  },
};

// 确认框
const Confirm = {
  async warning(title: string, message?: string): Promise<boolean> {
    try {
      await MessageBox.confirm(message, title, {
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
      return await MessageBox.prompt(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      });
    } catch (e) {
      return '';
    }
  },
};

// 表单输入框
const Form = {
  async open<Result>(title: string, formRows: any[]): Promise<Result> {
    return '' as any;
  },
};

export { Notify, Confirm, Prompt, Form };
