import React, {useState,useEffect} from 'react';
import {Grid} from '@material-ui/core';
import { useAllPairData } from '../contexts/PairData'
import {updateRouter} from '../contexts/User';
import Panel from '../components/Panel'
import { useMedia } from 'react-use'
import PairList from '../components/PairList'
import Search from '../components/Search'
import { useEthPrice } from '../contexts/GlobalData'
import { formattedNum} from '../utils'
import { ethers } from "ethers";

function Pairs(){
  const {updateTab} = updateRouter();
  
  //chain info
  const provider = new ethers.providers.JsonRpcProvider("https://rpc-mainnet.matic.network");
  const [gasPrice ,setGasPrice] = useState();
  const [hotPairs ,setHotPairs] = useState("");
  const [flag, setFlag] = useState(true);

    useEffect(()=>{
      if(flag){
        setFlag(false);
        updateTab("3");
      }
        
    })

  useEffect( async ()=>{
    var gasPricePromise =await provider.getGasPrice();
    setGasPrice(formattedNum(parseFloat(ethers.utils.formatUnits(gasPricePromise,"gwei")),false));
  })


  //PairData
  const allPairs = useAllPairData()

  const [ethPrice] = useEthPrice()
  const EtherPrice =formattedNum(parseFloat(ethPrice),true)

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
    console.log("ss",s,hotpairList);
  })


  const below800 = useMedia('(max-width: 800px)')


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
                            Pair Explorer
                        </div>
                        <div className = "x-font1">
                            Search for live new pairs
                        </div>
                    </Grid>
                    <Grid item xs = {12} sm = {12} md = {6}>
                      <Search small={true} />
                    </Grid>
                </Grid>
            </div>
            <div className = "x-pool-table">
                <div className = "x-font1">
                    Top Pairs
                </div>
                <div>
                  <Panel style={{ padding: below800 && '1rem 0 0 0 ' }}>
                    <PairList pairs={allPairs} disbaleLinks={true} maxItems={10} />
                  </Panel>
                </div>
            </div>
        </div>
    )
}

export default Pairs;