export enum EnvironmentEnum {
  PRODUCTION,
  STAGING,
  LOCAL,
}

export const environment = {
  production: EnvironmentEnum.LOCAL,
  apiUrl: 'http://192.168.18.210:5019',
};
