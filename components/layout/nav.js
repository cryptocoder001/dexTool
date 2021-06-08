import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Navbar, Nav} from 'react-bootstrap';
import {Grid} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import StayCurrentLandscapeIcon from '@material-ui/icons/StayCurrentLandscape';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import { useDarkModeManager } from '../../contexts/LocalStorage';
import {updateRouter} from '../../contexts/User';

const colorStyle1 = {backgroundImage: "linear-gradient( to right,#f92772 0%,#d90752 100% )" }

function Navigation(){
    const {state,updateTab} = updateRouter();
    const router = useRouter();
    const [mode, setMode] = useState("dark");
    const [flag, setFlag] = useState(true);

    
    const [isDark, toggleDarkMode] = useDarkModeManager()

    useEffect(()=>{
        if(flag){
                setFlag(false);
                toggleDarkMode(true);
                window.localStorage.setItem('theme', 'dark');
                document.body.classList.add('dark');
            }    
        })

    const handleCourse = (e,v) =>{
        updateTab(v);
        console.log(state.tab);
        if(v==1){
            router.push("/");
        }
        else if(v==2){
            router.push("/pool-explorer");
        }
        else if(v==3){
            router.push("/pairs");
        }
        else if(v==4){
            router.push("/multiswap");
        }
        else{
            router.push("/configuration")
        }
    }
    const handleMode = (e,v) =>{
        if(v=="dark"){
            setMode('dark');
            toggleDarkMode(true);
            window.localStorage.setItem('theme', 'dark');
            document.body.classList.add('dark');
        }
        else{
            
            toggleDarkMode(false);
            setMode('light');
            window.localStorage.setItem('theme', 'dark');
            document.body.classList.remove('dark');
        }
    }
    return(
        <div className = "navGrid">
            <Grid container className = "navGridTop">
                <Grid item xs = {12} sm = {4} md = {3} lg = {3} className = "mb-4">
                    <a href = "/"><img src = {mode=="dark"?`/img/logo.png`:`/img/lightLogo.png`} alt = "logo" /></a>
                </Grid>
                <Grid item xs = {1} sm = {2} md = {5} lg = {6}></Grid>
                <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                    <Grid container>
                        <Grid item xs = {6} sm = {6} md = {6} className = "pr-2">
                            <button className = "x-button1" style = {colorStyle1}>User account</button>
                        </Grid>
                        <Grid item xs = {3} sm = {3} md = {3} className = "x-light-item" onClick = {(e)=>handleMode(e, "light")}>
                            <span style = {mode=="light"?{border: "1px solid red", backgroundColor: "white", color: "#3b0d8c"}:null} className = "x-mode-span">light</span>
                        </Grid>
                        <Grid item xs = {3} sm = {3} md = {3} className = "x-dark-item" onClick = {(e)=>handleMode(e, "dark")}>
                            <span className = "x-mode-span" style = {mode=="dark"?{border: "1px solid red", backgroundColor: "black"}:null}>dark</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div className = "mt-3">
                <Navbar collapseOnSelect expand="lg" style = {{backgroundColor: "#300875"}}>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav"> 
                        <Nav>
                            <button className = "x-nav-list-item" onClick = {(e)=>handleCourse(e,"1")} style = {state.tab=="1"?{color: "red"}:{color: "white"}}><HomeIcon /> BSEboard</button>
                            <button className = "x-nav-list-item" onClick = {(e)=>handleCourse(e,"2")} style = {state.tab=="2"?{color: "red"}:{color: "white"}}><LocalLibraryIcon /> PoolExplorer</button>
                            <button className = "x-nav-list-item" onClick = {(e)=>handleCourse(e,"3")} style = {state.tab=="3"?{color: "red"}:{color: "white"}}><StayCurrentLandscapeIcon /> PairExplorer</button>
                            <button className = "x-nav-list-item" onClick = {(e)=>handleCourse(e,"4")} style = {state.tab=="4"?{color: "red"}:{color: "white"}}><MenuBookIcon /> Multiswap</button>
                            <button className = "x-nav-list-item" onClick = {(e)=>handleCourse(e,"5")} style = {state.tab=="5"?{color: "red"}:{color: "white"}}><SettingsIcon /> Configuaration</button>
                            {/* <Nav.Link className = "x-nav-list-token">ETH</Nav.Link>
                            <Nav.Link className = "x-nav-list-token">BSC</Nav.Link>
                            <Nav.Link className = "x-nav-list-token">MATIC</Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    )
}

export default Navigation;