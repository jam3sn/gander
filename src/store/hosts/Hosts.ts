import { getAllStats } from '@/api/hosts/Requests';
import { parseHostsConfig } from '@/services/hosts/Service';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '../Types';
import { IHost, IHostsState } from './Types';

export enum mutators {
  SET_HOST_LOADING = 'SET_HOST_LOADING',
  SET_HOSTS = 'SET_HOSTS',
  SET_HOST_STATS = 'SET_HOST_STATS',
}

export const state: IHostsState = {
  hosts: [],
};

export const getters: GetterTree<IHostsState, IRootState> = {
  hosts: (_state) => _state.hosts,
};

export const actions: ActionTree<IHostsState, IRootState> = {
  async getHosts({ commit, dispatch }) {
    const hosts: IHost[] = parseHostsConfig();
    commit(mutators.SET_HOSTS, hosts);

    dispatch('getAllHostsOverview');
  },

  async getHostOverview({ commit }, host: IHost) {
    commit(mutators.SET_HOST_LOADING, {
      hostname: host.hostname,
      loading: true,
    });

    const stats = await getAllStats(host.url);
    commit(mutators.SET_HOST_STATS, { hostname: host.hostname, stats });

    commit(mutators.SET_HOST_LOADING, {
      hostname: host.hostname,
      loading: false,
    });
  },

  async getAllHostsOverview({ dispatch, state }) {
    for (const key in state.hosts) {
      dispatch('getHostOverview', state.hosts[key]);
    }
  },
};

export const mutations: MutationTree<IHostsState> = {
  [mutators.SET_HOSTS](_state: IHostsState, hosts: IHost[]) {
    _state.hosts = hosts;
  },
  [mutators.SET_HOST_LOADING](_state: IHostsState, { hostname, loading }) {
    const key: number = _state.hosts.findIndex(
      (currentHost) => currentHost.hostname === hostname
    );

    if (key >= 0) {
      _state.hosts[key].loading = loading;
    }
  },
  [mutators.SET_HOST_STATS](_state: IHostsState, { hostname, stats }) {
    const key: number = _state.hosts.findIndex(
      (currentHost) => currentHost.hostname === hostname
    );

    if (key >= 0) {
      _state.hosts[key].stats = stats;
    }
  },
};

const hosts: Module<IHostsState, IRootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};

export default hosts;
