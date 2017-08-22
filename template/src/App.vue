<template>
    <div id="app">

        <div class="hd pr">
            {{#router}}
            <router-view></router-view>
            {{else}}
            你没安装vue-router，真的没问题吗？
            {{/router}}
        </div>
    </div>
</template>

<script>
export default {
  name: 'app'{{#router}}{{#if_eq lintConfig "airbnb"}},{{/if_eq}}{{else}},
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>
