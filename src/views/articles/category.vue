<template>
  <div class="app-container">
    <el-input v-model="newCategory.name" class="input-with-select blogAddInput" placeholder="请输入要添加的分类，左边选择该分类的等级">
      <el-select slot="prepend" v-model="newCategory.order">
        <el-option label="1" :value="1" />
        <el-option label="2" :value="2" />
        <el-option label="3" :value="3" />
        <el-option label="4" :value="4" />
        <el-option label="5" :value="5" />
      </el-select>
    </el-input>
    <el-button
      slot="append"
      icon="el-icon-plus"
      type="primary"
      style="margin-left: 10px"
      @click="handleCreate"
    />
    <el-table :data="categories" border max-height="550">
      <el-table-column type="index" label="序号" width="120" align="center" />
      <el-table-column prop="name" label="分类名称" min-width="300" />
      <el-table-column prop="articleCount" label="文章数量" min-width="100" align="center" />
      <el-table-column prop="order" label="排序优先级" width="100" align="center" />
      <el-table-column fixed="right" label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="编辑" placement="top" :hide-after="2000">
            <el-button type="primary" size="small" icon="el-icon-edit" circle @click="handleEdit(scope.row)" />
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top" :hide-after="2000">
            <el-button type="danger" size="small" icon="el-icon-delete" circle @click="handleDelete(scope.row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="editForm.title" :visible.sync="editForm.editDialogVisible">
      <el-form :model="editForm.data" label-position="left">
        <el-form-item label="分类名称" :label-width="editForm.formLabelWidth">
          <el-input v-model="editForm.data.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序优先级" :label-width="editForm.formLabelWidth">
          <el-select v-model="editForm.data.order">
            <el-option label="1" :value="1" />
            <el-option label="2" :value="2" />
            <el-option label="3" :value="3" />
            <el-option label="4" :value="4" />
            <el-option label="5" :value="5" />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editForm.editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCategories, deleteCategory, updateCategory, addCategory } from '@/api/blog'
export default {
  name: 'Category',
  data() {
    return {
      newCategory: {
        name: '',
        order: 0
      },
      categories: [],
      editForm: {
        title: '',
        data: {
          name: '',
          articleCount: 0,
          order: 0
        },
        formLabelWidth: '120px',
        editDialogVisible: false
      }
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    fetchCategories() {
      getCategories(this.queryInfo).then((res) => {
        const { data } = res
        if (data) {
          console.log(data)
          this.categories = data
        }
      })
    },
    handleCreate() {
      console.log(this.newCategory)
      addCategory(this.newCategory).then(() => {
        this.$message.success('添加成功')
        this.fetchCategories()
      }).catch(() => {
        this.$message.error('添加失败')
      })
    },
    handleEdit(row) {
      this.editForm.title = '编辑分类'
      this.editForm.data = { ...row }
      this.editForm.editDialogVisible = true
    },
    handleSubmit() {
      updateCategory(this.editForm.data).then(() => {
        this.$message.success('更新成功')
        this.editForm.editDialogVisible = false
        this.fetchCategories()
      }).catch(() => {
        this.$message.error('更新失败')
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategory(id).then(() => {
          this.$message.success('删除成功')
          this.fetchCategories()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.blogAddInput {
  width: 400px;
  margin-bottom: 20px;
}
</style>

