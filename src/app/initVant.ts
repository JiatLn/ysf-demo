import type { App } from 'vue';

import { Tabbar, TabbarItem, Button, Toast } from 'vant';

export const initVant = (app: App<Element>) => {
  app.use(Tabbar).use(TabbarItem).use(Button).use(Toast);
};
