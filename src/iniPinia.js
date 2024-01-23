import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

const pinia1 = createPinia()
pinia1.use(piniaPersist)

export const pinia=pinia1;