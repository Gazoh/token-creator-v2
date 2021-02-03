export const setTokenList = async (data: any) => {
    try {
        const url = process.env.REACT_APP_PLAY + 'upload.php'
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'multipart/form-data'
            },
            body: JSON.stringify(data)
        })
        return res;
    }
    catch (err) {
        console.log("Failed to upload token list to server", err)
        return null;
    }
}

export const updateTokenlist = async (data: any, tokenName: string) => {
    try {
        const url = process.env.REACT_APP_PLAY + 'update.php'
        const body = {
            tokenName: tokenName,
            data: data
        };
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'multipart/form-data'
            },
            body: JSON.stringify(body)
        })
        return res;
    }
    catch (err) {
        console.log("Failed to update tokenlist", err)
        return null;
    }
}

export const createTokenList = async (data: any, tokenName: string, chainList: any, chainID: string) => {
    try {
        // Adding it to the chainList
        const addList = { chainID_list: [chainID], tokenList: process.env.REACT_APP_PLAY + tokenName + '.json' };
        console.log('chainList', chainList);
        console.log('addList', addList);
        let list = chainList;
        list.push(addList);
        const url = process.env.REACT_APP_PLAY + 'create.php'
        const body = {
            tokenName: tokenName,
            data: data,
            chainList: list
        };
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'multipart/form-data'
            },
            body: JSON.stringify(body)
        })
        return res;
    }
    catch (err) {
        console.log("Failed to create tokenlist", err)
        return null;
    }
}