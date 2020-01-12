import React from 'react'

// models
import * as models from './pages/models'

// router
import Router, {
  AppContainerRouterMiddleWare, 
  AppContainerReducer
} from './router'

import {
  dva
} from './utils/dva'

const $$Dva = dva({
  initialState: {},
  models: Object.values(models),
  extraReducers: { router: AppContainerReducer },
	onError(e) {
		console.error('onError', e);
  },
  onAction: [ AppContainerRouterMiddleWare ]
})

const APP = $$Dva.start(<Router />)

export default APP