import { IHost, IHostConfig } from '@/store/hosts/Types';
import config from '../../hosts.yaml';

export function parseHostsConfig(): IHost[] {
  const hosts: IHost[] = [];

  for (const host in config) {
    hosts.push({
      name: host,
      label: config[host].label ?? host,
      ip: config[host].ip ?? null,
      port: config[host].port ?? null,
      stats: [],
    });
  }

  return hosts;
}
