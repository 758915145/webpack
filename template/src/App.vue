<template>
    <div id="app">
        <div class="nav" v-show="page!=='login'" :style="'width:'+navWidth+'px'">
            <div class="fold" @click="fold">
                <span class="icon" ref="icon">&#xe627;</span>
            </div>
            <div class="logo hd" :style="bigNav?'height:80px;line-height:80px':'height:40px;line-height:40px'">
                <el-tooltip :disabled="bigNav || page==='index'" content="返回首页" placement="right-start">
                    <a href="javascript:;" @click="$router.push({path:'/'})"><span class="icon" :style="page==='index'?bigNav?'font-size:50px;width:auto':'font-size:30px;':bigNav?'display:block;float:left;font-size:30px;height:80px;line-height:80px;margin-left:40px':'font-size:30px;'">&#xe601;</span><span v-if="bigNav && page!=='index'" style="display: inline-block;float:left;margin-left:5px;">返回首页</span></a>
                </el-tooltip>
            </div>

            <el-collapse v-model="activeName" ref="collapse" accordion>

                <el-collapse-item name="1" class="pr">
                    <template slot="title">
                        <el-tooltip :disabled="bigNav" content="打逃稽查" placement="right-start">
                            <div :style="bigNav?'':'width:40px;height:40px;position:absolute;top:0;left:0'">{{bigNav?'打逃稽查':''}}</div>
                        </el-tooltip>
                    </template>
                    <ul class="pr">
                        <li class="li-escape" v-if="hasAuthority('cardata/evasion')">
                            <el-badge v-if="bigNav" :title="'未处理'+badge.escape" :value="badge.escape>0?'+'+badge.escape:''" class="badge"></el-badge>
                            <el-tooltip :disabled="bigNav" content="疑似逃费" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/escape',query:{unconfirmed:badge.escape}})"><span class="icon" style="">&#xe601;</span>疑似逃费</a>
                            </el-tooltip>
                        </li>
                        <li class="li-retention" v-if="hasAuthority('saretention')">
                            <el-tooltip :disabled="bigNav" content="服务区滞留" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/retention'})"><span class="icon">&#xe608;</span>服务区滞留</a>
                            </el-tooltip>
                        </li>
                        <li class="li-etc" v-if="hasAuthority('cardata/carDataHistory')">
                            <el-tooltip :disabled="bigNav" content="ETC过车" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/etc'})"><span class="icon">&#xe609;</span>ETC过车</a>
                            </el-tooltip>
                        </li>
                        <li class="li-track" v-if="hasAuthority('carpath')">
                            <el-tooltip :disabled="bigNav" content="车辆轨迹" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/track'})"><span class="icon">&#xe60a;</span>车辆轨迹</a>
                            </el-tooltip>
                        </li>
                        <li class="li-warming" v-if="hasAuthority('carBlackAlarm')">
                            <el-badge v-if="bigNav" :title="'未处理'+badge.warming" :value="badge.warming>0?'+'+badge.warming:''" class="badge"></el-badge>
                            <el-tooltip :disabled="bigNav" content="黑名单告警" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/warming',query:{unconfirmed:badge.warming}})"><span class="icon">&#xe604;</span>黑名单告警</a>
                            </el-tooltip>
                        </li>
                        <li class="li-blacklist" v-if="hasAuthority('carblack')">
                            <el-badge v-if="bigNav" :title="'未处理'+badge.blacklist" :value="badge.blacklist>0?'+'+badge.blacklist:''" class="badge"></el-badge>
                            <el-tooltip :disabled="bigNav" content="黑名单库" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/blacklist',query:{unconfirmed:badge.blacklist}})"><span class="icon">&#xe605;</span>黑名单库</a>
                            </el-tooltip>
                        </li>
                        <li class="li-early-warming" v-if="hasAuthority('controlAlarm')">
                            <el-tooltip :disabled="bigNav" content="布控预警" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/early-warming'})"><span class="icon">&#xe606;</span>布控预警</a>
                            </el-tooltip>
                        </li>
                        <li class="li-control" v-if="hasAuthority('control')">
                            <el-tooltip :disabled="bigNav" content="稽查布控" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/control'})"><span class="icon">&#xe612;</span>稽查布控</a>
                            </el-tooltip>
                        </li>
                    </ul>
                </el-collapse-item>
                <el-collapse-item name="2" class="pr">
                    <template slot="title">
                        <el-tooltip :disabled="bigNav" content="查询统计" placement="right-start">
                            <div :style="bigNav?'':'width:40px;height:40px;position:absolute;top:0;left:0'">{{bigNav?'查询统计':''}}</div>
                        </el-tooltip>
                    </template>
                    <ul>
                        <li class="li-anomaly" v-if="hasAuthority('carExData')">
                            <el-badge v-if="bigNav" :title="'未处理'+badge.anomaly" :value="badge.anomaly>0?'+'+badge.anomaly:''" class="badge"></el-badge>
                            <el-tooltip :disabled="bigNav" content="异常数据" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/anomaly',query:{unconfirmed:badge.anomaly}})"><span class="icon">&#xe60b;</span>异常数据</a>
                            </el-tooltip>
                        </li>
                        <li class="li-carInOut" v-if="hasAuthority('carExData')">
                            <el-tooltip :disabled="bigNav" content="进出数据" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/carInOut',query:{}})"><span class="icon">&#xe609;</span>进出数据</a>
                            </el-tooltip>
                        </li>
                        <li class="li-pass-car" v-if="hasAuthority('carData')">
                            <el-tooltip :disabled="bigNav" content="过车数据" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/pass-car'})"><span class="icon">&#xe60c;</span>过车数据</a>
                            </el-tooltip>
                        </li>
                        <li class="li-statistics" v-if="hasAuthority('flow/flowStatisticalReport')">
                            <el-tooltip :disabled="bigNav" content="流量监测" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/statistics'})"><span class="icon">&#xe60d;</span>流量监测</a>
                            </el-tooltip>
                        </li>
                        <li class="li-report" v-if="hasAuthority('report')">
                            <el-tooltip :disabled="bigNav" content="报表中心" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/report'})"><span class="icon">&#xe60e;</span>报表中心</a>
                            </el-tooltip>
                        </li>
                    </ul>
                </el-collapse-item>
                <el-collapse-item name="3" class="pr">
                    <template slot="title">
                        <el-tooltip :disabled="bigNav" content="数据研判" placement="right-start">
                            <div :style="bigNav?'':'width:40px;height:40px;position:absolute;top:0;left:0'">{{bigNav?'数据研判':''}}</div>
                        </el-tooltip>
                    </template>
                    <ul>
                        <li class="li-road-use" v-if="hasAuthority('roadUse/statistics')">
                            <el-tooltip :disabled="bigNav" content="路段使用率" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/road-use'})"><span class="icon">&#xe610;</span>路段使用率</a>
                            </el-tooltip>
                        </li>
                        <li class="li-jam" v-if="hasAuthority('roadCongestion')">
                            <el-tooltip :disabled="bigNav" content="拥堵研判" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/jam'})"><span class="icon">&#xe60f;</span>拥堵研判</a>
                            </el-tooltip>
                        </li>
                    </ul>
                </el-collapse-item>
                <el-collapse-item name="4" class="pr">
                    <template slot="title">
                        <el-tooltip :disabled="bigNav" content="管理维护" placement="right-start">
                            <div :style="bigNav?'':'width:40px;height:40px;position:absolute;top:0;left:0'">{{bigNav?'管理维护':''}}</div>
                        </el-tooltip>
                    </template>
                    <ul>
                        <li class="li-organization" v-if="hasAuthority('company')">
                            <el-tooltip :disabled="bigNav" content="组织机构" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/organization'})"><span class="icon">&#xe624;</span>组织机构</a>
                            </el-tooltip>
                        </li>
                        <li class="li-user" v-if="hasAuthority('usermanage')">
                            <el-tooltip :disabled="bigNav" content="用户管理" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/user'})"><span class="icon">&#xe61a;</span>用户管理</a>
                            </el-tooltip>
                        </li>
                        <li class="li-role" v-if="hasAuthority('roleAuthority')">
                            <el-tooltip :disabled="bigNav" content="权限管理" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/role'})"><span class="icon">&#xe621;</span>权限管理</a>
                            </el-tooltip>
                        </li>
                        <li class="li-maintain" v-if="hasAuthority('devicerepairs')">
                            <el-tooltip :disabled="bigNav" content="设备维护" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/maintain'})"><span class="icon">&#xe622;</span>设备维护</a>
                            </el-tooltip>
                        </li>
                        <li class="li-road-manage" v-if="hasAuthority('roadManage')">
                            <el-tooltip :disabled="bigNav" content="路段管理" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/road-manage'})"><span class="icon">&#xe61f;</span>路段管理</a>
                            </el-tooltip>
                        </li>
                        <li class="li-log" v-if="hasAuthority('operationLog')">
                            <el-tooltip :disabled="bigNav" content="管理日志" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/log'})"><span class="icon">&#xe61b;</span>管理日志</a>
                            </el-tooltip>
                        </li>
                        <li class="li-dict" v-if="hasAuthority('devicerepairs')">
                            <el-tooltip :disabled="bigNav" content="字典维护" placement="right-start">
                                <a href="javascript:;" @click="$router.push({path:'/dict'})"><span class="icon">&#xe61c;</span>字典维护</a>
                            </el-tooltip>
                        </li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
        </div>

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
