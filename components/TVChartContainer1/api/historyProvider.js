
import {getIntervalTokenData} from '../../../contexts/TokenData';
import { timeframeOptions } from '../../../constants'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
const history = {}

export default {
    history: history,
    resolveSymbol:async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback)=> {
		var symbol_stub = {
            name: symbolName,
            description: symbolName,
            type: 'crypto',
            session: '24x7',
            timezone: 'Etc/UTC',
            ticker: "",
            exchange: "",
            minmov: 1,
            pricescale: 1000,
            timescale: 1000,
            has_intraday: true,
            intraday_multipliers: ["30"],
            data_status: 'streaming'
        }

        setTimeout(function() {
            onSymbolResolvedCallback(symbol_stub);
        }, 100)
    },
    getBars: async function(symbolInfo, resolution, from, to, first, limit) {
    	try {
    		
			console.log("token symbolInfo.name ",symbolInfo.name,resolution);

      const utcEndTime = dayjs.utc();
      let utcStartTime = utcEndTime.subtract(3, 'Day')
      console.log(utcStartTime.unix())
      const pairData =await getIntervalTokenData(symbolInfo.name,utcStartTime.unix(),1800,1619877600);
      console.log("pairData",pairData);
      
      //last data
      var lastBar = pairData[pairData.length - 1];
      history[symbolInfo.name] = {lastBar: lastBar}
			console.log(lastBar)
      return pairData;
    	} catch(e) {console.log(e)}
	        
    }
}


