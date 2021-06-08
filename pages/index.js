import React, {useState, useEffect} from 'react';
import CircleToken from '../components/simple/circleToken';
import {Grid} from '@material-ui/core';
import Card1 from '../components/home/card1';
import Card2 from '../components/home/card2';

import PairList from '../components/PairList'
import { useAllPairData } from '../contexts/PairData'
import Panel from '../components/Panel'
import { useMedia } from 'react-use'
import {useRouter} from 'next/router';
import {updateRouter} from '../contexts/User';



export default function Home() {
    const {updateTab} = updateRouter();
    //PairData
    const allPairs = useAllPairData()
    const below800 = useMedia('(max-width: 800px)')
    
  const router = useRouter();
  const [flag, setFlag] = useState(true);
    useEffect(()=>{
        if(flag){
            setFlag(false);
            updateTab("1");
        }
    })

    return (
        <div className = "diceGrid">
        <Grid container>
            <Grid item xs = {12} sm = {12} md = {6} className = "d-flex">
                <CircleToken img = "/img/matic.png" text = "MATIC"/>
                <CircleToken img = "/img/blueEthereum.png" text = "ETH"/>
                <CircleToken img = "/img/bsc.png" text = "BSC"/>
            </Grid>
            <Grid item xs = {12} sm = {12} md = {6}>
               
            </Grid>
        </Grid>
        <Grid container spacing = {3} className = "mb-4">
            <Grid item xs = {12} sm = {12} md = {6}>
                <div className = "x-font3">
                    <span className = "x-home-top-card-title">Uniswap</span>
                    Tools
                </div>
                <div className = "mt-4">
                    <Card1 />
                </div>
            </Grid>
            <Grid item xs = {12} sm = {12} md = {6}>
                <div className = "x-font3">
                    <span className = "x-home-top-card-title">COMMON</span>
                    Tools
                </div>
                <div className = "mt-4">
                    <Card2 />
                </div>
            </Grid>
        </Grid>
        <Grid container spacing = {3} className = "pb-2">
            <Grid item xs = {12} sm = {12} md = {12}>
                <div className = "x-font3">
                    <span className = "x-home-top-table-title">UniSwap</span>
                    Hot
                </div>
                <div className = "mt-4">
                    <Panel style={{ padding: below800 && '1rem 0 0 0 ' }}>
                    <PairList pairs={allPairs} disbaleLinks={true} maxItems={10} />
                    </Panel>
                </div>
            </Grid>
        </Grid>
        </div>
    )
}