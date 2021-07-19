import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '../Types';
import { IHostsState, IHostStats } from './Types';

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
  async getHosts({ dispatch }) {
    dispatch(mutators.LOADING, true);

    const hosts: [] = [];

    dispatch(mutators.SET_HOSTS, hosts);
    dispatch(mutators.LOADING, false);
  },
};

export const mutations: MutationTree<IHostsState> = {
  [mutators.SET_HOSTS](_state: IHostsState, hosts: [IHostStats]) {
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
