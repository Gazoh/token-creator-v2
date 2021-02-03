import React, { useEffect } from 'react'

interface Props {}

function Footer(props: Props) {

    useEffect(() => { }, [])

    const getCurrentYear = () => {
        let year = new Date();
        return year.getFullYear()
    }

    return (
        <>
          <span>&copy; Copyright {getCurrentYear()} Nerd Finance. All rights reserved. Nerd is a Decentralized Flexible Organization. <a href="https://dapp.dfohub.com/?addr=0xfD344335b239d7864c83c7613FF7c228dF5F3e88">Go to DFO Hub</a></span>
        </>
    )
}

export default Footer
