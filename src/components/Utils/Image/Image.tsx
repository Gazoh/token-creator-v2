import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { icons } from '../../../helpers/icons';

interface Props {
    src: string;
    alt?: string;
    onClick?: Function;
}

function Image(props: Props) {
    const [imageIsLoaded, setImageIsLoaded] = useState(true);

    const checkImage = (e: any) => {
        if (e) {
            setImageIsLoaded(false);
        }
    }

    return (
        <>
            {imageIsLoaded && props.src !== "" && props.src !== undefined ?
                <img onClick={props.onClick ? props.onClick() : null} id={props.src} src={props.src} onError={(e) => checkImage(e)} alt={props.alt ? props.alt : 'image'} /> :
                // Fallback
                <div className='icon-box-sm'><FontAwesomeIcon icon={icons.image} /></div>
            }
        </>
    )
}

export default Image
