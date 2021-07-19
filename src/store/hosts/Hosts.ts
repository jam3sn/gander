import { parseHostsConfig } from '@/services/hosts.service';
import axios from 'axios';
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
  hosts: (_state) => _state.hosts,
  loading: (_state) => _state.loading,
};

export const actions: ActionTree<IHostsState, IRootState> = {
  async getHosts({ commit, dispatch }) {
    commit(mutators.LOADING, true);

    const hosts: IHost[] = parseHostsConfig();
    commit(mutators.SET_HOSTS, hosts);

    dispatch('getAllHostsOverview');
  },

  async getAllHostsOverview({ commit, state }) {
    commit(mutators.LOADING, true);

    Promise.all(
      state.hosts.map((host: IHost) => {
        return axios
          .get(`${host.url}/all`)
          .then(({ data }) => console.log(data));
      })
    ).then((responses) => console.log(responses));
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
