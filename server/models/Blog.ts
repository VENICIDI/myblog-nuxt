import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/server/utils/database'

export interface BlogAttributes {
  blogId?: number
  title: string
  blogCover?: string
  content?: string
  describe?: string
  category?: string
  createTime?: Date
  updateTime?: Date
}

export class Blog extends Model<BlogAttributes> implements BlogAttributes {
  declare blogId: number
  declare title: string
  declare blogCover?: string
  declare content?: string
  declare describe?: string
  declare category?: string
  declare createTime: Date
  declare updateTime: Date
}

Blog.init({
  blogId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'blog_id',
    comment: '博客的唯一标识'
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'blog_title',
    comment: '博客标题'
  },
  blogCover: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'blog_cover',
    comment: '博客封面图片'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'blog_content',
    comment: '博客内容'
  },
  describe: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'blog_describe',
    comment: '博客简介'
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'blog_category',
    comment: '博客分类'
  },
  createTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'create_time',
    comment: '创建时间'
  },
  updateTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'update_time',
    comment: '更新时间'
  }
}, {
  sequelize,
  tableName: 'tb_blog',
  timestamps: false, // 因为我们手动管理时间字段
  modelName: 'Blog',
  comment: '博客表'
})

// 添加钩子来自动更新updateTime
Blog.beforeUpdate((blog) => {
  blog.updateTime = new Date()
})
