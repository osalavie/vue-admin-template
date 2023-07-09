<template>
  <div class="article-container">
    <el-table :data="articles.rows" border max-height="550">
      <el-table-column type="index" label="序号" width="120" align="center" />
      <el-table-column prop="title" label="标题" width="300" />
      <el-table-column label="分类" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.category.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" min-width="300" />
      <el-table-column prop="scanNumber" label="浏览量" min-width="100" align="center" />
      <el-table-column prop="commentNumber" label="评论量" min-width="100" align="center" />
      <el-table-column label="创建日期" min-width="240" align="center">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.createDate) }}</span>
        </template>
      </el-table-column>
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
    <el-pagination
      style="margin-top: 10px;"
      background
      :current-page.sync="queryInfo.page"
      :page-size="queryInfo.limit"
      :page-sizes="[5,10, 20, 30, 40]"
      layout="prev, pager, next, total, ->, sizes, jumper"
      :total="articles.total"
      :pager-count="5"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { formatDate } from '@/utils/tools'
import { getBlogs, deleteBlog } from '@/api/blog'
export default {
  name: 'Articles',
  data() {
    return {
      queryInfo: {
        page: 1,
        limit: 5
      },
      articles: { total: 0, rows: [] }
    }
  },
  created() {
    this.fetchBlogs()
  },
  methods: {
    formatDate,
    fetchBlogs() {
      getBlogs(this.queryInfo).then((res) => {
        const { rows, total } = res.data
        if (rows) {
          console.log(rows)
          this.articles.rows = rows
          this.articles.total = total
        }
      })
    },
    handleCurrentChange(currentPage) {
      this.queryInfo.page = currentPage
      this.fetchBlogs()
    },
    handleSizeChange(size) {
      this.queryInfo.limit = size
      this.fetchBlogs()
    },
    handleEdit(row) {
      this.$router.push({
        path: `/articles/edit/${row.id}`
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBlog(id).then(() => {
          this.$message.success('删除成功')
          this.fetchBlogs()
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

<style lang="scss" scoped>
.article-container{
  padding: 20px;
}
</style>

