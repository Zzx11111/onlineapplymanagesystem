<template>
  <div class="user">
    <el-card class="box-card">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="id" width="180"> </el-table-column>
        <el-table-column prop="openId" label="openId" width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="name" label="报名姓名"> </el-table-column>
        <el-table-column prop="phone" label="报名电话"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row.id)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 删除对话框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteDialogVisible"
      width="30%"
    >
      <span>是否删除用户</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialog"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList,deleteUser } from "../config/api";
export default {
  data() {
    return {
      userList: [],
      deleteDialogVisible:false,
      deleteId:""
    };
  },
  created() {
    this._getUserList();
  },
  methods: {
    async _getUserList() {
      const data = await getUserList();
      this.userList = data;
    },
    async _deleteUser(id){
      const data = await deleteUser({id})
      return data
    },
    handleClick(id) {
      this.deleteId= id
      this.deleteDialogVisible = true
    },
    async deleteDialog(){
      const data = await this._deleteUser(this.deleteId)
      this.$message({
        type:'success',
        message:data.msg
      })
      this.deleteDialogVisible = false
      this._getUserList()
    }
  },
};
</script>

<style lang="less" scoped>
</style>