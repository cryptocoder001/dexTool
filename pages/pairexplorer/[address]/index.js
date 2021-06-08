import React, { useEffect, useState } from 'react';
import {Grid} from '@material-ui/core';
import PairCard from '../../../components/pair/pairCard';
import { useAllPairData,usePairData ,useHourlyRateData,usePairTransactions} from '../../../contexts/PairData'
import { formattedNum, formattedPercent} from '../../../utils'
import { useRouter } from 'next/router'
import PairList from '../../../components/PairList'
import Panel from '../../../components/Panel'
import { useMedia } from 'react-use'
import { useEthPrice } from '../../../contexts/GlobalData'
import { useSavedPairs } from '../../../contexts/LocalStorage'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { timeframeOptions } from '../../../constants'
import {updateRouter} from '../../../contexts/User';

import { TVChartContainer } from '../../../components/TVChartContainer';

import TxnList from '../../../components/TxnList'

const PairExplorer = ()=>{

  const {updateTab} = updateRouter();
    
  const below800 = useMedia('(max-width: 800px)')

  const router = useRouter();
  const { address } = router.query;

  const allPairs = useAllPairData()
  const [flag, setFlag] = useState(true);
  const {
    token0,
    token1,
    reserve0,
    reserve1,
    reserveUSD,
    trackedReserveUSD,
    oneDayVolumeUSD,
    volumeChangeUSD,
    oneDayVolumeUntracked,
    volumeChangeUntracked,
    liquidityChangeUSD,
  } = usePairData(address)

  useEffect(() => {
    document.querySelector('body').scrollTo(0, 0)
  }, [])

  useEffect(()=>{
    if(flag){
      setFlag(false);
      updateTab("3");
    }
      
  })

  
  const transactions = usePairTransactions(address)
  // liquidity
  const liquidity =reserveUSD
    ? formattedNum(reserveUSD, true)
    : '-'
  const liquidityChange = formattedPercent(liquidityChangeUSD)

  // mark if using untracked liquidity
  const [usingTracked, setUsingTracked] = useState(true)
  useEffect(() => {
    setUsingTracked(!trackedReserveUSD ? false : true)
  }, [trackedReserveUSD])

  // volume	  // volume
  const volume =
    oneDayVolumeUSD || oneDayVolumeUSD === 0
      ? formattedNum(oneDayVolumeUSD === 0 ? oneDayVolumeUntracked : oneDayVolumeUSD, true)
      : oneDayVolumeUSD === 0
      ? '$0'
      : '-'

  // mark if using untracked volume
  const [usingUtVolume, setUsingUtVolume] = useState(false)
  useEffect(() => {
    setUsingUtVolume(oneDayVolumeUSD === 0 ? true : false)
  }, [oneDayVolumeUSD])

  const volumeChange = formattedPercent(!usingUtVolume ? volumeChangeUSD : volumeChangeUntracked)

  // get fees	  // get fees
  const fees =
    oneDayVolumeUSD || oneDayVolumeUSD === 0
      ? usingUtVolume
        ? formattedNum(oneDayVolumeUntracked * 0.002, true)
        : formattedNum(oneDayVolumeUSD * 0.002, true)
      : '-'

  // token data for usd
  const [ethPrice] = useEthPrice()
  const token0USD =
    token0?.derivedETH && ethPrice ? formattedNum(parseFloat(token0.derivedETH) * parseFloat(ethPrice), true) : ''

  const token1USD =
    token1?.derivedETH && ethPrice ? formattedNum(parseFloat(token1.derivedETH) * parseFloat(ethPrice), true) : ''

  // rates
  const token0Rate = reserve0 && reserve1 ? formattedNum(reserve1 / reserve0) : '-'
  const token1Rate = reserve0 && reserve1 ? formattedNum(reserve0 / reserve1) : '-'

  // formatted symbols for overflow
  const formattedSymbol0 = token0?.symbol.length > 6 ? token0?.symbol.slice(0, 5) + '...' : token0?.symbol
  const formattedSymbol1 = token1?.symbol.length > 6 ? token1?.symbol.slice(0, 5) + '...' : token1?.symbol
  
  //chart data
  const [timeWindow, setTimeWindow] = useState(timeframeOptions.ALL_TIME)
  const hourlyData = useHourlyRateData(address, timeWindow)
  const hourlyRate0 = hourlyData && hourlyData[0]
  const hourlyRate1 = hourlyData && hourlyData[1]


  const below1080 = useMedia('(max-width: 1080px)')
  const below900 = useMedia('(max-width: 900px)')
  const below600 = useMedia('(max-width: 600px)')


  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
    console.log("liquidity", liquidity)
  }, [])

  const [savedPairs, addPair] = useSavedPairs()

    return(
        
        <div className = "diceGrid">
            <Grid container spacing = {3}>
                <Grid item xs = {12} sm = {12} md = {4}>
                    <PairCard input = {token0?.id} output = {token1?.id} volume = {volume} liquidity = {liquidity} token0 = {formattedSymbol0} token1 = {formattedSymbol1} reserve0 = {formattedNum(reserve0)} reserve1 = {formattedNum(reserve1)} fees = {fees} volumeChange ={volumeChange} />
                </Grid>
                <Grid item xs = {12} sm = {12} md = {8}>
                    <Panel
                        style={{
                        gridColumn: below1080 ? '1' : '2/4',
                        gridRow: below1080 ? '' : '1/5',
                        }}
                    >
						<TVChartContainer match={address} />
                    </Panel>
                </Grid>
            </Grid>
            <div style={{margin :"30px"}}>
            <div className = "mt-3 x-font4 text-left"  style={{margin :"20px"}} >Transactions</div>
            <Panel
            style={{
              marginTop: '1.5rem',
            }}
            >
              <TxnList transactions={transactions} /> 
            </Panel>
            <div className = "mt-3 x-font4 text-left"  style={{margin :"20px"}} >Top Pairs</div>
            <Panel style={{ padding: below800 && '1rem 0 0 0 ' }}>
              <PairList pairs={allPairs} disbaleLinks={true} maxItems={10} />
            </Panel>
            </div>
        </div>
    )
}

export default PairExplorer;