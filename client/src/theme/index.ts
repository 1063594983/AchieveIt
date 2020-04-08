// @ts-ignore
import Notification from 'element-ui/lib/notification';
// @ts-ignore
import MessageBox from 'element-ui/lib/message-box';

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

const Confirm = {
  warning(title: string, message?: string): Promise<undefined> {
    return MessageBox.confirm(message, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
  },
};

export { Notify, Confirm };
