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
//下面的没完成
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
  return http.get({url:'/v1/Activity/getActivityList'})
}