import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '../Types';
import { AlertTimeout, IAlert, IAlertsState } from './Types';

export enum mutators {
  SHOW_ALERT = 'SHOW_ALERT',
  DISMISS_ALERT = 'DISMISS_ALERT',
}

export const state: IAlertsState = {
  alerts: [],
};

export const getters: GetterTree<IAlertsState, IRootState> = {
  alerts: (_state) => _state.alerts,
};

export const actions: ActionTree<IAlertsState, IRootState> = {
  show({ commit, dispatch }, alert: IAlert) {
    alert.id = Date.now();
    commit(mutators.SHOW_ALERT, alert);

    if (alert.timeout !== AlertTimeout.NONE) {
      dispatch('timeout', { id: alert.id, timeout: alert.timeout });
    }
  },

  dismiss({ commit }, id: number) {
    commit(mutators.DISMISS_ALERT, id);
  },

  timeout({ dispatch, state }, { id, timeout }) {
    const key: number = state.alerts.findIndex((alert) => alert.id === id);

    if (key >= 0) {
      state.alerts[key].activeTimeout = setTimeout(
        () => dispatch('dismiss', id),
        timeout
      );
    }
  },
};

export const mutations: MutationTree<IAlertsState> = {
  [mutators.SHOW_ALERT](_state: IAlertsState, alert: IAlert) {
    _state.alerts.push(alert);
  },

  [mutators.DISMISS_ALERT](_state: IAlertsState, id: number) {
    const key: number = _state.alerts.findIndex((alert) => alert.id === id);

    if (key >= 0) {
      clearTimeout(_state.alerts[key].activeTimeout);
      _state.alerts.splice(key, 1);
    }
  },
};

const alerts: Module<IAlertsState, IRootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};

export default alerts;
