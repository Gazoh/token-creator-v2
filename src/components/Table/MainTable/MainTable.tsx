import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../../../helpers/icons';
import { toast } from 'react-toastify';
import { notify } from '../../../shared/functions';
import Image from '../../Utils/Image/Image';
import CopyToClipboard from 'react-copy-to-clipboard';

interface Props {
    tokens: Array<any>
}

toast.configure();

function MainTable(props: Props) {
    let baseToastText = 'Copied: ';

    useEffect(() => { }, [props.tokens])

    const generateUniswapLink = (tokenAdress: string) => {
        const defaultUrl = 'https://info.uniswap.org/token/';
        return defaultUrl + tokenAdress;
    }

    return (
        <div className="table-main">
            {props.tokens.map(token => {
                return <div key={Math.random()} className="table-row">
                    <CopyToClipboard text={token.logoURI}>
                        <div className="table-col table-img">
                            <Image src={token.logoURI} alt='' />
                        </div>
                    </CopyToClipboard>
                    <CopyToClipboard text={token.name}><div className="table-col" onClick={() => notify(baseToastText, token.name)}>{token.name}</div></CopyToClipboard>
                    <CopyToClipboard text={token.symbol}><div className="table-col" onClick={() => notify(baseToastText, token.symbol)}>{token.symbol}</div></CopyToClipboard>
                    <CopyToClipboard text={token.address}><div className="table-col" onClick={() => notify(baseToastText, token.address)}>{token.address}</div></CopyToClipboard>
                    <CopyToClipboard text={token.address}><div className="table-col" onClick={() => notify(baseToastText, token.address)}><span className='icon-box-sm copy'><FontAwesomeIcon icon={icons.copy} /></span></div></CopyToClipboard>
                    <div className="table-col"><a target='_blank' rel="noopener noreferrer" href={generateUniswapLink(token.address)}>Go to Uniswap</a></div>
                </div>
            })
            }
        </div>
    )
}

export default MainTable
