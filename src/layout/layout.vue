<template>
  <el-container>
    <el-header>
      <div class="header-name">网上报名工具后台管理系统</div>
      <div class="admin-info">
        <el-dropdown click="dropClick">
          <div class="admin-avatar">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="c">账号:{{ account }}</el-dropdown-item>
            <el-dropdown-item @click.native="editPassword">修改密码</el-dropdown-item>
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
      <el-dialog
        title="修改密码"
        :visible.sync="editAdminDialogVisible"
        width="30%"
      >
        <el-form :model="editAdminForm">
          <el-form-item label="管理员原密码">
            <el-input
            v-model="editAdminForm.oldPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="管理员新密码">
            <el-input
            v-model="editAdminForm.newPassword" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editAdminDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editAdminDialog">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./components/menu.vue";
import {editAdminPassword} from '../config/api';
export default {
  components: {
    Menu,
  },
  data() {
    return {
      account: "",
      editAdminForm:{
        oldPassword:"",
        newPassword:""
      },
      editAdminDialogVisible:false
    };
  },
  created() {
    this.account = this.$store.state.adminInfo.account;
  },
  methods: {
    siginOut() {
      console.log("退出啊");
      sessionStorage.clear();
      location.reload();
    },
    editPassword() {
      this.editAdminDialogVisible = true
    },
    async editAdminDialog() {
      const res = await editAdminPassword(this.editAdminForm.oldPassword,this.editAdminForm.newPassword)
      console.log(res);
      if(res.errorCode !== 0){
        this.$message({
          message: res.msg,
          type: "error",
        });
        return false
      }
      this.$message({
        message: res.msg,
        type: "success",
      });
      this.siginOut()
    },
  },
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
      .admin-avatar {
        display: flex;
        justify-items: center;
        align-items: center;
      }
    }
  }
}
</style>