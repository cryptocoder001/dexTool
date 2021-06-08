import React from 'react';
import {Grid} from '@material-ui/core';

function Table1(){
    return(
        <div className = "x-home-table1">
            <Grid container className = "pl-3 pr-3">
                <Grid item xs = {4} sm = {4} md = {4}>
                    <img src = "/img/tableEthIcon.png"/>
                    <span className = "d-inline-block" style = {{verticalAlign: "middle"}}>
                        <div className = "x-font4">BUNNY</div>
                        <div className = "x-font5">Bunny Token</div>
                    </span>
                </Grid>
                <Grid item xs = {4} sm = {4} md = {4} className = "text-center" style = {{alignSelf: "flex-end"}}>
                    <span className = "x-font5-static">$ 26,603234</span>
                </Grid>
                <Grid item xs = {4} sm = {4} md = {4} className = "text-right" style = {{alignSelf: "flex-end"}}>
                    <img src = "/img/pairIcon.png" width = "30px" className = "x-home-table-click-img" />
                </Grid>
            </Grid>
            <hr />
            <div>
                <Grid container className = "pl-3 pr-3">
                    <Grid item xs = {4} sm = {4} md = {4}>
                        <img src = "/img/upIcon.png" />
                        <span className = "x-font4"> CATE</span>
                    </Grid>
                    <Grid item xs = {4} sm = {4} md = {4} className = "text-center">
                        <span className = "x-font5-static">$ 26,603234</span>
                    </Grid>
                    <Grid item xs = {4} sm = {4} md = {4} className = "text-right">
                        <img src = "/img/pairIcon.png" width = "30px" className = "x-home-table-click-img" />
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}

export default Table1;