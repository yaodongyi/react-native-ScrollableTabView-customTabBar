/*
 * @Date: 2020-01-02 17:04:53
 * @LastEditTime : 2020-01-06 11:44:57
 * @Description: px to dp
 */
declare global {
  namespace NodeJS {
    interface Global {
      px: (uiElementPx: number) => number;
    }
  }
}
import { Dimensions } from 'react-native';
// 58 app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width;
// UI 默认给图是 640
const uiWidthPx = 375;

function px(uiElementPx: number) {
  return (uiElementPx * deviceWidthDp) / uiWidthPx;
}

global.size = px;
// export default px;
