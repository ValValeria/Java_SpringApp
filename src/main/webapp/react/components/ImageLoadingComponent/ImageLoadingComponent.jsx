import React from 'react';
import OrangeProgressComponent from "../OrangeProgressComponent/OrangeProgressComponent";
import './ImageLoadingComponent.scss';


export default function({src, onClick=()=>{}, children=null}){
    const [showImage, update] = React.useState(false);
    const progress = React.useRef();

    const handleError = ($event)=>{
        update(false);
        $event.target.remove();
    };

    const handleSuccess = ($event)=>{
        progress.current.remove();
        update(true);
    };

    return (
        <div className={"image-handler w-100"}>
            <div className={"image-handler__container center flex-column"}>
                <div className={"image-handler__img center"} style={{zIndex: showImage ? 1 : 0}}>
                    <img src={src} onClick={onClick} alt={""} onLoad={handleSuccess} onError={handleError}/>
                    {
                        children
                    }
                </div>
                <div className={"image-handler__loading center"} style={{zIndex: !showImage ? 1 : 0}} ref={progress}>
                    <OrangeProgressComponent/>
                </div>
            </div>
        </div>
    )
}
