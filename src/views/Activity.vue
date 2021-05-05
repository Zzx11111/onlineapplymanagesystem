<template>
  <div>
    <el-card class="box-card">
      <el-table
        :data="activityList"
        style="width: 100%"
        border
        @expand-change="_getComment"
      >
        <el-table-column type="expand">
            <template slot-scope="scope">
            <el-table
              :data="scope.row.ruleItemData"
              style="width: 100%"
              border
              v-if="comments"
            >
              <el-table-column type="index" width="50" label="序号">
              </el-table-column>
              <el-table-column prop="promoter.username" label="用户">
              </el-table-column>
              <el-table-column prop="commentContent" label="评论内容">
              </el-table-column>
              <el-table-column prop="createTime" label="评论时间">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="handleCommentClick(scope.row.id)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="activityName" label="活动名称">
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期"> </el-table-column>
        <el-table-column prop="activityAddress" label="活动地址">
        </el-table-column>
        <el-table-column prop="activityTime" label="活动开始时间">
        </el-table-column>
        <el-table-column prop="activityContent" label="活动内容">
        </el-table-column>
        <el-table-column prop="phone" label="活动创建人联系电话">
        </el-table-column>
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
    <el-dialog title="删除" :visible.sync="deleteDialogVisible" width="30%">
      <span>是否删除此活动</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialog">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除"
      :visible.sync="deleteCommentDialogVisible"
      width="30%"
    >
      <span>是否删除此评论</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteCommentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteCommentDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  deleteActivity,
  getActivityList,
  getComment,
  deleteComment,
} from "../config/api";
export default {
  data() {
    return {
      activityList: [],
      deleteId: "",
      deleteDialogVisible: false,
      comments: [],
      deleteCommentDialogVisible: false,
      deleteCommentId: "",
    };
  },
  created() {
    console.log('ddd');
    this._getActivityList();
  },
  methods: {
    async _getActivityList() {
      const data = await getActivityList();
      data.map(item => {
        item.ruleItemData = [];
      })
      console.log(data);
      this.activityList = data;
    },
    handleClick(id) {
      this.deleteDialogVisible = true;
      this.deleteId = id;
    },
    async deleteDialog() {
      const data = await deleteActivity(this.deleteId)
      if (data.errorCode === 0) {
        this.$message.success(data.msg);
      }
      this.deleteDialogVisible = false
      this._getActivityList()
    },
    async _getComment(row, expandedRows) {
      if (expandedRows.length > 0) {
      await getComment(row.id).then((res) => {
        this.activityList.forEach((temp, index) => {
          if (temp.id === row.id) {
            this.activityList[index].ruleItemData = res;
          }
        });
          console.log(this.activityList)
      })

      }
      // if (expandedRows.length > 0) {
      //   rule
      //     .itemSelectByRuleID({
      //       examruleid: row.id
      //     })
      //     .then(res => {
      //       // 遍历当前页面表
      //       this.tableData.forEach((temp, index) => {
      //         // 找到当前点击的行，把动态获取到的数据赋值进去
      //         if (temp.id === row.id) {
      //           this.tableData[index].ruleItemData = res.content;
      //         }
      //       });
      //     });
      // }
    },
    // async _getComment({ id }) {
    //   await getComment(id).then((res) => {
    //      this.comments = res;
    //      this.$forceUpdate()
    //   //   this.$nextTick(() => {
    //   // })
    //   //  this.$forceUpdate()
    //   })
    //   // this.comments = data;
    //   // this.$nextTick(() => {
    //   //   this.comments = dataKEY;
    //   //   console.log('dddddddd');
    //   // })
    //   //  this.$forceUpdate()
    //   // this.$nextTick(async function() {
    //   //    await getComment(id).then((res) => {
    //   //       this.comments = res;
    //   //        console.log(this.comments);
            
    //   //    })
    //   //  this.$forceUpdate()

    //   // })
    // },
    handleCommentClick(id) {
      this.deleteCommentDialogVisible = true;
      this.deleteCommentId = id;
      // this.$forceUpdate();
    },
    async deleteCommentDialog() {
      const data = await deleteComment(this.deleteCommentId);
      if (data.errorCode === 0) {
        this.$message(data.msg);
      }
      
      this.deleteCommentDialogVisible = false;
    },
  },
  // watch:{
  //   comments(newName, oldName){
  //     console.log('dddddddddd');
  //     this.$forceUpdate()
  //   }
  // }
};
</script>

<style lang="less" scoped>
</style>