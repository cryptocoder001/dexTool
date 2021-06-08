import React from 'react';
import {Grid, Slider} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Link from '../Link'
const colorStyle1 = {backgroundImage: "linear-gradient( to right,#f92772 0%,#d90752 100% )" };


  const PayoutSlide = withStyles({
    root: {
      color: '#7fc03e',
      height: 4,
    },
    thumb: {
      display: "none"
    },
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
        color: "#c30a96",
        height: 4,  
    },
    rail: {
        backgroundImage: "linear-gradient( to right,#316fdc 0%,#3c1c65 100% )",
        height: 4,
        opacity: 1
    },
  })(Slider);

  const LikeSlide = withStyles({
    root: {
      color: '#7fc03e',
      height: 10,
    },
    thumb: {
      display: "none"
    },
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
        color: "#c30a96",
        height: 10,
    },
    rail: {
        backgroundImage: "linear-gradient( to right,#316fdc 0%,#3c1c65 100% )",
        height: 10,
        opacity: 1
    },
  })(Slider);

function PairCard(props){
    const {input, output, volume, liquidity, token0, token1, reserve0, reserve1, fees ,volumeChange} =props;


    return(
        <div className = "x-pair-card1">
            <div>
                <span className = "float-left"><img src = "/img/pair_icon1.png"/></span>
                <span className = "float-right">
                <Link color="textDim" external href={'https://https://app.uniswap.org/#/swap?inputCurrency=' + input + "&outputCurrency=" + output}>
                    <button className = "x-button3" style = {colorStyle1}>Trade</button>
                </Link>
                </span>
                <span className = "float-right"><img src = "/img/pair_icon3.png"/></span>
                <span className = "float-right"><img src = "/img/pair_icon2.png"/></span>
            </div>
            
            <div className = "mt-5">
                <div className = "mb-2">
                    <span className = "x-font1">Total liquidity:</span>
                    <span className = "x-font1 float-right">{liquidity}</span>
                </div>
                <div className = "mb-2">
                    <span className = "x-font1">Daily volume:</span>
                    <span className = "x-font1 float-right">{volume}</span>
                </div>
                <div className = "mb-2">
                    <span className = "x-font1">Pooled {token0}:</span>
                    <span className = "x-font1 float-right">{reserve0}</span>
                </div>
                <div className = "mb-2">
                    <span className = "x-font1">Pooled {token1}:</span>
                    <span className = "x-font1 float-right">{reserve1}</span>
                </div>
                <div className = "mb-2">
                    <span className = "x-font1">Total Fees:</span>
                    <span className = "x-font1 float-right">{fees}</span>
                </div>
            </div>
            <div className = "mt-3 text-right"><button className = "x-button4" style = {colorStyle1}>View market cap</button></div>
            <div className = "x-pair-card-slider mt-3">
                <Grid container>
                    <Grid item xs = {8} sm = {8} md = {8}>
                    <PayoutSlide valueLabelDisplay="auto" aria-label="pretto slider" value = "99" min={0} max={100} step={1}/>
                    <PayoutSlide valueLabelDisplay="auto" aria-label="pretto slider" value = "99" min={0} max={100} step={1}/>
                    <PayoutSlide valueLabelDisplay="auto" aria-label="pretto slider" value = "99" min={0} max={100} step={1}/>
                    <PayoutSlide valueLabelDisplay="auto" aria-label="pretto slider" value = "99" min={0} max={100} step={1}/>
                    </Grid>
                    <Grid item xs = {4} sm = {4} md = {4} className = "text-right">
                        <div className = "x-font4">Score</div>
                        <div className = "x-font9-static">99</div>
                    </Grid>
                </Grid>
            </div>
            <div className = "mt-3 x-font4 text-center">Community trust(784 votes)</div>
            <div className = "mt-3">
                <Grid container>
                    <Grid item xs = {3} sm = {2} md = {2}>
                        <img src = '/img/like.png' />
                        <span className = 'x-font5-static'> 98.7%</span>
                    </Grid>
                    <Grid item xs = {6} sm = {8} md = {8} style = {{paddingRight: '5px', paddingLeft: "5px"}}>
                    <LikeSlide value = "99" min={0} max={100} step={1}/>
                    </Grid>
                    <Grid item xs = {3} sm = {2} md = {2} className = "text-right">
                        <span className = 'x-font6-static'> 1.3% </span>
                        <img src = '/img/dislike.png' />
                    </Grid>
                </Grid>

            </div>
        </div>
    )
}

export default PairCard;