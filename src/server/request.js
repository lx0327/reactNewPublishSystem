import { Service } from "./server"
export function getUserList () {
  return Service({
    url: '/users?_expand=role'
  })
}
export function getRoleList () {
  return Service({
    url: '/roles'
  })
}
export function getCategories () {
  return Service({
    url: '/categories'
  })
}
export function submitNewaction (data) {
  return Service({
    method: 'post',
    url: '/news',
    data
  })
}
