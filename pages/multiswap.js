import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {updateRouter} from '../contexts/User';

function Multiswap(){
    const {updateTab} = updateRouter();
    const [flag, setFlag] = useState(true);
    useEffect(()=>{
        if(flag){
            setFlag(false);
            updateTab("4");
        }
    })
    return(
        <div className = "diceGrid">
            <div className = "x-multi-top">
                <Grid container>
                    <Grid item xs = {4} sm = {4} md = {2}>
                        <img src = "/img/multiIcon3.png" />
                        <span className = "x-font6"> ETH: $2374.53</span>
                    </Grid>
                    <Grid item xs = {4} sm = {4} md = {2}>
                        <img src = "/img/multiIcon2.png" />
                        <span className = "x-font6"> 88 GWEI</span>
                    </Grid>
                    <Grid item xs = {4} sm = {4} md = {2}>
                        <img src = "/img/multiIcon1.png" />
                        <span className = "x-font6"> HOT PAIRS</span>
                    </Grid>
                    <Grid item xs = {12} sm = {4} md = {6}>
                        <span className = "x-font7">#1 KWIK #2 eMax #3 BSOCIAL  #4 KISHU  #5 GTC</span>
                    </Grid>
                </Grid>
            </div>
            <div className = "x-multi-center">
                <div>
                    <img src = '/img/multiRed.png' />
                </div>
                <div className = "x-font8-static">
                    Search and add pairs
                </div>
                <div className = "x-font4 mb-5">
                    You can add as many pairs as you want in the same view.
                </div>
                <div className = "x-home-card1-search">
                    <SearchIcon style = {{color: "#07a7b1"}}/>
                    <input className = "x-home-card1-search-input"/>
                </div>
            </div>
        </div>
    )
}

export default Multiswap;