// @ts-ignore
import Notification from 'element-ui/lib/notification';

const Notify = {
  success(title: string, message?: string) {
    Notification.success({
      position: 'bottom-right',
      title,
      message
    });
  },
  info(title: string, message?: string) {
    Notification.info({
      position: 'bottom-right',
      title,
      message
    });
  },
  error(title: string, message?: string) {
    Notification.error({
      position: 'bottom-right',
      title,
      message
    });
  }
};

export { Notify };
