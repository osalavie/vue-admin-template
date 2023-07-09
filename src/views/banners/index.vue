<template>
  <div class="banners-container">
    <el-table :data="tableData" border>
      <el-table-column label="序号" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="120" />
      <el-table-column prop="description" label="描述" style="min-width: 600px;" />
      <el-table-column label="中图预览" width="300" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="getFileFullUrl(scope.row.midImg)"
            fit="fill"
            :preview-src-list="[getFileFullUrl(scope.row.midImg)]"
          />
        </template>
      </el-table-column>
      <el-table-column label="大图预览" width="300" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="getFileFullUrl(scope.row.bigImg)"
            fit="fill"
            :preview-src-list="[getFileFullUrl(scope.row.bigImg)]"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="编辑" placement="top" :hide-after="2000">
            <el-button type="primary" size="small" icon="el-icon-edit" circle @click="handleEdit(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="editForm.title" :visible.sync="editForm.editDialogVisible">
      <el-form :model="editForm.data" label-position="left">
        <el-form-item label="标题" :label-width="editForm.formLabelWidth">
          <el-input v-model="editForm.data.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" :label-width="editForm.formLabelWidth">
          <el-input v-model="editForm.data.description" autocomplete="off" />
        </el-form-item>
        <!-- 上传 -->
        <el-row>
          <!-- 上传中图 -->
          <el-col :span="10">
            <el-form-item label="首页中图">
              <Upload v-model="editForm.data.midImg" @uploaded="(path)=>{editForm.data.midImg = path}" />
            </el-form-item>
          </el-col>
          <!-- 上传大图 -->
          <el-col :span="10">
            <el-form-item label="首页大图">
              <Upload v-model="editForm.data.bigImg" @uploaded="(path) => { editForm.data.bigImg = path }" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editForm.editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanners, updateBanner } from '@/api/banner'
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
          region: ''
        },
        formLabelWidth: '120px',
        editDialogVisible: false
      }
    }
  },
  async created() {
    await this.getBanners()
  },
  methods: {
    async getBanners() {
      const { data: banners } = await getBanners()
      console.log(banners)
      this.tableData = banners
    },
    handleEdit(row) {
      this.editForm.title = '编辑'
      this.editForm.editDialogVisible = true
      this.editForm.data = { ...row }
    },
    async handleSubmit() {
      this.tableData = this.tableData.map((item) => {
        if (item.id === this.editForm.data.id) {
          return this.editForm.data
        }
        return item
      })
      await updateBanner(this.tableData)
      this.editForm.editDialogVisible = false
    },
    getFileFullUrl(url) {
      return process.env.VUE_APP_RES_URL + url
    }
  }
}
</script>
<style lang="scss" scoped>
.banners-container {
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
