<template>
  <el-container>
    <el-header>
      <div class="header-name">网上报名工具后台管理系统</div>
      <div class="admin-info">
        <el-dropdown click="dropClick">
          <div class="admin-avatar">
            <el-avatar icon="el-icon-user-solid" @click="aa"></el-avatar>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="c">账号:{{account}}</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="siginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <Menu></Menu>
      <el-main>
        
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./components/menu.vue";
export default {
  components: {
    Menu,
  },
  data() {
    return {
      account:""
    }
  },
  created(){
    this.account = this.$store.state.adminInfo.account
  },
  methods:{
    siginOut(){
      console.log('退出啊');
      sessionStorage.clear()
      location.reload()
    },
    aa(){
      console.log('dsdsssssssssssssss');
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #eff2f7;
    display: flex;
    .header-name {
      line-height: 60px;
      flex: 1;
    }
    .admin-info {
      line-height: 60px;
      .admin-avatar{
        display: flex;
        justify-items: center;
        align-items: center;
      }
    }
  }
}
</style>