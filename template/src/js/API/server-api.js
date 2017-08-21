import axios from 'axios'

//动态加载API文件
let personal = [];
(r => {
    r.keys().forEach(key=>{
        personal.push(r(key).default);
    });
})(require.context('./personal/', true, /\.js$/));
var apiOption = Object.assign(...personal);
let API = {};
//全屏的等待,多个网络请求并发时,要等所有的请求都完成后,才隐藏全屏等待
//所以全屏等待使用的是一个数字,当数字为0时,隐藏全屏等待
// Add a request interceptor
window.loadding_count = 0;
axios.interceptors.request.use(config => {

    //等待提示
    if (config.loadding) {
    //等待数量+1
    config.loadding.loadding_count = config.loadding.loadding_count ? config.loadding.loadding_count + 1 : 1;

    //elementUi等待提示
    config.loadding.loadding = config.loadding.loadding || $vue.$loading(config.loadding)
}

//全屏等待提示
if (config.apiOption.loadding) {
    if (++window.loadding_count > 0) {
        window.loadding = $vue.$loading({fullscreen: true});
    }
}

//sessionid
if (localStorage.sessionid) {
    config.headers = {'sessionid': localStorage.sessionid};
}

return config;
}, error => {
    return Promise.reject(error);
});
function errNotify(response) {
    const h = $vue.$createElement;
    $vue.$notify({
        title: response.message,
        message: h("div", {style: 'font-size:12px'}, [
            h("div", null, [
                h("b", {style: 'color:#333'}, "url："),
                h("span", null, response.config.url),
            ]),
            h("div", null, [
                h("b", {style: 'color:#333'}, "request："),
                h("span", null, response.config.data),
            ]),
            h("div", null, [
                h("b", {style: 'color:#333'}, "response："),
                h("span", null, JSON.stringify(response.data)),
            ]),
        ]),
        duration: 0
    });
}
let errorCode = {

    //未知错误
    "1": function (response) {
        if (response.data.message) {
            $vue.$message.warning(response.data.message);
        } else {
            $vue.$message.warning('未知错误');
        }
    },

    //登陆超时
    "2": function (response) {
        localStorage.removeItem('sessionid');
        $vue.$router.push({
            path: '/login'
        });
        $vue.$message.warning(response.data.message);
    },

    //程序处理异常
    "4": function (response) {
        // errNotify(response);
    },
};
// Add a response interceptor
axios.interceptors.response.use(response => {

    //等待提示
    if (response.config.loadding) {
    //已经执行完了
    if (--response.config.loadding.loadding_count <= 0) {
        response.config.loadding.loadding_count = 0;
        response.config.loadding.loadding.close();//关闭elementUI等待提示
        response.config.loadding.loadding = undefined;
    }
}

//全屏等待提示
if (response.config.apiOption.loadding) {
    if (--window.loadding_count <= 0) {
        window.loadding.close();
    }
}

//数据校验
if (errorCode[response.data.code]) {//错误代码校验
    errorCode[response.data.code](response);
    return Promise.reject(response);
} else if (!response.data.data || _.isEmpty(response.data.data)) {//空数据校验
    return Promise.reject({type: "empty", response: response});
} else if (response.data.data.rowsSize && _.isEmpty(response.data.data.rows)) {//空的分页数据校验
    return Promise.reject({type: "empty", response: response});
} else {
    return response;
}
}, error => {
    //错误的话,可能就不要等待提示了
    if (--window.loadding_count <= 0) {
        window.loadding_count = 0;
        window.loadding && window.loadding.close();
    }
    $vue.$message.warning("网络错误");
    // errNotify(error)
    return Promise.reject(error);
});

for (let key in apiOption) {
    {
        API[key] = (params, dosome = {}) => {
        dosome.apiOption = apiOption[key];
        let result;
        let promise = new Promise((resolve, reject) => {
                axios.post(
                //url
                apiOption[key].host ? apiOption[key].host + apiOption[key].url : host + apiOption[key].url,

                //数据
                params,

                //其他行为
                dosome
            ).then(res => {
                if (promise.successCallback)
        try {
            promise.successCallback(res);
        } catch (e) {
            console.warn(key + "=>success 回调函数中发生错误", e);
        }

        if (promise.finallyCallback)
            try {
                promise.finallyCallback(res);
            } catch (e) {
                console.warn(key + "=>finally 回调函数中发生错误", e);
            }
        result = res.data.data;
        resolve(res);
    }).catch(err => {
            if (err && err.type === "empty") {
            if (promise.emptyCallback)
                try {
                    promise.emptyCallback(err.response);
                } catch (e) {
                    console.warn(key + "=>empty 回调函数中发生错误", e);
                }
            resolve(err.response);
        } else {
            if (promise.errorCallback)
                try {
                    promise.errorCallback(err.response);
                } catch (e) {
                    console.warn(key + "=>error 回调函数中发生错误", e);
                }
            reject(err.response);
        }
        promise.finallyCallback && promise.finallyCallback(res);
    })
    });

        //成功的回调
        promise.success = fn => {
            promise.successCallback = fn;
            return promise;
        };

        //数据为空的回调
        promise.empty = fn => {
            promise.emptyCallback = fn;
            return promise;
        };

        //失败的回调
        promise.error = fn => {
            promise.errorCallback = fn;
            return promise;
        };

        //不管怎样，都执行
        promise.finally = fn => {
            promise.finallyCallback = fn;
            return promise;
        };

        //直接返回结果
        promise.result = async handle => {
            await promise;
            if (handle) {
                try {
                    return handle(result)
                } catch (e) {
                    console.warn(key + "=>result 回调函数中发生错误", e);
                    return undefined;
                }
            } else {
                return result;
            }
        };
        return promise;
    }
    }
}
window.API = API; //给全局使用
