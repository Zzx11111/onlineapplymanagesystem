<template>
  <div class="login">
    <div class="header">网上报名工具后台管理系统</div>
    <div class="container">
      <el-form
        label-width="60px"
        :model="loginForm"
        :rules="loginRules"
        ref="loginRefs"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="loginForm.account" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('loginRefs')">登陆</el-button>
          <el-button @click="clear('loginRefs')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {adminLogin} from '../config/api'
import {dynamicRouter} from '../router/index'
export default {
  data() {
    return {
      loginForm:{
        account: "admin",
        password: "admin"
      },
      loginRules:{
        account:[
          {required:true,message:"请输入账号",trigger:'blur'}
        ],
        password:[
          {required:true,message:"请输入密码",trigger:'blur'}
        ]
      }
    };
  },
  methods: {
    clear(formName) {
      this.$refs[formName].resetFields();
    },
    login(formName){
      this.$refs[formName].validate(async (valid) => {
        if(valid){
          const data = await adminLogin(this.loginForm)
          if(data.token == null){
            this.$message({
              type:"warning",
              message:data.msg
            })
            return false
          }
          sessionStorage.setItem('token',data.token)
          this.$store.dispatch('setMenu')
          // dynamicRouter()
          // this.$router.push('/')
          this.$router.replace('/home')
          //console.log('sdsdsaaaaaaaaaaa')
        }else{
          return false;
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  width: 100%;
  background-color: #324057;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .header {
    text-align: center;
    font-size: 34px;
    color: #fff;
    margin-bottom: 20px;
  }
  .container {
    background-color: #fff;
    width: 300px;
    padding: 10px;
    border-radius: 5px;
  }
}
</style>