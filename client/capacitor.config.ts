import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'aadhar-scanner',
  webDir: 'dist',
  "plugins": {
    "CapacitorHttp": {
      "enabled": false
    }
  }
};

export default config;
