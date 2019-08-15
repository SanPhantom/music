<template>
    <div>
        <mu-appbar style="width: 100%;" color="#f32121">
            <mu-button icon slot="left" @click="open = !open">
                <mu-icon value="menu"></mu-icon>
            </mu-button>
            <div slot="default">
                <mu-tabs color="rgba(0,0,0,0)" :value="tab_active" @change="tabsChange" center>
                    <mu-tab replace>我的</mu-tab>
                    <mu-tab replace>发现</mu-tab>
                    <mu-tab replace>云村</mu-tab>
                    <mu-tab replace>视频</mu-tab>
                </mu-tabs>
            </div>

            <mu-button icon slot="right">
                <mu-icon value="search"></mu-icon>
            </mu-button>
        </mu-appbar>
        <div class="content">
            <hello-world v-if="tab_active == 1"></hello-world>
            <page-my v-if="tab_active == 0"></page-my>
        </div>

        <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'" width="280">
            <div class="login-info">
                <div v-if="islogin"></div>
                <div v-else>
                    <mu-flex class="no-login" direction="column" justify-content="center" align-items="center">
                        <mu-flex direction="column" align-items="center">
                            <p>登录网易云音乐</p>
                            <p>手机电脑多端同步，尽享海量高品质音乐</p>
                        </mu-flex>
                        <mu-flex align-items="center">
                            <mu-button round color="transparent" text-color="#333333">立即登录</mu-button>
                        </mu-flex>
                    </mu-flex>
                </div>
            </div>

            <mu-list>
                <mu-list-item button :ripple="false">
                    <mu-list-item-action>
                        <mu-icon value="inbox"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Inbox</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="false">
                    <mu-list-item-action>
                        <mu-icon value="grade"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Stared</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="false">
                    <mu-list-item-action>
                        <mu-icon value="send"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Sent mail</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="false">
                    <mu-list-item-action>
                        <mu-icon value="drafts"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Drafts</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="false">
                    <mu-list-item-action>
                        <mu-icon value="drafts"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Drafts</mu-list-item-title>
                </mu-list-item>
            </mu-list>

            <mu-divider></mu-divider>

            <mu-list>
                <mu-list-item button :ripple="false">
                    <mu-list-item-action>
                        <mu-icon value="inbox"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Inbox</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="false">
                    <mu-list-item-action>
                        <mu-icon value="grade"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Stared</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="false">
                    <mu-list-item-action>
                        <mu-icon value="send"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Sent mail</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="false">
                    <mu-list-item-action>
                        <mu-icon value="drafts"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Drafts</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="false">
                    <mu-list-item-action>
                        <mu-icon value="grade"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Stared</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="false">
                    <mu-list-item-action>
                        <mu-icon value="send"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Sent mail</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :ripple="false">
                    <mu-list-item-action>
                        <mu-icon value="drafts"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Drafts</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-drawer>
    </div>
</template>

<script>
    import HelloWorld from '../components/HelloWorld'
    import PageMy from '../components/PageMy.vue'

    export default {
        name: 'Home',
        components: {
            HelloWorld,
            PageMy
        },
        data() {
            return {
                open: false,
                docked: false,
                position: 'left',
                islogin: false,
                tab_active: 1
            }
        },
        methods: {
            tabsChange(value) {
                this.tab_active = value;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .mu-appbar {
        position: fixed;
        left: 0;
        top: 0;

        .mu-tab {
            min-width: 0px;

            &-active {
                font-size: 16px;
            }
        }
    }

    .content {
        padding-top: 56px;
    }

    .mu-tab {
        min-width: 0;
    }

    .mu-tab-active {
        font-size: 16px;
    }

    .mu-tab-link-highlight {
        display: none;
    }

    .login-info {
        width: 100%;
        height: 200px;
        background-color: #eaeaea;

        .no-login {
            width: 100%;
            height: 200px;

            p {
                line-height: 18px;
                color: #333333;
            }

            .mu-button {
                width: 120px;
                font-size: 12px;
                height: 28px;
                line-height: 28px;
                letter-spacing: 1px;
                margin-top: 18px;
            }
        }
    }

    .mu-list {
        .mu-item {
            .mu-item-action {
                min-width: 24px;
                margin-right: 15px;
            }
        }
    }

    .mu-divider {
        width: auto;
        margin: 0 16px;
    }
</style>
