import { Op } from 'sequelize'
import { Blog, type BlogAttributes } from '~/server/models/Blog'

interface BlogListParams {
  page?: number
  pageSize?: number
  category?: string
  keyword?: string
}

interface BlogListResult {
  blogs: BlogAttributes[]
  pagination: {
    currentPage: number
    pageSize: number
    totalCount: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

/**
 * 博客服务层
 * 负责处理博客相关的业务逻辑
 */
export class BlogService {
  
  /**
   * 获取轮播图数据 - 返回最新的指定数量博客
   * @param limit 限制数量，默认3
   * @returns 博客列表
   */
  static async getCarouselBlogs(limit: number = 3): Promise<BlogAttributes[]> {
    try {
      const blogs = await Blog.findAll({
        attributes: ['blogId', 'title', 'blogCover'],
        order: [['createTime', 'DESC']],
        limit: limit
      })

      return blogs.map(blog => blog.toJSON())
    } catch (error: any) {
      throw new Error(`获取轮播图数据失败: ${error.message}`)
    }
  }

  /**
   * 获取博客列表（分页）
   * @param params 查询参数
   * @returns 分页结果
   */
  static async getBlogList(params: BlogListParams): Promise<BlogListResult> {
    try {
      const { page = 1, pageSize = 10, category, keyword } = params
      const offset = (page - 1) * pageSize
      
      // 构建查询条件
      const whereCondition: any = {}
      
      if (category) {
        whereCondition.category = category
      }
      
      if (keyword) {
        whereCondition[Op.or] = [
          { title: { [Op.like]: `%${keyword}%` } },
          { describe: { [Op.like]: `%${keyword}%` } }
        ]
      }

      const { count, rows } = await Blog.findAndCountAll({
        where: whereCondition,
        attributes: [
          'blogId', 'title', 'blogCover', 'category', 
          'describe', 'createTime', 'updateTime'
        ],
        order: [['createTime', 'DESC']],
        limit: pageSize,
        offset: offset
      })

      const blogList = rows.map(blog => blog.toJSON())

      return {
        blogs: blogList,
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalCount: count,
          totalPages: Math.ceil(count / pageSize),
          hasNext: page < Math.ceil(count / pageSize),
          hasPrev: page > 1
        }
      }
    } catch (error: any) {
      throw new Error(`获取博客列表失败: ${error.message}`)
    }
  }

  /**
   * 根据ID获取博客详情
   * @param blogId 博客ID
   * @returns 博客详情
   */
  static async getBlogById(blogId: number): Promise<BlogAttributes> {
    try {
      if (!blogId || isNaN(blogId)) {
        throw new Error('博客ID无效')
      }

      const blog = await Blog.findByPk(blogId)
      
      if (!blog) {
        throw new Error('博客不存在')
      }

      return blog.toJSON()
    } catch (error: any) {
      throw new Error(`获取博客详情失败: ${error.message}`)
    }
  }

  /**
   * 创建新博客
   * @param blogData 博客数据
   * @returns 创建的博客
   */
  static async createBlog(blogData: Partial<BlogAttributes>): Promise<BlogAttributes> {
    try {
      const { title, content, describe, category, blogCover } = blogData
      
      // 业务逻辑验证
      if (!title || title.trim().length === 0) {
        throw new Error('博客标题不能为空')
      }
      
      if (!content || content.trim().length === 0) {
        throw new Error('博客内容不能为空')
      }

      if (title.length > 100) {
        throw new Error('博客标题不能超过100个字符')
      }

      // 检查标题是否重复
      const existingBlog = await Blog.findOne({ where: { title } })
      if (existingBlog) {
        throw new Error('博客标题已存在')
      }

      const blog = await Blog.create({
        title: title.trim(),
        content: content.trim(),
        describe: describe ? describe.trim() : '',
        category: category || '未分类',
        blogCover: blogCover || null,
        createTime: new Date(),
        updateTime: new Date()
      })

      return blog.toJSON()
    } catch (error: any) {
      throw new Error(`创建博客失败: ${error.message}`)
    }
  }

  /**
   * 更新博客
   * @param blogId 博客ID
   * @param updateData 更新数据
   * @returns 更新后的博客
   */
  static async updateBlog(blogId: number, updateData: Partial<BlogAttributes>): Promise<BlogAttributes> {
    try {
      if (!blogId || isNaN(blogId)) {
        throw new Error('博客ID无效')
      }

      const blog = await Blog.findByPk(blogId)
      if (!blog) {
        throw new Error('博客不存在')
      }

      const { title, content, describe, category, blogCover } = updateData
      
      // 业务逻辑验证
      if (title && title.trim().length === 0) {
        throw new Error('博客标题不能为空')
      }
      
      if (content && content.trim().length === 0) {
        throw new Error('博客内容不能为空')
      }

      if (title && title.length > 100) {
        throw new Error('博客标题不能超过100个字符')
      }

      // 检查标题是否重复（排除当前博客）
      if (title && title !== blog.title) {
        const existingBlog = await Blog.findOne({ 
          where: { 
            title,
            blogId: { [Op.ne]: blogId }
          } 
        })
        if (existingBlog) {
          throw new Error('博客标题已存在')
        }
      }

      const updatedBlog = await blog.update({
        title: title ? title.trim() : blog.title,
        content: content ? content.trim() : blog.content,
        describe: describe !== undefined ? describe.trim() : blog.describe,
        category: category || blog.category,
        blogCover: blogCover !== undefined ? blogCover : blog.blogCover,
        updateTime: new Date()
      })

      return updatedBlog.toJSON()
    } catch (error: any) {
      throw new Error(`更新博客失败: ${error.message}`)
    }
  }

  /**
   * 删除博客
   * @param blogId 博客ID
   * @returns 删除结果
   */
  static async deleteBlog(blogId: number): Promise<boolean> {
    try {
      if (!blogId || isNaN(blogId)) {
        throw new Error('博客ID无效')
      }

      const blog = await Blog.findByPk(blogId)
      if (!blog) {
        throw new Error('博客不存在')
      }

      await blog.destroy()
      return true
    } catch (error: any) {
      throw new Error(`删除博客失败: ${error.message}`)
    }
  }

  /**
   * 获取博客统计信息
   * @returns 统计信息
   */
  static async getBlogStats(): Promise<any> {
    try {
      const totalCount = await Blog.count()
      
      const categoryStats = await Blog.findAll({
        attributes: [
          'category',
          [Blog.sequelize!.fn('COUNT', Blog.sequelize!.col('blog_id')), 'count']
        ],
        group: ['category'],
        order: [[Blog.sequelize!.fn('COUNT', Blog.sequelize!.col('blog_id')), 'DESC']]
      })

      const recentBlogs = await Blog.findAll({
        attributes: ['blogId', 'title', 'createTime'],
        order: [['createTime', 'DESC']],
        limit: 5
      })

      return {
        totalCount,
        categoryStats: categoryStats.map((item: any) => ({
          category: item.category,
          count: parseInt(item.dataValues.count)
        })),
        recentBlogs: recentBlogs.map(blog => blog.toJSON())
      }
    } catch (error: any) {
      throw new Error(`获取博客统计信息失败: ${error.message}`)
    }
  }
}
