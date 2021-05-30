import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./store";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import HeaderMediaComponent from "./components/HeaderMediaComponent/HeaderMediaComponent";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import {Subject} from "rxjs";
import Routes from "./routes";
import SnackbarComponent from "./components/SnackComponent/SnackComponent";

export const $media =  new Subject();
export const showSnackbar$ = new Subject();

export default function App(){
    document.oncopy = ($event) => {
        showSnackbar$.next({state: true, message: "Copying is not allowed on this website"});
        $event.preventDefault();
        $event.stopImmediatePropagation();
    };

    document.oncontextmenu = ($event)=>{
        showSnackbar$.next({state: true,
            message: "Viewing html code is allowed on this website"});
  //      $event.preventDefault();
    }

    const [media, updateMedia] = React.useState(false);
    const [state] = React.useState({state: false, message: ""});

    const callback = React.useCallback(()=>{
          if(window.matchMedia("(max-width: 1000px)").matches){
              updateMedia(true);
              $media.next(true);
          } else{
              updateMedia(false);
              $media.next(false);
          }
    },[]);

    React.useEffect(()=>{
        callback();
    },[]);

    window.addEventListener("resize",callback)

    return (
       <BrowserRouter>
            <Provider store={store}>
                    <React.Fragment>
                        <SnackbarComponent {...state}/>
                        {media ? <HeaderMediaComponent/> : <HeaderComponent/>}
                        <Routes/>
                        <FooterComponent/>
                    </React.Fragment>
            </Provider>
       </BrowserRouter>
    );
}