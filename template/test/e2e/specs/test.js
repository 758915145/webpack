// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function {{#if_eq lintConfig "airbnb"}}test{{/if_eq}}(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Welcome to Your Vue.js App')
      .assert.elementCount('img', 1)
      .end(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}


// '示例': function (browser) {
//     const devServer = browser.globals.devServerURL;
//
//     //登录页
//     var login = browser.url(devServer + '/#/login')
//         .waitForElementVisible('.login', 5000)//5秒内看是否有.login这个元素
//         .assert.elementPresent('.title')//看是否有.title这个元素
//         // .assert.containsText('.version', 'V 1.1.2')//看.version这个元素的内容是不是V 1.1.2
//         .assert.elementCount('.version', 1)//看.version这个类一共是不是有1个
//         .setValue('#loginName', 'lxy')//设置用户名为lxy
//         .setValue('#loginPassword', 'lxy')//设置密码为lxy
//         .click("#submit")//点击登录
//         // .pause(3000)//暂停3秒钟,设置了assert的超时时间之后就不需要暂停了
//         .assert.urlEquals(devServer + '/#/');//看是否跳转到了首页
//
//     //首页
//     var index = login.assert.containsText('.user fr hd', 'V 1.1.2')
//
//     //结束
//         .end();
// }
