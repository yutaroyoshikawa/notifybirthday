import Vue from 'vue';
import Vuex from 'vuex';
import { IStoreState } from './modules/top';

Vue.use(Vuex);

export interface State {
  top: IStoreState;
}

export default new Vuex.Store<State>({});
