<template>
  <el-aside width="200px">
     <el-menu
      :default-active="activePath"
      background-color="#324057"
      text-color="#ffffffa6"
      active-text-color="#fff"
      router
      >
      <el-menu-item :index="item.page_url" v-for="(item,index) in menuList" :key="index">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    data() {
      return {
        menuList:[],
        activePath:""
      }
    },
    created(){
      this.activePath = this.$route.path
    },
    mounted(){
      const menuList = this.$store.state.adminInfo.menuList
      this.menuList = menuList
    },
    computed:{
      menu(){
        return this.$store.state.adminInfo.menuList
      }
    },
    watch:{
      menu:function(newValue,oldValue){
        console.log('watch')
        
        console.log(oldValue)
        this.menuList = newValue
      }
    }
  }
</script>

<style lang="less" scoped>
.el-aside{
  min-height: 100%;
  color: #fff;
  background-color: rgb(50, 64, 87);
  .el-menu{
    height: 100%;
  }
}
</style>