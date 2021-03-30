<template>
  <div class="admin">
    <!-- 主卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="mini" @click="handleAdd()" type="success"
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
            <el-button size="mini" @click="handleEdit(scope.row)" type="primary"
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
    >
      <el-form :model="addAdminForm" label-width="100px">
        <el-form-item label="账号">
          <el-input
            v-model="addAdminForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="addAdminForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员角色">
          <el-select
            v-model="addAdminForm.roleID"
            placeholder="请选择管理员角色"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in roleList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAdminDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdminDialog"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改管理员对话框 -->
    <el-dialog
      title="修改管理员"
      :visible.sync="editAdminDialogVisible"
      width="30%"
    >
      <el-form :model="editAdminForm">
        <el-form-item label="管理员角色">
          <el-select
            v-model="editAdminForm.roleID"
            placeholder="请选择管理员角色"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in roleList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAdminDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAdminDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除管理员对话框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteDialogVisible"
      width="30%"
    >
      <span>确定删除这个管理员吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteAdminDialog"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAdminList, getRoleList, editAdmin,deleteAdmin,addAdmin } from "@/config/api";
export default {
  data() {
    return {
      adminList: [],
      addAdminForm: {
        account: "",
        password: "",
        roleID:"",
      },
      addAdminDialogVisible: false,
      editAdminDialogVisible: false,
      deleteDialogVisible:false,
      editAdminForm: {
        roleID: "",
      },
      roleList: [],
      //删除的id
      deleteAdminId:""
    };
  },
  created() {
    this._getAdminList();
  },
  methods: {
    //获取管理员列表
    async _getAdminList() {
      const data = await getAdminList();
      console.log(data);
      this.adminList = data;
    },
    //获取角色列表
    async _getRoleList() {
      const data = await getRoleList();
      this.roleList = data;
    },
    //调用更新管理员api
    async _editAdmin(addAdminForm) {
      const data = await editAdmin(addAdminForm);
      return data;
    },
    async _deleteAdmin(id){
      const data = await deleteAdmin(id)
      return data
    },
    async  _addAdmin(data) {
      const res = await addAdmin(data)
      return res
    },
    //打开修改管理员的对话框
    handleEdit(data) {
      console.log(data);
      this._getRoleList();
      this.editAdminForm = data;
      this.editAdminDialogVisible = true;
    },
    handleDelete(id) {
      this.deleteDialogVisible = true
      this.deleteAdminId = id
    },
    handleAdd() {
      this._getRoleList();
      this.addAdminDialogVisible = true;
    },
    
    //更新管理员角色
    async editAdminDialog() {
      const data = await this._editAdmin(this.editAdminForm);
      if (data.errorCode === 0) {
        this.$message({
          message: data.msg,
          type: "success",
        });
        this._getAdminList();
      }
      this.editAdminDialogVisible = false;
    },
    //删除管理员
    async deleteAdminDialog(){
      const data = await this._deleteAdmin({id:this.deleteAdminId})
      if (data.errorCode === 0) {
          this.$message({
            message: data.msg,
            type: "success",
          });
          this._getAdminList();
        }
      this.deleteDialogVisible = false
    },
    async addAdminDialog(){
      const data = await this._addAdmin(this.addAdminForm)
      console.log(data);
      if(data.errorCode !== 0){
        this.$message({
          type:"warning",
          message:data.msg
        })
        this.addAdminDialogVisible = false
        return false
      }
      this.$message({
        type:"success",
        message:data.msg
      })
      this._getAdminList()
      this.addAdminDialogVisible = false
    }
  },
};
</script>

<style lang="less" scoped>
</style>