import * as types from '../constants/ActionTypes';
import $ from 'jquery';
import request from 'superagent'


export function getConsumptionsList() {
  return (dispatch, getState) => {
    return request('GET', '/consumptions')
      .then(response => {
        dispatch({
          type: types.GET_CONSUMPTIONS_LIST,
          data: response.body
        })
    })
  }
}

export function getCategoriesList() {
  return (dispatch, getState) => {
    return request('GET', '/categories')
      .then(response => {
        dispatch({
          type: types.GET_CATEGORIES_LIST,
          data: response.body
        })
    })
  }
}

export function getBudgetsList() {
  return (dispatch, getState) => {
    return request('GET', '/budgets')
      .then(response => {
        dispatch({
          type: types.GET_BUDGETS_LIST,
          data: response.body
        })
    })
  }
}

export function getCurrentBudget() {
  return (dispatch, getState) => {
    return request('GET', '/budget')
      .then(response => {
        dispatch({
          type: types.GET_CURRENT_BUDGET,
          data: response.body
        })
    })
  }
}

export function createConsumption(category_id, sum, comment, budget_id) {
  return (dispatch, getState) => {
    return request('POST', '/consumptions')
      .send({
        category_id,
        budget_id,
        sum,
        comment
      })
      .then(response => {
        dispatch({
          type: types.CREATE_CONSUMPTION,
          data: response.body
        })
    })
  }
}

export function updateConsumption(id, consumption) {
  return (dispatch, getState) => {
    return request('PUT', '/consumptions')
      .send({
        id,
        consumption
      })
      .then(response => {
        dispatch({
          type: types.UPDATE_CONSUMPTION,
          data: response.body
        })
    })
  }
}

export function updateCategory(category_id, name) {
  $.ajax({
    url: '/categories',
    type: 'PUT',
    async: false,
    data: {
      id: category_id,
      name,
    },
    success(data) {
      // @TODO: process errors
    },
  });

  return { type: types.UPDATE_CATEGORY, category_id, name };
}


export function deleteConsumption(consumptionId) {
  return (dispatch, getState) => {
    return request('DELETE', '/consumptions')
      .send({
        id: consumptionId
      })
      .then(response => {
        dispatch({
          type: types.DELETE_CONSUMPTION,
          data: response.body
        })
    })
  }
}

export function createCategory(name) {
  return (dispatch, getState) => {
    return $.ajax({
      url: '/categories',
      type: 'POST',
      data: {
        name,
      },
      success: (data) => {
        return dispatch({ type: types.CREATE_CATEGORY, lastRow: data });
      },
      error: (data) => {
        return dispatch({ type: null });
      }
    });
  }
}


export function deleteCategory(category_id) {
  $.ajax({
    url: '/categories',
    type: 'DELETE',
    async: false,
    data: {
      id: category_id,
    },
    success(data) {
      // @TODO: process errors
    },
  });

  return { type: types.DELETE_CATEGORY, category_id };
}

export function setBudget(sum, comment) {
  let lastRow = {};

  $.ajax({
    url: '/budget',
    type: 'POST',
    async: false,
    data: {
      sum,
      comment,
    },
    success(data) {
      lastRow = data;
    },
  });

  return { type: types.SET_BUDGET, lastRow };
}

export function updateMoneyLeft() {
  let moneyLeft = {};

  $.ajax({
    url: '/money-left',
    type: 'GET',
    async: false,
    success(data) {
      moneyLeft = data.moneyLeft;
    },
  });

  return { type: types.UPDATE_MONEY_LEFT, moneyLeft };
}

export function getMonthlyChart({ startDate, endDate }) {
  return (dispatch, getState) => {
    return request('GET', '/monthly-chart')
      .query({ startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD')  })
      .then(response => {
        dispatch({
          type: types.INIT_MONTHLY_CHART,
          data: {
            columns: [{ label: 'Date', type: 'string' }].concat(response.body.columns),
            rows: response.body.rows
          }
        })
    })
  }
}

export function getMonthlyTable({ startDate, endDate }) {
  return (dispatch, getState) => {
    return request('GET', '/monthly-table')
      .query({ startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD')  })
      .then(response => {
        dispatch({
          type: types.INIT_MONTHLY_TABLE,
          data: response.body
        })
    })
  }
}


export function getMonthlyByCategory({ startDate, endDate }) {
  return (dispatch, getState) => {
    return request('GET', '/monthly-by-category')
      .query({ startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD')  })
      .then(response => {
        dispatch({
          type: types.INIT_MONTHLY_BY_CATEGORY,
          data: response.body
        })
    })
  }
}

export function getBudgetChart({ startDate, endDate }) {
  return (dispatch, getState) => {
    return request('GET', '/budget-chart')
      .query({ startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD')  })
      .then(response => {
        dispatch({
          type: types.INIT_BUDGET_CHART,
          data: {
            columns: [{ label: 'Date', type: 'string' }].concat(response.body.columns),
            rows: response.body.rows
          }
        })
    })
  }
}

