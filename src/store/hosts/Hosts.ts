import { parseHostsConfig } from '@/services/hosts.service';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '../Types';
import { IHost, IHostsState } from './Types';

export enum mutators {
  LOADING = 'LOADING',
  SET_HOSTS = 'SET_HOSTS',
}

export const state: IHostsState = {
  hosts: [],
  loading: false,
};

export const getters: GetterTree<IHostsState, IRootState> = {
  getHosts: (_state) => _state.hosts,
};

export const actions: ActionTree<IHostsState, IRootState> = {
  async readHosts({ commit }) {
    commit(mutators.LOADING, true);

    const hosts: IHost[] = parseHostsConfig();

    commit(mutators.SET_HOSTS, hosts);
    commit(mutators.LOADING, false);
  },
};

export const mutations: MutationTree<IHostsState> = {
  [mutators.SET_HOSTS](_state: IHostsState, hosts: IHost[]) {
    _state.hosts = hosts;
  },
  [mutators.LOADING](_state: IHostsState, loading: boolean) {
    _state.loading = loading;
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
