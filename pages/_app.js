import '../styles/globals.css';
import ParticleComponent from "../components/particles/particleComponent";
import Navigation from '../components/layout/nav';
import '../styles/bootstrap.min.css';
import '../styles/darkMode.css';
import { useEffect,useState } from 'react';
import LocalStorageContextProvider, { Updater as LocalStorageContextUpdater } from '../contexts/LocalStorage'
import TokenDataContextProvider, { Updater as TokenDataContextUpdater } from '../contexts/TokenData'
import GlobalDataContextProvider from '../contexts/GlobalData'
import PairDataContextProvider, { Updater as PairDataContextUpdater } from '../contexts/PairData'
import ApplicationContextProvider from '../contexts/Application'
import UserContextProvider from '../contexts/User'
import ThemeProvider, { GlobalStyle } from '../Theme'
import { ApolloProvider } from 'react-apollo'
import { client } from '../apollo/client'

function ContextProviders({ children }) {
    return (
      <LocalStorageContextProvider>
        <ApplicationContextProvider>
          <TokenDataContextProvider>
            <GlobalDataContextProvider>
              <PairDataContextProvider>
                <UserContextProvider>{children}</UserContextProvider>
              </PairDataContextProvider>
            </GlobalDataContextProvider>
          </TokenDataContextProvider>
        </ApplicationContextProvider>
      </LocalStorageContextProvider>
    )
  }
  
  function Updaters() {
    return (
      <>
        <LocalStorageContextUpdater />
        <PairDataContextUpdater />
        <TokenDataContextUpdater />
      </>
    )
  }

function MyApp({ Component, pageProps }) {

    useEffect(()=>{
        const height = document.querySelector('#total-container').offsetHeight;
        if(height>=window.innerHeight){
            document.getElementById("backSection").style.height = `${height+100}px`;
            document.getElementById("tsparticles").style.height = `${height+100}px`;
            console.log(height);
        }
        else{
            document.getElementById("backSection").style.height = `${window.innerHeight}px`;
            document.getElementById("tsparticles").style.height = `${window.innerHeight}px`;
        }
    })
    return (
        <div>
          <ApolloProvider client={client}>
            <ContextProviders>
                <Updaters />
                <ThemeProvider>
                  <ParticleComponent />
                  <div id = "total-container"
                  style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%"
                  }}
                  >
                  <Navigation/>
                  <Component {...pageProps }/>
                  </div>
                </ThemeProvider>
            </ContextProviders>
          </ApolloProvider>
        </div>
    )
}

export default MyApp