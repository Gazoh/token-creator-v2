import React from 'react'

interface Props {
    row: Array<any>
}

function MainTableRow(props: Props) {

    return (
        <div className="table-row table-header">
            {props.row.map(header => {
                return <div key={header.id} className="table-col">
                    {header.label}
                </div>
            })}
        </div>
    )
}

export default MainTableRow
