import React, {useEffect} from "react";

const AR = () => {
 useEffect(()=> {
    if (navigator.xr) {
        navigator.xr.requestSession('immersive-ar').then((session) => {

        } );
    }
else{
    console.error('WebXR not supported')
}
 })
}