import React, { useEffect, useState } from 'react';
// @Custom imports
import { generateMyTokenList, notify } from '../../../shared/functions';
import Button from '../Button/Button';

interface Props {
    accept: '.json',
    disabled?: boolean,
    chainID: string,
    buttonTxt: string,
    buttonClass: string,
    updateTokenlist: boolean,
    updateTokenlistName: string,
    createTokenlist: boolean,
    createTokenListName?: string,
    createTokenChainlist: any,
    onError: Function
    onClick?: Function;
}

function Uploader(props: Props) {
    const [err, setError] = useState([])
    const [textinputValue, setTextinputValue] = useState('');

    useEffect(() => {
        getFile()
    }, [])

    const getFile = () => {
        const upload = document.getElementById('fileInput');
        const baseToastText = 'Successfully uploaded token list, refresh your page';
        if (upload) {         // Make sure the DOM element exists
            upload.addEventListener('change', function () {
                const reader = new FileReader(); // File reader to read the file 
                const textfield = document.getElementById('textfield');
                const errors: any = [];
                if (reader) {
                    reader.addEventListener('load', async function () {  // This event listener will happen when the reader has read the file
                        let checkJsonState = isJSON(reader.result);
                        if(checkJsonState === false) {
                            errors.push('Invalid JSON, Check your json');
                            errorHandler(errors);
                        } else {
                            // @ts-ignore
                            const result = JSON.parse(reader.result); // Parse the result into an object
                            // @ts-ignore
                            const createTokenListName = props.createTokenListName ? props.createTokenListName : textfield?.value;   // Validate the json
                            const checkList = await generateMyTokenList(result, props.chainID, props.updateTokenlist, props.updateTokenlistName, props.createTokenlist, createTokenListName, props.createTokenChainlist);
                            // @ts-ignore
                            if (textfield?.value === '') {
                                notify('Textfield cannot be empty', '', 'error')
                            } else if (checkList !== undefined) { // Getting the errors of the generated tokenlist
                                const error = checkList[0]   // array of errors
                                errors.push(error.dataPath, error.keyword, error.message)
                                errorHandler(errors)   // Handle errors;
                            } else {
                                notify(baseToastText, '')
                                if (!props.createTokenListName) {   // Dont redirect me if it is a update
                                    // @ts-ignore
                                    window.location.href = '/' + textfield.value
                                }
                            }
                        }

                    });
                    // @ts-ignore
                    reader.readAsText(upload.files[0]); // Read the uploaded file
                }
            });
        }
    }

    const isJSON = (str: any) => {
        try {
            return (JSON.parse(str) && !!str);
        } catch (e) {
            return false;
        }
    }

    const emptyInput = (ev: any) => {
        ev.target.value = ''
    }

    const errorHandler = (arr: any) => {
        if (props.onError) props.onError(arr)
    }

    const onClick = () => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
        if (props.onClick) props.onClick();
    }

    return (
        <>
            <Button disabled={props.disabled} className={props.buttonClass} onClick={() => onClick()}>{props.buttonTxt}</Button>
            <input type="file" id="fileInput" accept={props.accept} onChange={(event: any) => emptyInput(event)} />
        </>
    )
}

export default Uploader
