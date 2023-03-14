import qs from 'qs'
import { useLocation, useNavigate } from 'react-router-dom'

const stringParse = value => {
  if (/^[a-zA-Z0-9_.-]*$/.test(value) ){
    return value
  } else {
    return "null"
  }
}

const parseObjectValues = (obj = {}) => {
  Object.keys(obj).forEach(k => {
    obj[k] = stringParse(obj[k])
  })

  return obj
}

const useQuery = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const value = parseObjectValues(
    qs.parse(location.search, { ignoreQueryPrefix: true }) || {} // loaction.search 取出網址參數時會有 ? 的前綴 , qs 本身解析有提供忽略 ? 前綴的選項
  )

  return {
    value,
    set: params =>
      navigate.push({
        pathname: location.pathname,
        search: qs.stringify({ ...value, ...parseObjectValues(params) })
      })
  }
}

export default useQuery