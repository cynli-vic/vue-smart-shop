// 约定一个通用键名
const INFO_KEY = 'hm_shopping_info'
const HISTORY_KEY = 'hm_history_list'

// 获取个人信息
export const getInfo = () => {
  const defaultobj = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultobj
}

// 设置个人信息
export const setInfo = (value) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(value))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getHistory = () => {
  const result = JSON.parse(localStorage.getItem(HISTORY_KEY))
  return result || []
}

// 设置搜索历史
export const setHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}
