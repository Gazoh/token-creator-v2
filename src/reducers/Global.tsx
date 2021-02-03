import { HANDLE_LIST, HANDLE_TOKEN_LIST, HANDLE_CHAIN_LIST } from '../actions/Global';

const initialState: any = {
    tokenList: [],
    tokens: [],
    chainList: []
}

export default function globalReducer(state = initialState, action: any) {
    let changes;
    switch (action.type) {
        case HANDLE_LIST:
            changes = {
                ...state,
                ...action.payload
            };
            return changes;
        case HANDLE_TOKEN_LIST:
            changes = {
                ...state,
                ...action.payload
            };
            return changes;
        case HANDLE_CHAIN_LIST:
            changes = {
                ...state,
                ...action.payload
            };
            return changes;
        default:
            return state;
    }
}
