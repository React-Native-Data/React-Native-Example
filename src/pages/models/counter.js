export default {
  namespace: 'counter',
  state: {
    count: 0
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {

  },
  subscriptions: {
    setup({ dispatch }, done) {

    }
  }
}