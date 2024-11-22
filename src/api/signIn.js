import service, { getImageUrl } from '@/utils/request';

import localImage from '@/assets/images/signIn/详情页底图.png';
export function downloadEventFile() {
  // return getImageUrl({
  //   url: '/user/img',
  // });
  return Promise.resolve(localImage)
}

export function getUserSignByCode() {
  let a = Promise.resolve(null) // 未签到
  let b = Promise.resolve({ message: 'asdf' }) // 已签到
  return a
}

export function userSign() {
  let a = Promise.resolve() // 签到成功
  let b = Promise.reject({ message: '签到失败~!' }) // 签到失败
  return a
}

export function getEventByCode() {
  let a = Promise.resolve({ theme: '#111,#fff' })
  let b = Promise.reject('获取活动对象失败~!')
  return a
}

export function getUserSignList() {
  let a = Promise.resolve({ num: 23 })
  let b = Promise.reject('获取列表失败~!')
  return a
}