import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import CardItem from '../simple/cardItem';
import ShadowCardItem from '../simple/shadowCardItem';
import {Grid} from '@material-ui/core';

const colorStyle1 = {backgroundImage: "linear-gradient( to right,#f92772 0%,#d90752 100% )" }

import {useRouter} from 'next/router';


function Card2(){
    
  const router = useRouter();
    return(
        <div className = "x-home-card1">
            <div>
                <button className = "x-button2" style = {colorStyle1}><img src = "/img/walletInfo.png"/> Wallet Info Matic</button>
            </div>
            <Grid container spacing = {3} className = "mt-4">
                <Grid item xs = {12} sm = {12} md = {6}>
                    <div  onClick={()=>{router.push(`/multiswap`);}}>
                        <ShadowCardItem img = "/img/multiIcon.png" text = "Multiswap"/>
                    </div>
                </Grid>
                <Grid item xs = {12} sm = {12} md = {6}>
                    <div  onClick={()=>{router.push(`/multiswap`);}}>
                        <ShadowCardItem img = "/img/botIcon.png" text = "New Pair Bot Matic"/>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Card2;