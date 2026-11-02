import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'App_Meteo',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
