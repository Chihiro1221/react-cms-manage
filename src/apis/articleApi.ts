import {ResponseResult} from '#/responseResult';
import http from '@/utils/http';

export interface ArticleParams {
  num?: number;
  count?: number;
}

export interface ArticleApi {
  id: string;
  title: string;
  subTitle: string;
  author: string;
  date: string;
  content: string;
}

export interface ArticleResponse {
  total: number;
  count: number;
  num: number;
  arr: ArticleApi[];
}

/**
 * 获取文章列表
 * @param {ArticleParams} params 分页参数
 * @returns {Promise<ArticleResponse>}}
 */
export const getArticles = (params: ArticleParams = {}) => {
  return http.request<ArticleResponse>({
    url: 'article',
    params,
  });
};

interface CreateArticle {
  title: string;
  subTitle?: string;
  content: string;
}

/**
 * 创建文章
 * @param {CreateArticle} data 文章数据
 * @returns {Promise<ResponseResult>}
 */
export const createArticle = (data: CreateArticle) => {
  return http.request({
    url: 'article/add',
    method: 'POST',
    data,
  });
};

/**
 * 根据id获取文章
 * @param {String} id 文章id
 * @returns {Promise<ArticleApi>}
 */
export const getArticleById = (id: string) => {
  return http.request<ArticleApi>({
    url: `article/${id}`,
  });
};

interface UpdateArticle {
  id: number;
  title: string;
  subTitle?: string;
  content: string;
}

/**
 * 根据id更新文章
 * @param {String} id 文章id
 * @returns {Promise<ArticleApi>}
 */
export const updateArticleById = (data: UpdateArticle) => {
  return http.request({
    url: `article/update`,
    method: 'PUT',
    data,
  });
};

/**
 * 根据id删除文章
 * @param {String} id 文章id
 * @returns {Promise<ResponseResult>}
 */
export const removeArticleById = (id: string) => {
  return http.request({
    url: 'article/remove',
    method: 'POST',
    data: {
      id,
    },
  });
};
