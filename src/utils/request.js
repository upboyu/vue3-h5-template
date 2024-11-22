import axios from 'axios'
import qs from 'qs'

const { openLoading, closeLoading } = useLoading()

/**
 * service 使用说明
 *
 * @param {Object} config - 配置选项
 * @param {Boolean} config.showLoading - 是否显示加载动画。默认不显示。
 * @param {Boolean | Object | String} config.showErrorMessage - 是否显示错误消息。
 *   - 如果是对象，可能包含：
 *     - {String} title - 错误消息的标题。默认不显示标题。
 *     - {String} text - 错误消息的文本。默认显示接口返回值的 message 字段。
 *   - 如果是字符串，则作为错误消息的标题。（文本显示接口返回值的 message 字段。）
 *   - 如果是 true，则等价于 '{}'。（不显示标题。文本显示接口返回值的 message 字段。）
 *
 */

// 创建一个 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.showLoading && openLoading()
    // 从 localStorage 中获取 token, 将其添加到请求头中
    const token = localStorage.getItem('X-Token')
    const clientId = localStorage.getItem('X-ClientId')
    if (token && clientId) {
      config.headers['X-Token'] = token
      config.headers['X-ClientId'] = clientId
    }
    return config
  },
  (error) => {
    closeLoading()
    return handleError(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  async (response) => {
    closeLoading()
    const { status, data, config } = response

    // 如果后端返回的状态码不为 200，表示有错误
    if (status !== 200) return handleError(response)

    // json
    if (data?.returnCode) return data.returnCode === '000000' ? data.resData : handleError(response)

    // blob
    if (config?.responseType === 'blob') {
      // 处理文件下载失败
      if (data?.type === 'application/json') {
        const data = (response.data = JSON.parse(await response.data.text()))
        return data.returnCode === '000000' ? data.resData : handleError(response)
      }
      return data
    }

    // 其他
    return data
  },
  (error) => {
    closeLoading()
    return handleError(error)
  }
)

function handleError(result) {
  const { data = result, config: { showErrorMessage } = {} } = result
  showErrorMessage &&
    MessagePopup({
      type: 'error',
      title:
        typeof showErrorMessage === 'object'
          ? showErrorMessage.title
          : typeof showErrorMessage === 'string'
            ? showErrorMessage
            : undefined,
      text: showErrorMessage?.text || data?.message,
    })
  return Promise.reject(data)
}

export default service

export const getImageUrl = async (config) => {
  try {
    const data = await service({ method: 'get', responseType: 'blob', ...config })
    return URL.createObjectURL(data)
  } catch (error) {
    console.error('请求图片失败:', error)
    throw error
  }
}
