import React, {useState,useMemo,useEffect} from 'react';
import {Grid} from '@material-ui/core';
import { useAllTokenData } from '../contexts/TokenData'
import Panel from '../components/Panel'
import TopTokenList from '../components/TokenList'
import { useMedia } from 'react-use'
import Search from '../components/Search'
import {updateRouter} from '../contexts/User';
import { useEthPrice } from '../contexts/GlobalData'
import { formattedNum} from '../utils'
import { ethers } from "ethers";

import { useAllPairData } from '../contexts/PairData'

function PoolExplorer(){
  
  const {updateTab} = updateRouter();
  const [hotPairs ,setHotPairs] = useState("");
  const [flag, setFlag] = useState(true);

    useEffect(()=>{
      if(flag){
        setFlag(false);
        updateTab("2");
      }
        
    })
  
  
  //TokenData
  
  //chain info
  const provider = new ethers.providers.JsonRpcProvider("https://rpc-mainnet.matic.network");
  const [gasPrice ,setGasPrice] = useState();

  useEffect( async ()=>{
    var gasPricePromise =await provider.getGasPrice();
    setGasPrice(formattedNum(parseFloat(ethers.utils.formatUnits(gasPricePromise,"gwei")),false));
  })

  const [ethPrice] = useEthPrice()
  const EtherPrice =formattedNum(parseFloat(ethPrice),true)


  const allTokens = useAllTokenData()

  //PairData
  const allPairs = useAllPairData()
  
  //hot pair
  const hotpairList =allPairs &&
  Object.keys(allPairs)
    .sort((addressA, addressB) => {
      const pairA = allPairs[addressA]
      const pairB = allPairs[addressB]
        const apy0 = parseFloat(pairA.oneDayVolumeUSD * 0.002 * 356 * 100) / parseFloat(pairA.reserveUSD)
        const apy1 = parseFloat(pairB.oneDayVolumeUSD * 0.002 * 356 * 100) / parseFloat(pairB.reserveUSD)
        return apy0 > apy1;

    })
    .slice(0,4);
  
    
  useEffect(()=>{
    var s="";
    for (var i=0; i<hotpairList.length; i++){
      const pairData = allPairs[hotpairList[i]]
      if (pairData && pairData.token0 && pairData.token1) {
        s = s +(i+1) +"#" + pairData.token0.symbol + '-' + pairData.token1.symbol + "  ";
        console.log("add s",s)
      }
    }
    setHotPairs(s);
  })

  const below600 = useMedia('(max-width: 800px)')
    return(
        <div className = "diceGrid">
            <div className = "x-multi-top">
                <Grid container>
                    <Grid item xs = {4} sm = {4} md = {2}>
                        <img src = "/img/multiIcon3.png" />
                        <span className = "x-font6"> ETH: {EtherPrice}</span>
                    </Grid>
                    <Grid item xs = {4} sm = {4} md = {2}>
                        <img src = "/img/multiIcon2.png" />
                        <span className = "x-font6"> {gasPrice} GWEI</span>
                    </Grid>
                    <Grid item xs = {4} sm = {4} md = {2}>
                        <img src = "/img/multiIcon1.png" />
                        <span className = "x-font6"> HOT PAIRS</span>
                    </Grid>
                    <Grid item xs = {12} sm = {4} md = {6}>
                        <span className = "x-font7">{hotPairs}</span>
                    </Grid>
                </Grid>
            </div>
            <div className = "mt-5">
                <Grid container>
                    <Grid item xs = {12} sm = {12} md = {6}>
                        <div className = "x-font8-static">
                            Pool Explorer
                        </div>
                        <div className = "x-font1">
                            Search for live new tokens and pool updates
                        </div>
                    </Grid>
                    <Grid item xs = {12} sm = {12} md = {6}>
                      <Search small={true} />
                    </Grid>
                </Grid>
            </div>
            <div className = "x-pool-table">
                <div className = "x-font1">
                    POOLS ACTIVITY
                </div>
                <Panel style={{ marginTop: '6px', padding: below600 && '1rem 0 0 0 ' }}>
                  <TopTokenList tokens={allTokens} itemMax={10} />
                </Panel>
            </div>
        </div>
    )
}

export default PoolExplorer;