/* eslint-disable @typescript-eslint/no-non-null-assertion */
<template>
  <div class="bg-white overflow-hidden rounded-lg shadow mb-4">
    <header class="bg-white px-4 py-5 border-b border-gray-200 flex justify-between items-center sm:px-6">
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ host.label }}
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          <a class="hover:text-brand-600" :href="host.url" target="_blank" :title="host.label">
            {{ host.url }}
          </a>
        </p>
      </div>

      <div class="rounded-full h-4 w-4" :class="`bg-${getStatus()}-400`"></div>
    </header>

    <div v-if="host.status === statusTypes.LOADING" class="px-4 py-5">
      <p class="text-3xl font-semibold text-center text-gray-800">Loading...</p>
    </div>

    <div v-else-if="host.stats !== null">
      <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div class="px-4 py-5 overflow-hidden sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">
            CPU Load
          </dt>
          <dd class="mt-1 text-3xl font-semibold " :class="`text-${getColor(host.stats.cpu)}`">
            {{ host.stats.cpu }}%
          </dd>
        </div>

        <div class="px-4 py-5 overflow-hidden sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">
            Memory Usage
          </dt>
          <dd class="mt-1 text-3xl font-semibold" :class="`text-${getColor(host.stats.memory)}`">
            {{ host.stats.memory }}%
          </dd>
        </div>
      </dl>

      <ul class="overflow-hidden grid grid-cols-1 gap-5 px-4 py-5 sm:items-center sm:grid-cols-3 sm:p-6">
        <li>
          <dt class="fmt-1 font-semibold" :class="`text-${getColor(host.stats.sensors[0].value)}`">{{ host.stats.sensors[0].value }} {{ host.stats.sensors[0].unit }}</dt>
          <dd class="text-sm font-medium text-gray-500 truncate">{{ host.stats.sensors[0].type }}</dd>
        </li>
        <li>
          <dt class="fmt-1 font-semibold" :class="`text-${getColor(host.stats.filesystem[0].usedPercent)}`">{{ host.stats.filesystem[0].usedPercent }}%</dt>
          <dd class="text-sm font-medium text-gray-500 truncate">Used Storage</dd>
        </li>
        <li>
          <dt class="fmt-1 font-semibold text-gray-900 trun">{{ host.stats.uptime }}</dt>
          <dd class="text-sm font-medium text-gray-500 truncate">Uptime</dd>
        </li>
      </ul>
    </div>

    <div v-else class="px-4 py-5">
      <p class="font-semibold text-center text-gray-800">Something went wrong while trying to query {{ host.hostname }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { HostStatus, IHost } from "@/store/hosts/Types";
import { Options, Vue } from "vue-class-component";

@Options({
  name: 'Hosts',
  props: {
      host: Object,
  }
})
export default class Hosts extends Vue {
  private host!: IHost;
  private statusTypes = HostStatus;

  /**
   * Get Color
   * 
   * @param {number} value
   * @returns {string}
   */
  private getColor(value: number, defaultColor = 'gray-900') {
    if (value > 95) {
      return 'red-500';
    } else if (value > 75) {
      return 'yellow-500';
    } else {
      return defaultColor;
    }
  }

  private getStatus() {
    if (this.host.status === HostStatus.UP) {
      return 'green';
    } else if (this.host.status === HostStatus.LOADING) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
}
</script>