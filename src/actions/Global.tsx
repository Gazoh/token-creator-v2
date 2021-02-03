export const HANDLE_LIST = "HANDLE_LIST";
export const HANDLE_TOKEN_LIST = "HANDLE_TOKEN_LIST";
export const HANDLE_CHAIN_LIST = 'HANDLE_CHAIN_LIST';

export function getTokenList(list: string) {
    return async (dispatch: Function, getState: any) => {
        try {
            const url = list;
            const res = await fetch(url);
            const json = await res.json();

            dispatch({ type: HANDLE_LIST, payload: { tokenList: json } });
            dispatch({ type: HANDLE_TOKEN_LIST, payload: { tokens: json.tokens } });
        }
        catch (err) {
            // window.location.href = '/'
            console.log('err', err)
        }
    }
}

export function getChainList() {
    return async (dispatch: Function) => {
        try {
            const url = process.env.REACT_APP_PLAY + 'checklist.json'
            const res = await fetch(url);
            const json = await res.json();
            dispatch({ type: HANDLE_CHAIN_LIST, payload: { chainList: json } });
        }
        catch (err) {
            console.log('err', err)
        }
    }
}