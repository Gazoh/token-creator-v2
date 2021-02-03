import React, { useEffect, useState } from 'react';
import { FormControl, Modal, Form } from 'react-bootstrap';
import { HashLoader } from 'react-spinners';
import { css } from "@emotion/core";
import Button from '../Utils/Button/Button';
import Uploader from '../Utils/Uploader/Uploader';
import { TextField } from '@material-ui/core';
import { Formik } from 'formik';
import { connect } from 'react-redux';

interface Props {
    globalReducer: any,
    title?: string,
    description?: string,
    btnText?: string,
    showSpinner?: boolean,
    extraBtnClass?: boolean,
    showBuyButton?: boolean,
    showUploaderButton?: boolean,
    uploaderChainid?: string,
    setUploaderError?: Function,
    createTokenChainlist?: string,
    showTelegramText?: boolean,
    showBuyButtonText?: string,
    createTokenContent?: boolean,
    show: boolean,
    onClose: Function
}

function CustomModal(props: Props) {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [textfield, setTextfield] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [uploaderError, setUploaderError] = useState([]);
    const override = css`
    margin-bottom: 24px;
  `;

    const emptyErrors = () => {
        setErrorMessage('')
    }

    useEffect(() => {
        // Checking length of textfield and by the hand of that making the button disabled 
        if (textfield.length === 0 || textfield === '' ) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }

        // 
        const chainList = props.globalReducer.chainList;
        for (let i = 0; i < chainList.length; i++) {
            const name = chainList[i].tokenList;
            const nameSplit = name.split('/')[3];
            const checkName = nameSplit.replace('.json', '');
            // Checking if uploader has an error
            if (uploaderError) {
                uploaderError.map(error => {
                    setErrorMessage('json error: ' + error);
                })
            }

            // General textfield validation
            if (checkName === textfield) {
                setButtonDisabled(true)
                setErrorMessage('This tokenlist already exists.')
            } else {
                setButtonDisabled(false)
                setErrorMessage('')
            }

        }
    }, [textfield, uploaderError])


    return (
        <>
            <Modal show={props.show} >
                <Modal.Header>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.showSpinner
                        ?
                        <HashLoader
                            size={48}
                            css={override}
                            color={"#fd6d52"}
                            loading={true}
                        />
                        :
                        <></>
                    }
                    {props.description} {props.showTelegramText ? <a className='main-color-txt' href='https://t.me/joinchat/SM6jvB0FNmlz2t_KX8uYDg'>Telegram Channel link</a> : <></>}
                    {props.createTokenContent ?
                        <TextField
                            id='textfield'
                            label="Name for the tokenlist"
                            type='text'
                            name='email'
                            variant='outlined'
                            value={textfield}
                            onChange={(e: any) => setTextfield(e.target.value)}
                            helperText={errorMessage}
                        />
                        :
                        <></>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div className={props.extraBtnClass ? 'modal-footer-custom one-button' : 'modal-footer-custom'}>
                        {props.btnText ? <Button className='button' onClick={() => props.onClose()}>{props.btnText}</Button> : <></>}
                        {props.showUploaderButton ?
                            <Uploader
                                disabled={buttonDisabled}
                                accept='.json'
                                buttonClass='button'
                                chainID={props.uploaderChainid ? props.uploaderChainid : ''}
                                buttonTxt='Upload'
                                updateTokenlist={false}
                                updateTokenlistName=''
                                createTokenlist={true}
                                createTokenChainlist={props.createTokenChainlist}
                                onClick={() => emptyErrors()}
                                onError={(error: any) => setUploaderError(error)} />
                            : <></>
                        }
                        {props.showBuyButton ? <Button className='button'><a target='_blank' href='https://info.uniswap.org/pair/0x2e231cbf03ea19f8a5bed1c053e678729703d0ba'>{props.showBuyButtonText}</a></Button> : <></>}
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    globalReducer: state.globalReducer
});

export default connect(mapStateToProps)(CustomModal)

