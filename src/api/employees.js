import request from '@/utils/request'

/**
 * 获取下拉时候 员工简单列表
 * @param {*} _
 * @returns
 */
export const getUserEasyListApi = _ => {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工数据
 * @param {*} page
 * @param {*} size
 */
export const getUserROleListApi = (page, size) => {
  return request({
    url: '/sys/user',
    params: {
      page,
      size
    }
  })
}

/**
 * 删除id
 * @param {*} id
 * @returns
 */
export const delEmployeesApi = id => {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * 添加员工
 * @param {*} form
 * @returns
 */
export const addEmployeesApi = form => {
  return request({
    url: '/sys/user',
    method: 'post',
    data: form
  })
}

/**
 * 批量导入
 * @param {*} list
 * @returns
 */
export const bachEmployeesApi = list => {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data: list
  })
}

/** *
 * 保存员工的基本信息
 * **/
export function saveUserDetailByIdApi(data) {
  return request({
    method: 'put',
    url: `/sys/user/${data.id}`,
    data
  })
}

/** *
 *  读取用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function getPersonalDetailApi(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function updatePersonalApi(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/personalInfo`,
    data
  })
}

/** **
 * 获取用户的岗位信息  (岗位信息)
 * ****/
export function getJobDetailApi(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息  (岗位信息)
 * ****/
export function updateJobApi(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/jobs`,
    data
  })
}

/**
 * 给员工分配角色
 * @param {*} data
 * @returns
 */
export function editAssignROleApi(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}

