<template>
  <div class="absolute bottom-0 right-0 p-4 sm:p-6 lg:p-8">
    <Alert v-for="(alert, key) in alerts" :key="key" :alert="alert" />
  </div>
</template>

<script lang="ts">
import { IAlert } from "@/store/alerts/Types";
import { Options, Vue } from "vue-class-component";
import { Getter } from 'vuex-class'
import Alert from './Alert.vue';

@Options({
  name: 'Alerts',
  components: {
    Alert,
  }
})
export default class Hosts extends Vue {
  @Getter('alerts', { namespace: 'alerts'}) alerts!: IAlert[]
}
</script>
