<template>
  <div class="admin">
    <!-- 主卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          size="mini"
          @click="handleAdd()"
          type="success"
          >添加管理员</el-button
        >
      </div>
      <el-table :data="adminList" border style="width: 100%">
        <el-table-column
          fixed
          label="id"
          width="150"
          prop="id"
        ></el-table-column>
        <el-table-column prop="account" label="账号"> </el-table-column>
        <el-table-column prop="roleName" label="角色"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              type="primary"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加管理员 -->
    <el-dialog
      title="添加管理员"
      :visible.sync="addAdminDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="addAdminForm" label-width="100px">
        <el-form-item label="账号">
          <el-input v-model="addAdminForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addAdminForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员角色">
          <el-select v-model="addAdminForm.role" placeholder="请选择管理员角色">
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in roleList" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改管理员对话框 -->
    <el-dialog
      title="修改管理员"
      :visible.sync="editAdminDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="editAdminForm">
        <el-form-item label="管理员角色">
          <el-select v-model="editAdminForm.role" placeholder="请选择管理员角色">
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in roleList" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAdminDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAdminDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAdminList,getRoleList } from "@/config/api";
export default {
  data() {
    return {
      adminList: [],
      addAdminForm:{
        account:'',
        password:'',
        role:''
      },
      addAdminDialogVisible:false,
      editAdminDialogVisible:false,
      editAdminForm:{
        role:''
      },
      roleList:[]
    };
  },
  created() {
    this.getAdminList();
  },
  methods: {
    //获取管理员列表
    async getAdminList() {
      const data = await getAdminList();
      console.log(data);
      this.adminList = data;
    },
    //获取角色列表
    async getRoleList(){
      const data = await getRoleList()
      
      this.roleList = data
      console.log(this.roleList);
    },
    handleEdit(data){
      this.editAddminForm = data
      this.editAdminDialogVisible = true
    },
    handleDelete(id){

    },
    handleAdd(){
      this.getRoleList()
      this.addAdminDialogVisible = true
      
    }
  },
};
</script>

<style lang="less" scoped>
</style>