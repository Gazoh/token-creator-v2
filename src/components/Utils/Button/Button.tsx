import React from 'react';

interface Props {
    children: React.ReactNode,
    type?: 'button' | 'submit' | 'reset',
    className?: string,
    onClick?: Function
    disabled?: boolean
}

function Button(props: Props) {

    return (
        <>
            <button disabled={props.disabled} onClick={() => props.onClick ? props.onClick() : null} className={props.className} type={props.type}>{props.children}</button>
        </>
    )
}

export default Button
