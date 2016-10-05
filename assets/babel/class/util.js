/***
 * @user fiwashita@j-cast.com
 * @memo 便利関数クラス
 */

export default class Util {

    constructor() {
        //this.debug()
    }

    get device() {
        const userAgent = navigator.userAgent;
        var ua = "pc"
        if (userAgent.indexOf('iPhone') == -1
            && (userAgent.indexOf('Android') == -1 || userAgent.indexOf('Mobile') == -1) ) {
            ua = 'pc';
        } else {
            ua = 'sp';
        };
        return ua;
    }

    get index() {
        const path = window.location.pathname;
        if (path.match(/^(\/www\/|\/)$/i)) {
            return true;
        }
        return false;
    }

    get entry() {
        const path = window.location.pathname;
        if (path.match(/\d{6}\.html$/i)) {
            return true;
        }
        return false;
    }

    get page() {
        const search = window.location.search;
        const match = search.match(/p=(\d+)/);
        if (match) {
            return match[1];
        }
        return 1;
    }

    debug() {
        const text = `hello ${this.device}!`;
        console.log(text);
        return;
    }

}
