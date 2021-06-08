import React, { useEffect, useState } from 'react';
import {Grid} from '@material-ui/core';
import { formattedNum, formattedPercent} from '../../../utils'
import { useRouter } from 'next/router'
import Panel from '../../../components/Panel'
import { useMedia } from 'react-use'

import TradingViewWidget, { Themes } from 'react-tradingview-widget';

import TopTokenList from '../../../components/TokenList'
import { TVChartContainer } from '../../../components/TVChartContainer1';
import { useDataForList } from '../../../contexts/PairData'
import { useAllTokenData,useTokenData, useTokenPairs,useTokenTransactions} from '../../../contexts/TokenData'
import TokenCard from '../../../components/Token/tokenCard';

import TxnList from '../../../components/TxnList'
import { updateRouter } from '../../../contexts/User'



const TokenExplorer = ()=>{

  const {updateTab} = updateRouter();

    
  const below800 = useMedia('(max-width: 800px)')

  const router = useRouter();
  const { address } = router.query;
  const [flag, setFlag] = useState(true);

  const {
    id,
    name,
    symbol,
    priceUSD,
    oneDayVolumeUSD,
    totalLiquidityUSD,
    volumeChangeUSD,
    oneDayVolumeUT,
    volumeChangeUT,
    priceChangeUSD,
    liquidityChangeUSD,
    oneDayTxns,
    txnChange,
  } = useTokenData(address)

  const allTokens = useAllTokenData()
  
  const allPairs = useTokenPairs(address)

  useEffect(()=>{
    if(flag){
      setFlag(false);
      updateTab("2");
    }
      
  })

  useEffect(() => {
    console.log(
      id,
      name,
      symbol,
      priceUSD,
      oneDayVolumeUSD,
      totalLiquidityUSD,
      volumeChangeUSD,
      oneDayVolumeUT,
      volumeChangeUT,
      priceChangeUSD,
      liquidityChangeUSD,
      oneDayTxns,
      txnChange,)
    document.querySelector('body').scrollTo(0, 0)
  },)


  // price
  const price = priceUSD ? formattedNum(priceUSD, true) : ''
  const priceChange = priceChangeUSD ? formattedPercent(priceChangeUSD) : ''

  // volume
  const volume =
    oneDayVolumeUSD || oneDayVolumeUSD === 0
      ? formattedNum(oneDayVolumeUSD === 0 ? oneDayVolumeUT : oneDayVolumeUSD, true)
      : oneDayVolumeUSD === 0
      ? '$0'
      : '-'

  // mark if using untracked volume
  const [usingUtVolume, setUsingUtVolume] = useState(false)
  useEffect(() => {
    setUsingUtVolume(oneDayVolumeUSD === 0 ? true : false)
  }, [oneDayVolumeUSD])

  const volumeChange = formattedPercent(!usingUtVolume ? volumeChangeUSD : volumeChangeUT)

  // liquidity
  const liquidity = totalLiquidityUSD ? formattedNum(totalLiquidityUSD, true) : totalLiquidityUSD === 0 ? '$0' : '-'
  const liquidityChange = formattedPercent(liquidityChangeUSD)

  const below1080 = useMedia('(max-width: 1080px)')
  const below900 = useMedia('(max-width: 900px)')
  const below600 = useMedia('(max-width: 600px)')

  // get data for this account
  const transactions = useTokenTransactions(address)

  // get data for user stats
  const transactionCount = transactions?.swaps?.length + transactions?.burns?.length + transactions?.mints?.length


  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }, [])

    return(
        <div className = "diceGrid">
            <Grid container spacing = {3}>
                <Grid item xs = {12} sm = {12} md = {4}>
                  <TokenCard output = {address} name={name} symbol = {symbol} price={price} priceChange={priceChange} volume = {volume} volumeChange = {volumeChange} liquidity = {liquidity} liquidityChange = {liquidityChange}/>
                </Grid>
                <Grid item xs = {12} sm = {12} md = {8}>
                    <Panel
                        style={{
                        gridColumn: below1080 ? '1' : '2/4',
                        gridRow: below1080 ? '' : '1/5',
                        height:"550px" 
                        }}
                    >
                    <TVChartContainer match={address}/>
                    </Panel>
                </Grid>
            </Grid>
            <div style={{margin :"50px"}}>
            <Panel style={{ padding: below800 && '1rem 0 0 0 ' }}>
              <TopTokenList tokens={allTokens} itemMax={10} />
            </Panel>
            
            <Panel
            style={{
              marginTop: '1.5rem',
            }}
            >
              <TxnList transactions={transactions} />
            </Panel>
            </div>
        </div>
    )
}

export default TokenExplorer;