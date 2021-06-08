import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import Switch from "react-switch";
import {updateRouter} from '../contexts/User';


function PairExplorer(){
    const {updateTab} = updateRouter();
    const [movement, setMovement] = useState(false);
    const [notification, setNotification] = useState(false);
    const [language, setLanguage] = useState(false);
    const [flag, setFlag] = useState(true);

    useEffect(()=>{
        if(flag){
            setFlag(false);
            updateTab("5");
        }
        
    })

    const handleMovement = () =>{
        setMovement(!movement);
    }

    const handleNotification = () =>{
        setNotification(!notification);
    }

    return(
        <div className = "diceGrid">
            <div className = "text-center mt-5 x-font8-static">
                CONFIGURABLE PARAMETERS
            </div>
            <Grid container>
                <Grid item xs = {0} sm = {1} md = {2}>
                </Grid>
                <Grid item xs = {12} sm = {10} md = {8}>
                    <div className = "x-config-card">
                        <div className = "mb-5">
                            <span className = "d-inline-block">
                                <div className = "x-font6">DISABLE HOT PAIRS MOVEMENT</div>
                                <div className = "x-font6-static">ENABLE / DISABLE</div>
                            </span>
                            <span className = "float-right">
                                <Switch
                                    onChange={handleMovement}
                                    checked={movement}
                                    className="react-switch"
                                />
                            </span>
                        </div>
                        <div className = "mb-4">
                            <span className = "d-inline-block">
                                <div className = "x-font6">BROWSER NOTIFICATIONS</div>
                                <div className = "x-font6-static">ENABLE OR DISABLE NOTIFICATIONS.</div>
                            </span>
                            <span className = "float-right">
                                <Switch
                                    onChange={handleNotification}
                                    checked={notification}
                                    className="react-switch"
                                />
                            </span>
                        </div>
                    </div>
                </Grid>
                <Grid item xs = {0} sm = {1} md = {2}>
                </Grid>
            </Grid>
        </div>
    )
}

export default PairExplorer;