import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import CardItem from '../simple/cardItem';
import ShadowCardItem from '../simple/shadowCardItem';
import {Grid} from '@material-ui/core';
import {useRouter} from 'next/router';

function Card1(){
    
  const router = useRouter();

    return(
        <div className = "x-home-card1">
            <div className = "x-home-card1-search">
                <SearchIcon style = {{color: "#07a7b1"}}/>
                <input className = "x-home-card1-search-input"/>
            </div>
            <Grid container spacing = {3} className = "mt-4">
                <Grid item xs = {12} sm = {12} md = {6}>
                    <div  onClick={()=>{router.push(`/pool-explorer`);}}>
                        <ShadowCardItem img = "/img/poolIcon.png" text = "Pool Explorer"/>
                    </div>
                </Grid>
                <Grid item xs = {12} sm = {12} md = {6}>
                    <div  onClick={()=>{router.push(`/pairs`);}}>
                        <ShadowCardItem img = "/img/pairIcon.png" text = "Pair Explorer"/>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Card1;