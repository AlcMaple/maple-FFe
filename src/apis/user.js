/**
 * 注意！ 本文件代码用以获取后端数据
 * 为了文件结构而保留，其本身需根据您的需求进行编写
 * 在组件中已经将此部分注释
 * @author xxh 2023-6-3
 */

import httpInstance from "@/utils/http";

//获取用户标签信息
export function getUserTagList() {
    return httpInstance({
        url: `/tag/tagList`,
        method: 'get',
    })
}

export function getUserArticleList(data) {
    console.log(data);
    return httpInstance({
        url: `/article`,
        method: 'post',
        data: data
    })
}

// get请求无法携带参数，所以用post请求 
export function getUserInfo(data) {
    return httpInstance({
        url: `/user`,
        method: 'post',
        data: data
    })
}

export function updateUserInfo(data) {
    console.log("实际发送的data:", data);
    return httpInstance({
        url: `/user`,
        method: 'put',
        data: data
    })
}
// 更新标签值
export function updateTagName(tag) {
    return httpInstance({
        url: `/tag`,
        method: 'put',
        data: tag
    })
}

// 删除一个标签
export function deleteTag(tagId) {
    return httpInstance({
        url: `/tag/${tagId}`,
        method: 'delete',
    })
}

// 新增标签
export function postNewTag(tag) {
    return httpInstance({
        url: `/tag`,
        method: 'post',
        data: tag
    })
}