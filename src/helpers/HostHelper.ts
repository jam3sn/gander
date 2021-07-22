import { HostStatus, IHost } from '@/store/hosts/Types';
import config from '../../hosts.yaml';

export function parseHostsConfig(): IHost[] {
  const hosts: IHost[] = [];

  for (const host in config) {
    if (!('ip' in config[host])) {
      console.log(`No IP for ${host} set, skipping host.`);
      continue;
    }

    const url = buildUrl(
      config[host].ip,
      config[host].port,
      config[host].ssl ?? false,
      config[host].apiVersion ?? 3
    );

    hosts.push({
      hostname: host,
      label: config[host].label ?? host,
      ip: config[host].ip ?? null,
      url,
      stats: null,
      status: HostStatus.DOWN,
    });
  }

  return hosts;
}

/**
 * Build server api url
 *
 * @param ip
 * @param port
 * @param ssl
 * @returns string
 */
function buildUrl(
  ip: string,
  port?: number,
  ssl = false,
  apiVersion = 3
): string {
  const prefix = ssl ? 'https://' : 'http://';
  return `${prefix}${ip}${port ? ':' + port : ''}/api/${apiVersion}`;
}
