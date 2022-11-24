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
