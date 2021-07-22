import vuex from 'vuex';
import hosts from './hosts/Hosts';
import alerts from './alerts/Alerts';

export default new vuex.Store({
  modules: {
    hosts,
    alerts,
  },
});
