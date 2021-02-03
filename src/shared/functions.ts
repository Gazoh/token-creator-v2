// @Uniswap
import { TokenList, schema } from '@uniswap/token-lists'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// @Custom imports
import Ajv from 'ajv';
import { setTokenList, updateTokenlist, createTokenList } from '../services/MainCalls';

export const generateMyTokenList = async (tokenList: TokenList, chainID: string, update: boolean, updateTokenlistName: string, create: boolean, createTokenlistName: string, createTokenChainlist: any) => {
    // Creating a new AJV object
    const validator = new Ajv();
    // Tokenlist
    const myList = tokenList;
    // Validating if the scheme is a valid scheme
    const validateScheme = validator.validateSchema(schema);
    // If the validateScheme returns true it is a valid scheme than validate my list
    if (validateScheme) {
        validator.validate(schema, myList);
        // Array of errors
        let errors = validator.errors;
        if (errors && errors.length > 0) {
            return errors;
        } else if (update) {
            await updateTokenlist(myList, updateTokenlistName);
        } else if (create) {
            await createTokenList(myList, createTokenlistName, createTokenChainlist, chainID)
        } else {
            await setTokenList(myList)
        }
    }
}

export const notify = (baseText: string, text: string, type: string = 'success' || 'error') => {
    if (type === 'success') {
        toast.success(baseText + text, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } else {
        toast.error(baseText + text, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}