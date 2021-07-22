import { getAllStats } from '@/api/Requests';
import { parseHostsConfig } from '@/helpers/HostHelper';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { AlertTimeout, AlertType } from '../alerts/Types';
import { IRootState } from '../Types';
import { HostStatus, IHost, IHostsState } from './Types';

export enum mutators {
  SET_HOST_STATUS = 'SET_HOST_STATUS',
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

  async getHostOverview({ commit, dispatch }, host: IHost) {
    commit(mutators.SET_HOST_STATUS, {
      hostname: host.hostname,
      status: HostStatus.LOADING,
    });

    try {
      const stats = await getAllStats(host.url);
      commit(mutators.SET_HOST_STATS, { hostname: host.hostname, stats });
      commit(mutators.SET_HOST_STATUS, {
        hostname: host.hostname,
        status: HostStatus.UP,
      });
    } catch (e) {
      dispatch(
        'alerts/show',
        {
          title: 'Error connecting',
          body: 'There was an error connecting to ' + host.hostname + ', ' + e,
          type: AlertType.ERROR,
          timeout: AlertTimeout.SHORT,
        },
        { root: true }
      );
      commit(mutators.SET_HOST_STATUS, {
        hostname: host.hostname,
        status: HostStatus.DOWN,
      });
    }
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
  [mutators.SET_HOST_STATUS](_state: IHostsState, { hostname, status }) {
    const key: number = _state.hosts.findIndex(
      (currentHost) => currentHost.hostname === hostname
    );

    if (key >= 0) {
      _state.hosts[key].status = status;
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
