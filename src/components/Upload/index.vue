<template>
  <div>
    <!-- 上传组件标题 -->
    <div class="block">{{ uploadTitle }}</div>
    <!-- 上传控件 -->
    <el-upload class="avatar-uploader" action="" :http-request="handleUpload" :show-file-list="false">
      <img v-if="value" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import { uploadImage } from '@/api/upload'
export default {
  props: ['uploadTitle', 'value'],
  computed: {
    imageUrl() {
      return this.value ? process.env.VUE_APP_RES_URL + this.value : ''
    }
  },
  methods: {
    handleUpload(file) {
      const formData = new FormData()
      formData.append('file', file.file)
      uploadImage(formData).then(res => {
        this.$emit('uploaded', res.data)
      }).catch(err => {
        this.$message.error('上传失败')
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
.block {
    margin: 15px 0;
    font-weight: 100;
}

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
</style>
