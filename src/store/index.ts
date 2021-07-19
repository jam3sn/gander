import vuex from 'vuex';
import hosts from './hosts/Hosts';

export default new vuex.Store({
  modules: {
    hosts,
  },
});
