import React, { useEffect, useState } from 'react';
// Components
import { connect } from 'react-redux';
import Table from '../../components/Table/Table/Table';
import Uploader from '../../components/Utils/Uploader/Uploader';
// Helpers
import { getChainList, getTokenList } from '../../actions/Global';
import { tableHeader } from './HomeHelper';
import { connectWeb3, getChainID, balanceOf, getAccounts } from '../../providers/web3';
import moment from "moment";
import Logo from '../../assets/images/nerd-finance-logo.svg'
import Image from '../../components/Utils/Image/Image';
import Button from '../../components/Utils/Button/Button';
import Modal from '../../components/CustomModal/CustomModal';
import SocialLinks from '../../components/SocialLinks/SocialLinks';
import Footer from '../../components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../../helpers/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import { notify } from '../../shared/functions';

interface Props {
    globalReducer: any,
    getTokenList: Function,
    getChainList: Function,
    history: any
}

function Home(props: Props) {
    const [balance, setBalance] = useState(0)
    const [modal, showModal] = useState(false);
    const [modalCreateToken, showModalCreateToken] = useState(false);
    const [connected, setConnection] = useState(false);
    const [errorUploader, setUploaderError] = useState([]);
    const [maxNerd] = useState(100);
    const [chainId, setChainId] = useState('');
    const [isInChainList, setInChainList] = useState(false);
    const [mainListLink] = useState(process.env.REACT_APP_PLAY);
    const [baseToastText] = useState('Copied: ');

    const checkConnected = () => {
        getAccounts((account: any) => {
            if (account.length > 0) {
                setConnection(true)
                getChainID(0, (chain: any) => {
                    setChainId(chain);

                    balanceOf(chain, (balance: any) => {
                        setBalance(balance)
                    })
                })
            } else {
                setConnection(false)
            }
        });
    }

    const checkTokenList = () => {
        // get link and show me the currentList
        let url = getUrlLink();
        props.getTokenList(url);

        // GetChainList
        props.getChainList();
        // Get chainlist and check if it is yours.
        const chainList = props.globalReducer.chainList;
        for (let i = 0; i < chainList.length; i++) {
            const list = chainList[i].chainID_list;
            const chainListTokenUrl = chainList[i].tokenList;
            list.map((list: any) => {
                // Checking if one of the chainId matches with my chain id
                if (list.toLowerCase() === chainId.toLowerCase() && chainListTokenUrl === url) {
                    // If they match get my tokenlist url;
                    setInChainList(true)
                }
            })
        }
    }

    const getUrlLink = (onlyGetName?: boolean) => {
        // Strip href link to show tokenlist
        const url = window.location.href;
        const stripUrl = url.split('/');
        const finalUrl = stripUrl[3];
        let getTokenlistUrl = finalUrl === '' || finalUrl.length === 0 || finalUrl === '/' ? mainListLink + 'token_list.json' : mainListLink + finalUrl + '.json';
        if (onlyGetName) return finalUrl === '' ? 'token_list' : finalUrl;
        return getTokenlistUrl;
    }

    useEffect(() => {
        // Get tokenlist
        checkTokenList();
        // if connected set balance
        checkConnected()
    }, [connected, balance, errorUploader, isInChainList, chainId])

    return (
        <>
            <div id='content-wrapper'>
                <div id='modal-wrap'>
                    {/* MODAL */}
                    <Modal
                        title={!connected && !balance ? 'Connecting to wallet' : balance >= maxNerd && connected ? "Congratulations, we found some $NERD in your wallet" : "Sorry, we haven't found enough $NERD in your wallet"}
                        description={!connected && !balance ? 'Please ensure you are logged in to your favorite Web3 wallet...' : balance >= maxNerd && connected ? 'You can now upload a new token list and you have also unlocked the' : balance < maxNerd && connected ? 'To access the token list upload function you need to have at least 1 $NERD token in your wallet.' : ''}
                        btnText={!connected && !balance ? 'Close' : 'Close'}
                        showTelegramText={balance >= maxNerd && connected ? true : false}
                        showBuyButton={balance >= maxNerd || !connected ? false : true}
                        extraBtnClass={balance >= maxNerd || !connected ? true : false}
                        showBuyButtonText='Buy on Uniswap'
                        show={modal}
                        onClose={() => showModal(false)}
                        showSpinner={!connected && !balance ? true : false}
                    />
                    {/* Create tokenlist */}
                    <Modal
                        createTokenContent={true}
                        showUploaderButton={true}
                        uploaderChainid={chainId}
                        setUploaderError={(error: any) => setUploaderError(error)}
                        createTokenChainlist={props.globalReducer.chainList}
                        title="Create a tokenlist"
                        show={modalCreateToken}
                        btnText='Close'
                        onClose={() => showModalCreateToken(false)}
                    />
                </div>
                <div id='header'>
                    <div className='logo-main'>
                        <Image src={Logo} alt='Nerd Finance Logo' />
                    </div>
                    <div className='header-content'>
                        <div className='header-content-top'>
                            {/* Check if person is connected */}
                            {!connected &&
                                <Button className='button' onClick={() => {
                                    showModal(true);
                                    connectWeb3(() => {
                                        // Get logged in chain ID;
                                        getChainID(0, (chain: any) => {
                                            balanceOf(chain, (balance: any) => {
                                                setBalance(balance)
                                            })
                                        })
                                    });
                                }}>Connect to wallet</Button>
                            }
                            {/* Check if person is connected, has balance and his balance is bigger or equal to ${maxNerd} variable.*/}
                            {connected && balance >= maxNerd && <Button className='button' onClick={() => showModalCreateToken(true)}>Create a tokenlist</Button>}
                            {/* Check if person is connected and is in chainlist*/}
                            {connected && isInChainList &&
                                <Uploader
                                    accept='.json'
                                    buttonClass='button update'
                                    chainID={chainId}
                                    buttonTxt='Update tokenlist'
                                    updateTokenlist={true}
                                    updateTokenlistName={getUrlLink(true)}
                                    createTokenlist={false}
                                    createTokenListName={getUrlLink(true)}
                                    createTokenChainlist={props.globalReducer.chainList}
                                    onError={(error: any) => setUploaderError(error)}
                                    onClick={() => setUploaderError([])} />
                            }
                            {/* Checking if person is connected and has enough balance to upload */}
                            {connected && balance < maxNerd && !isInChainList && <Button className='button' onClick={() => showModal(true)}>Not enough $NERD</Button>}
                            {/* COPY LINK BUTTON DESKTOP */}
                            <CopyToClipboard text={getUrlLink()}>
                                <Button className='button-icon desktop' onClick={() => notify(baseToastText, getUrlLink())}>
                                    <FontAwesomeIcon icon={icons.copy} />
                                </Button>
                            </CopyToClipboard>
                            <CopyToClipboard text={getUrlLink()}>
                                <Button className='button mobile' onClick={() => notify(baseToastText, getUrlLink())}>
                                    Copy URL
                                </Button>
                            </CopyToClipboard>
                        </div>
                        <div className='header-content-btm'>
                            <span className='date-time mobile'>Last updated: {moment(props.globalReducer.tokenList.timestamp).format('LLL')}</span>
                        </div>
                    </div>
                </div>
                {/* Uploader error if error occurs */}
                {errorUploader.length > 0 ?
                    <div id='error-wrapper'>
                        <div className='error-box'>
                            {errorUploader.map((error: any, key: any) => {
                                return <span key={key} className='error-uploader'>{error} <div>&nbsp; / &nbsp;</div></span>
                            })}
                        </div>
                    </div>
                    :
                    <></>
                }
                <div id='table-wrapper'>
                    <div className='main-table'>
                        <Table header={tableHeader} tokens={props.globalReducer.tokens} />
                    </div>
                </div>
                <div id="social-media">
                    <SocialLinks balance={balance} />
                </div>
                <div id="footer">
                    <Footer />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    globalReducer: state.globalReducer
});

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getTokenList: (list: string) => dispatch(getTokenList(list)),
        getChainList: () => dispatch(getChainList())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
