import { types } from '../actions/records_act';
var initialState = { isLoadingRecords: false, isEmptyRecords: false, records: {} };

export default function recordsState(state = initialState, action = {}) {
    switch(action.type) {
        case types.REQUEST_RECORDS:
            return Object.assign({}, state, { isLoadingRecords: true, isEmptyRecords: false, records: {} });
        case types.RECEIVE_RECORDS:
            return Object.assign({}, state, { isLoadingRecords: false, isEmptyRecords: false, records: action.records });
        case types.RECEIVE_EMPTY_RECORDS:
            return Object.assign({}, state, { isLoadingRecords: false, isEmptyRecords: true, records: {} });
        default:
            return state;
    }
}
