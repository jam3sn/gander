
<template>
  <div class="rounded-md p-4 shadow mt-4" :class="`bg-${alertColor}-100`">
    <div class="flex">
      <div>
        <h3 class="text-sm font-bold" :class="`text-${alertColor}-800`">
          {{ alert.title }}
        </h3>
        <div class="mt-2 text-sm" :class="`text-${alertColor}-700`">
          <p>
            {{ alert.body }}
          </p>
        </div>
      </div>

      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button 
            @click="dismiss(alert.id)"
            type="button"
            class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="`bg-${alertColor}-100 text-${alertColor}-700 hover:bg-${alertColor}-200 focus:ring-offset-${alertColor}-50 focus:ring-${alertColor}-600`"
          >
            <span class="sr-only">Dismiss</span>
            <XIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AlertType, IAlert } from "@/store/alerts/Types";
import { Options, Vue } from "vue-class-component";
import { Action } from 'vuex-class'
import { XIcon } from '@heroicons/vue/solid'

@Options({
  name: 'Alert',
  components: {
    XIcon,
  },
  props: {
    alert: Object,
  }
})
export default class Alert extends Vue {
  private alert!: IAlert;
  private alertColor = 'brand';

  @Action('dismiss', { namespace: 'alerts' })
  dismiss!: () => void;

  public mounted(): void {
    this.setAlertColor();
  }

  private setAlertColor(): void {
    if (this.alert.type === AlertType.SUCCESS) {
      this.alertColor = 'green';
    } else if (this.alert.type === AlertType.WARNING) {
      this.alertColor = 'yellow';
    } else if (this.alert.type === AlertType.ERROR) {
      this.alertColor = 'red';
    }
  }
}
</script>
