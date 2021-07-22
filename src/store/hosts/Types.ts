export interface IHostsState {
  hosts: IHost[],
};

export interface IHost {
  hostname: string,
  label: string,
  ip: string,
  url: string,
  stats: IHostStats | null,
  loading: boolean,
}

export interface IHostStats {
  cpu: number,
  perCpu: ICpuDetails[],
  memory: number
  network: INicDetails[]
  sensors: ISensorDetails[]
  system: ISystemDetails
  filesystem: IFsDetails[]
  uptime: string
};
  
export interface ICpuDetails {
  cpuNumber: number,
  total: number,
  user: number,
  system: number
};
  
export interface INicDetails {
  name: string,
  transmitted: number,
  totalTransmitted: number,
  received: number,
  totalReceived: number,
  speed: number,
  isUp: boolean,
};

export interface ISensorDetails {
  name: string,
  value: number,
  warning: number,
  critical: number,
  unit: string,
  type: string,
};

export interface ISystemDetails {
  os: string,
  osVersion: string
  distro: string,
  hostname: string,
  platform: string,
};

export interface IFsDetails {
  name: string,
  type: string,
  mntPoint: string,
  size: number,
  used: number,
  free: number,
  usedPercent: number,
};

export interface IHostConfig {
  label: string,
  ip: string,
  port: number,
  ssl: boolean,
};
