import http from './httpConfig'

export function adminLogin(data){
  return http.post({url:'/v1/admin/login',data})
}

export function getAdminInfo(){
  return http.get({url:'/v1/admin/getAdminInfo'})
}

export function getAdminList(){
  return http.get({url:'/v1/admin/getAdminList'})
}

export function getRoleList(){
  return http.get({url:'/v1/admin/getRole'})
}

export function editAdmin(data){
  return http.post({url:'v1/admin/editAdmin',data:data})
}

export function deleteAdmin(data){
  return http.post({url:'/v1/admin/deleteAdmin',data:data})
}

export function addAdmin(data){
  return http.post({url:'/v1/admin/addAdmin',data:data})
}

export function getUserList(){
  return http.get({url:'/v1/User/getUserList'})
}

export function deleteUser(data){
  return http.post({url:'/v1/User/deleteUser',data:data})
}

export function getActivityList(){
  return http.get({url:'/v1/activity/getActivity'})
}

export function deleteActivity(id){
  return http.post({url:'/v1/activity/deleteActivity',data:{id}})
}

export function getComment(aid){
  return http.get({url:`/v1/comment/getComment?aid=${aid}`})
}
export function deleteComment(id){
  return http.post({url:'/v1/comment/deleteComment',data:{id}})
}

export function editAdminPassword(oldPassword,newPassword){
  return http.post({url:'/v1/admin/editPassword',data:{oldPassword,newPassword}})
}