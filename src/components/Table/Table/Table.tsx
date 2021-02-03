import React from 'react'
import './Table.scss'
import MainTableRow from '../MainTableRow/MainTableRow'
import MainTable from '../MainTable/MainTable'

interface Props {
    header: Array<any>,
    tokens: any
}

function Table(props: Props) {
    return (
        <>
            <MainTableRow row={props.header}/>
            <MainTable tokens={props.tokens}/>
        </>
    )
}

export default Table
