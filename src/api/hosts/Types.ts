export interface IGlancesAll {
  processcount: IGlancesProcessCount;
  quicklook: IGlancesQuicklook;
  fs: IGlancesFs[];
  system: IGlancesSystem;
  uptime: string;
  ip: IGlancesIp;
  network: IGlancesNetworkDetailed[];
  diskio: IGlancesDiskio[];
  mem: IGlancesMem;
  now: string;
  processlist: IGlancesProcessList[];
  percpu: IGlancesPerCpu[];
  cpu: IGlancesCpu;
  sensors: IGlancesSensor[];
}

export interface IGlancesProcessCount {
  total: number;
  running: number;
  sleeping: number;
  thread: number;
  pid_max: number;
}

export interface IGlancesPerCpu {
  key: string;
  cpu_number: number;
  total: number;
  user: number;
  system: number;
  idle: number;
  nice: number;
  iowait: number;
  irq: number;
  softirq: number;
  steal: number;
  guest: number;
  guest_nice: number;
}

export interface IGlancesQuicklook {
  cpu: number;
  percpu: IGlancesPerCpu[];
  mem: number;
  swap: number;
  cpu_name: string;
  cpu_hz_current: number;
  cpu_hz: number;
}

export interface IGlancesFs {
  device_name: string;
  fs_type: string;
  mnt_point: string;
  size: any;
  used: any;
  free: any;
  percent: number;
  key: string;
}

export interface IGlancesSystem {
  os_name: string;
  hostname: string;
  platform: string;
  linux_distro: string;
  os_version: string;
  hr_name: string;
}

export interface IGlancesPlatform {
  Name: string;
}

export interface Version {
  Platform: IGlancesPlatform;
  Version: string;
  ApiVersion: string;
  MinAPIVersion: string;
  GitCommit: string;
  GoVersion: string;
  Os: string;
  Arch: string;
  KernelVersion: string;
  BuildTime: string;
}

export interface IGlancesCpuTotal {
  total: number;
}

export interface IGlancesCpu {
  total: number;
  user: number;
  nice: number;
  system: number;
  idle: number;
  iowait: number;
  irq: number;
  softirq: number;
  steal: number;
  guest: number;
  guest_nice: number;
  time_since_update: number;
  cpucore: number;
  ctx_switches: number;
  interrupts: number;
  soft_interrupts: number;
  syscalls: number;
}

export interface IGlancesMemory {
  rss: number;
  cache: number;
  max_usage: number;
  usage: number;
  limit: any;
}

export interface IGlancesIp {
  address: string;
  mask: string;
  mask_cidr: number;
  gateway: string;
}

export interface IGlancesNetwork {
  time_since_update: number;
  rx: number;
  tx: number;
  cumulative_rx: number;
  cumulative_tx: number;
}

export interface IGlancesNetworkDetailed {
  interface_name: string;
  alias?: any;
  time_since_update: number;
  cumulative_rx: number;
  rx: number;
  cumulative_tx: number;
  tx: number;
  cumulative_cx: number;
  cx: number;
  is_up: boolean;
  speed: number;
  key: string;
}

export interface IGlancesDiskio {
  time_since_update: number;
  disk_name: string;
  read_count: number;
  write_count: number;
  read_bytes: number;
  write_bytes: number;
  key: string;
}

export interface IGlancesMem {
  total: number;
  available: number;
  percent: number;
  used: number;
  free: number;
  active: number;
  inactive: number;
  buffers: number;
  cached: number;
  shared: number;
}

export interface IGlancesProcessList {
  status: string;
  pid: number;
  io_counters: number[];
  gids: number[];
  ppid: number;
  num_threads: number;
  cmdline: string[];
  cpu_times: number[];
  memory_percent: number;
  nice: number;
  name: string;
  memory_info: number[];
  username: string;
  cpu_percent: number;
  num_ctx_switches: number[];
  cpu_affinity: number[];
  ionice: number[];
  num_fds: number;
  memory_swap: number;
  tcp: number;
  udp: number;
  extended_stats: boolean;
  time_since_update: number;
}

export interface IGlancesSensor {
  label: string;
  value: number;
  warning: number;
  critical: number;
  unit: string;
  type: string;
  key: string;
}
