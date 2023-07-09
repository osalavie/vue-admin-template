<template>
  <div class="projects-container">
    <el-table :data="tableData" border>
      <el-table-column label="序号" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称" width="200" />
      <el-table-column prop="description" label="描述" style="min-width: 600px;" />
      <el-table-column label="预览图" width="300" align="center">
        <template slot-scope="scope">
          <el-image :src="getFileFullUrl(scope.row.thumb)" fit="fill" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Github" placement="top" :hide-after="2000">
            <el-button type="info" size="small" icon="el-icon-coffee" circle @click="handleEdit(scope.row)" />
          </el-tooltip>
          <el-tooltip effect="dark" content="编辑" placement="top" :hide-after="2000">
            <el-button type="primary" size="small" icon="el-icon-edit" circle @click="handleEdit(scope.row)" />
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top" :hide-after="2000">
            <el-button type="danger" size="small" icon="el-icon-delete" circle @click="handleDelete(scope.row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="editForm.title" :visible.sync="editForm.editDialogVisible" :fullscreen="true">
      <el-form :model="editForm.data" label-position="top">
        <el-form-item label="项目名称" :label-width="editForm.formLabelWidth">
          <el-input v-model="editForm.data.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="项目描述 (每一项描述以英文逗号分隔)" :label-width="editForm.formLabelWidth">
          <el-input v-model="editForm.data.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="项目地址" :label-width="editForm.formLabelWidth">
          <el-input v-model="editForm.data.url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Github" :label-width="editForm.formLabelWidth">
          <el-input v-model="editForm.data.github" autocomplete="off" />
        </el-form-item>

        <el-form-item label="项目预览">
          <Upload v-model="editForm.data.thumb" @uploaded="(path) => { editForm.data.thumb = path }" />
        </el-form-item>
        <el-form-item label="排序等级" :label-width="editForm.formLabelWidth">
          <el-select v-model="editForm.data.order" autocomplete="off">
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
import { getProject, setProject, delProject } from '@/api/project'
import Upload from '@/components/Upload'
export default {
  components: {
    Upload
  },
  data() {
    return {
      tableData: [],
      editForm: {
        title: '',
        data: {
          name: '',
          description: '',
          url: '',
          github: '',
          thumb: '',
          order: 1
        },
        formLabelWidth: '120px',
        editDialogVisible: false
      }
    }
  },
  async created() {
    await this.fetchProject()
  },
  methods: {
    async fetchProject() {
      const { data } = await getProject()
      data.forEach((item) => {
        item.description = item.description.toString()
      })
      this.tableData = data
    },
    handleEdit(row) {
      this.editForm.title = '编辑'
      this.editForm.editDialogVisible = true
      this.editForm.data = { ...row }
    },
    async handleSubmit() {
      const data = { ...this.editForm.data }
      data.description = data.description.split(',')
      console.log(data)
      await setProject(data.id, data)
      this.editForm.editDialogVisible = false
      this.fetchProject()
    },
    getFileFullUrl(url) {
      return process.env.VUE_APP_RES_URL + url
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await delProject(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchProject()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.projects-container {
  padding: 20px;

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .banner-imgs {
    display: flex;
    gap: 30px;
  }
}
</style>
