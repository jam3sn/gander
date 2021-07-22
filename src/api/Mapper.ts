import {
  IGlancesAll,
  IGlancesFs,
  IGlancesMem,
  IGlancesNetworkDetailed,
  IGlancesPerCpu,
  IGlancesSensor,
  IGlancesSystem,
} from '@/api/Types';
import {
  ICpuDetails,
  IFsDetails,
  IHostStats,
  INicDetails,
  ISensorDetails,
  ISystemDetails,
} from '@/store/hosts/Types';

/**
 * Maps Glaces IGlancesAll response to IHostStats
 *
 * @param {IGlancesAll} data - Glances response data
 * @returns {IHostStats}
 */
export function mapAllStats(data: IGlancesAll): IHostStats {
  const stats: IHostStats = {
    cpu: data['cpu']['total'] ?? null,
    perCpu: mapPerCpuStats(data['percpu']),
    memory: mapMemStats(data['mem']),
    network: mapNetworkStats(data['network']),
    sensors: mapSensorStats(data['sensors']),
    system: mapSystemStats(data['system']),
    filesystem: mapFilesystemStats(data['fs']),
    uptime: data['uptime'] ?? null,
  };

  return stats;
}

/**
 * Maps IGlancesPerCpu[] to ICpuDetails[]
 *
 * @param {IGlancesPerCpu[]} data - percpu object
 * @returns {ICpuDetails[]}
 */
export function mapPerCpuStats(data: IGlancesPerCpu[]): ICpuDetails[] {
  const perCpu: ICpuDetails[] = [];

  if (Array.isArray(data) && data.length) {
    for (const key in data) {
      const core = data[key];
      perCpu.push({
        cpuNumber: core.cpu_number,
        total: core.total,
        user: core.user,
        system: core.system,
      });
    }
  }

  return perCpu;
}

/**
 * Maps IGlancesMem to number
 *
 * @param {IGlancesMem} data - mem object
 * @returns number
 */
export function mapMemStats(data: IGlancesMem): number {
  return data['percent'];
}

/**
 * Map IGlancesNetworkDetailed[] to INicDetails[]
 *
 * @param {IGlancesNetworkDetailed[]} data - network object
 * @returns {INicDetails[]}
 */
export function mapNetworkStats(
  data: IGlancesNetworkDetailed[]
): INicDetails[] {
  const nics: INicDetails[] = [];

  if (Array.isArray(data) && data.length) {
    for (const key in data) {
      const nic = data[key];
      nics.push({
        name: nic.interface_name,
        transmitted: nic.tx,
        totalTransmitted: nic.cumulative_tx,
        received: nic.rx,
        totalReceived: nic.cumulative_rx,
        speed: nic.speed,
        isUp: nic.is_up,
      });
    }
  }

  return nics;
}

/**
 * Map IGlancesSensor[] to ISensorDetails[]
 *
 * @param {IGlancesSensor[]} data - sensor object
 * @returns {ISensorDetails[]}
 */
export function mapSensorStats(data: IGlancesSensor[]): ISensorDetails[] {
  const sensors: ISensorDetails[] = [];

  if (Array.isArray(data) && data.length) {
    for (const key in data) {
      const sensor = data[key];
      sensors.push({
        name: sensor.label,
        value: sensor.value,
        warning: sensor.warning,
        critical: sensor.critical,
        unit: sensor.unit,
        type: sensor.type,
      });
    }
  }

  return sensors;
}

/**
 * Map IGlancesSystem to ISystemDetails
 *
 * @param {IGlancesSystem} data - system object
 * @returns {ISystemDetails}
 */
export function mapSystemStats(system: IGlancesSystem): ISystemDetails {
  return {
    os: system.os_name,
    osVersion: system.os_version,
    distro: system.linux_distro,
    hostname: system.hostname,
    platform: system.platform,
  };
}

/**
 * Map IGlancesFs[] to IFsDetails[]
 *
 * @param {IGlancesFs[]} data - filesystem object
 * @returns {IFsDetails[]}
 */
export function mapFilesystemStats(data: IGlancesFs[]): IFsDetails[] {
  const filesystems: IFsDetails[] = [];

  if (Array.isArray(data) && data.length) {
    for (const key in data) {
      const fs = data[key];
      filesystems.push({
        name: fs.device_name,
        type: fs.fs_type,
        mntPoint: fs.mnt_point,
        size: fs.size,
        used: fs.used,
        free: fs.free,
        usedPercent: fs.percent,
      });
    }
  }

  return filesystems;
}
