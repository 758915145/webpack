<template>
    <div id="app">

        <div class="hd pr">
            {{#router}}
            <router-view></router-view>
            {{else}}
            你没安装vue-router，真的没问题吗文？
            {{/router}}
        </div>
    </div>
</template>

<script>
export default {
  name: 'app'{{#router}}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{else}},
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style lang="scss">
    @import "css/variables.scss";
    @import "css/public.scss";
    @import 'css/Element-UI/element-ui-extend.scss';
    #app{
        height:100vh;
        -moz-user-select:none;//防止火狐双击选中
        /*.optiscroll-content{*/
        /*z-index:auto;*/
        /*}*/
    }
    //上传按钮中的东西
      ::-webkit-file-upload-button{
          cursor:pointer;
      }
    ::-webkit-scrollbar{
        width: 5px;
        height:5px;
    }
    /*定义滑块，内阴影及圆角*/
    ::-webkit-scrollbar-thumb{
        background: rgba(0,0,0,0.3);
        border-radius: 2px;
        box-shadow: 0 0 1px #FFF;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color:#BBB;
    }
    .icon{
    // background-image:url('./assets/sprites.png');
        font-family:iconfont,微软雅黑 !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    #Binfo{position:absolute;top:0;right:0;width:200px;overflow:hidden;background-color:rgba(0,0,0,.1);z-index:99999;padding:20px;}

    // 重置样式
       body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select{margin:0;padding:0}
    body,button{font:16px/24px arial,微软雅黑,sans-serif,宋体,tahoma;margin:0}
    h1,h2,h3,h4,h5,h6{font-weight:400;font-size:16px;}
    a{text-decoration:none;outline:none;blr:expression(this.onFocus=this.blur());cursor:pointer;}
    em{font-style:normal}
    ol,ul,li{list-style-type:none}
    img{border:0;vertical-align:middle}
    table{border-collapse:collapse;border-spacing:0}
    input{outline:none}
    p{word-wrap:break-word}
    .cl{clear:both}
    .fl{float:left; display:inline}
    .fr{float:right; display:inline}
    .tl{text-align:left}
    .tc{text-align:center}
    .tr{text-align:right}
    .md{margin-left:auto; margin-right:auto}
    .vm{vertical-align:middle}
    .pr{position:relative}
    .pa{position:absolute}
    .fixed{position:fixed;}
    .show{display:block}
    .hide{display:none}
    .hd{overflow:hidden}
</style>
