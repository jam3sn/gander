<template>
  <div class="min-h-screen bg-gray-100">
    <Disclosure as="nav" class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <ServerIcon class="block h-8 w-8 text-brand-500" />
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'border-brand-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </Disclosure>

    <div class="py-10">
      <Hosts />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';
import Hosts from './components/Hosts.vue';
import { Options, Vue } from "vue-class-component";
import { ServerIcon } from '@heroicons/vue/solid';

@Options({
  components: {
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
