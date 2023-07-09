<template>
  <div class="projects-container">
    <el-form :model="editForm" label-position="top">
      <el-form-item label="项目名称">
        <el-input v-model="editForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="项目描述 (每一项描述以英文逗号分隔)">
        <el-input v-model="editForm.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="项目地址">
        <el-input v-model="editForm.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Github">
        <el-input v-model="editForm.github" autocomplete="off" />
      </el-form-item>

      <el-form-item label="项目预览">
        <Upload v-model="editForm.thumb" @uploaded="(path) => { editForm.thumb = path }" />
      </el-form-item>
      <el-form-item label="排序等级">
        <el-select v-model="editForm.order" autocomplete="off">
          <el-option label="1" :value="1" />
          <el-option label="2" :value="2" />
          <el-option label="3" :value="3" />
          <el-option label="4" :value="4" />
          <el-option label="5" :value="5" />
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>
<script>
import { addProject } from '@/api/project'
import Upload from '@/components/Upload'
export default {
  components: {
    Upload
  },
  data() {
    return {
      editForm: this.getDefaultForm()
    }
  },
  methods: {
    getDefaultForm() {
      return {
        name: '',
        description: '',
        url: '',
        github: '',
        thumb: '',
        order: 1
      }
    },
    async handleSubmit() {
      const data = { ...this.editForm }
      data.description = data.description.split(',')
      console.log(data)
      await addProject(data)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.editForm = this.getDefaultForm()
    }
  }
}
</script>
<style lang="scss" scoped>
.projects-container {
    padding: 20px;
}
</style>
