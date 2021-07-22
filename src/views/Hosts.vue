<template>
  <header class="mb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">
        Hosts
      </h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto grid grid-cols-1 gap-5 sm:items-top md:grid-cols-2 sm:px-6 lg:px-8 xl:grid-cols-3">
      <Host v-for="host in hosts" :key="host.hostname" :host="host" />
    </div>
  </main>
</template>

<script lang="ts">
import { IHost } from "@/store/hosts/Types";
import { Options, Vue } from "vue-class-component";
import { Action, Getter } from 'vuex-class'
import Host from '../components/Host.vue';

@Options({
  name: 'Hosts',
  components: {
    Host,
  }
})
export default class Hosts extends Vue {
  @Getter('hosts', { namespace: 'hosts'}) hosts!: IHost

  @Action('getHosts', { namespace: 'hosts' })
  getHosts!: () => void;

  mounted(): void {
    this.getHosts();
  }
}
</script>
