import { commonStore } from '@/store';

describe('test common store', () => {
  it('should setDarkMode action correctly', async function() {
    await commonStore.setDarkMode(true);
    expect(commonStore.isDarkMode).toBe(true);
  });
});
