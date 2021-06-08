// api/stream.js
import historyProvider from './historyProvider.js'
import {getHourlyRateData,getMinutelyRateData } from '../../../contexts/PairData';
var _subs = []

export default {
 subscribeBars: function(symbolInfo, resolution, updateCb, uid, resetCache) {
	console.log("R====", resolution)

    // console.log(historyProvider.history[symbolInfo.name]);
    var newSub = {
     uid,
     resolution,
     symbolInfo,
     lastBar: historyProvider.history[symbolInfo.name].lastBar,
     listener: updateCb,
    }
  _subs.push(newSub)
 },
 unsubscribeBars: function(uid) {
  
  var subIndex = _subs.findIndex(e => e.uid === uid)
  
  if (subIndex === -1) {
   console.log("No subscription found for ",uid)
   return
  }
  var sub = _subs[subIndex];
  _subs.splice(subIndex, 1);
 }
}


// Take a single trade, and subscription record, return updated bar
function updateBar(data, sub) {

  var lastBar = sub.lastBar
  let resolution = sub.resolution

  if (resolution.includes('D')) {
    // 1 day in minutes === 1440
    resolution = 1440
   } else if (resolution.includes('W')) {
    // 1 week in minutes === 10080
    resolution = 10080
   }
  var coeff = resolution * 60;

  var rounded = Math.floor(data.time/ 1000 / coeff) * coeff
  var lastBarSec = lastBar.time / 1000;

  console.log("rounded",rounded,"lastBarSec",lastBarSec ,"resolution",resolution);
  var _lastBar;

  if (rounded > lastBarSec) {
    // create a new candle, use last close as open **PERSONAL CHOICE**
    _lastBar = {
     time: rounded * 1000,
     open: lastBar.close,
     high: lastBar.close,
     low: lastBar.close,
     close: data.price,
     volume: data.volume,
    }
    
   } else {
     console.log("round");
    // update lastBar candle!
    if (data.price < lastBar.low) {
     lastBar.low = data.price
    } else if (data.price > lastBar.high) {
     lastBar.high = data.price
    }
    lastBar.volume = data.volume
    lastBar.close = data.price
    _lastBar = lastBar
   }
   return _lastBar

}


setInterval(async () => {
  // console.log("_subs",_subs)
  
  // var sub = _subs[_subs.length - 1];

  // if(sub){
  // const pairData =await getHourlyRateData(sub.symbolInfo.name,1619877600,1619877600);
  // var lastBar = pairData[0][pairData[0].length - 1];
  // var _lastBar = updateBar(lastBar,sub);
  // sub.listener(_lastBar);
  // sub.lastBar = _lastBar
  // }

  console.log("--------setInterval");
    
}, 60000); 

