import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../../helpers/icons';
import Uniswap from '../../assets/images/uniswap.svg'
import DFO from '../../assets/images/dfo.svg';

interface Props {
    balance: number;
}

function SocialLinks(props: Props) {

    useEffect(() => { }, [])

    return (
        <>
            <div className='icon-box'>
                <a href="https://twitter.com/TheNerdQuarters" className='icon-box-sm twitter'><FontAwesomeIcon icon={icons.twitter} /></a>
            </div>
            <div className='icon-box'>
                <a href="https://discord.com/invite/CRAd5m" className='icon-box-sm discord'><FontAwesomeIcon icon={icons.discord} /></a>
            </div>
            <div className='icon-box'>
                <a href="https://info.uniswap.org/pair/0x2e231cbf03ea19f8a5bed1c053e678729703d0ba" className='icon-box-sm'><img src={Uniswap} /></a>
            </div>
            <div className='icon-box'>
                <a href="https://dapp.dfohub.com/?addr=0xfD344335b239d7864c83c7613FF7c228dF5F3e88" className='icon-box-sm dfo'><img src={DFO} /></a>
            </div>
            {
                props.balance && props.balance >= 1
                    ?
                    <>
                        <div className='icon-box'>
                            <a href="https://t.me/joinchat/SM6jvB0FNmlz2t_KX8uYDg" className='icon-box-sm uniswap'><FontAwesomeIcon icon={icons.telegram} /></a>
                        </div>
                    </>
                    :
                    <></>
            }
        </>
    )
}

export default SocialLinks
