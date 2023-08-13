// Utilities
import { createPinia } from 'pinia'
import { auth } from "@/components/auth/services/auth.module";

const store = createStore({
  modules: {
    auth,
  },
});

export default createPinia()
