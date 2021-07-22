<template>
  <div class="min-h-screen bg-gray-100">
    <div class="py-10">
      <Hosts />
    </div>

    <Alerts />
  </div>
</template>

<script lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';
import Alerts from './components/Alerts/Alerts.vue';
import Hosts from './views/Hosts.vue';
import { Options, Vue } from "vue-class-component";
import { ServerIcon } from '@heroicons/vue/solid';

@Options({
  components: {
    Alerts,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Hosts,
    ServerIcon,
  }
})
export default class App extends Vue {
  public navigation = [
      { name: 'Hosts', href: '/', current: true },
    ];
  }
</script>
