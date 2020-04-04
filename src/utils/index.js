/**
 * @description 将时间按指定格式处理并返回
 * @param {String|Number|Object|null} time
 * @param {String|null} cFormat
 * @returns {String}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
}

/**
 * @description 格式化时间，如果没超过 2 天，会按 {xxx 之前} 格式返回，否则按指定格式返回
 * @param {Number} time
 * @param {Object|null} option
 * @returns {String}
 */
export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * @description 提取 url 或 params 中的请求参数，以 Json 格式返回
 * @param {String}arg
 * @returns {Object} Json 格式请求参数
 */
export function requestParamsToJSON (arg) {
  if (!arg || String(arg) === '') return null
  if (typeof arg === 'object') return arg
  const argArr = arg.split('?')
  // 判断是 url 或者是 params
  if (argArr && argArr.length > 1) {
    arg = argArr[1]
    if (!arg) {
      return null
    }
  }
  return JSON.parse('{"' + decodeURIComponent(arg).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/**
 * @description 将制定的 html 转换为字符串
 * @param val 要转换的 HTML
 * @returns {(string | null) | string}
 */
export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * @description 合并两个 object，相同项合并以后者优先
 * @param {*} target 目标对象
 * @param {Object} source 被合并对象
 * @returns {*}
 */
export function objectMerge (target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty)
        continue
      }
      target[property] = sourceProperty
    }
  }
  return target
}

/**
 * @description 页面滚动到指定位置
 * @param {*} element 要滚动的 HTML 元素
 * @param {Number} to 滚动的距离
 * @param {Number} duration 滚动持续时间
 */
export function scrollTo (element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

/**
 * @description 切换 class，存在则去掉，不存在则添加
 * @param {*} element 目标 HTML 元素
 * @param {String} className 类名
 */
export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @description Element-ui 中 datepicker 组件所需配置
 * @type {*[]}
 */
export const pickerOptions = [
  {
    text: '今天',
    onClick (picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function getTime (type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @description 事件防抖
 * @param func
 * @param wait
 * @param immediate
 * @returns {function(...[*]=): *}
 */
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为 immediate === true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

/**
 * @description 深拷贝对象
 * @param {Object} source 原对象
 * @returns {*} 新对象
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

/**
 * @description 将 xml 字符串转为 xml 对象
 * @param {String} xmlString
 * @returns {*}
 */
export function loadXML (xmlString) {
  let xmlDoc = null
  // 判断浏览器的类型，用 window.DOMParser 判断是否是非 IE 浏览器
  if (!window.DOMParser && window.ActiveXObject) {
    // 支持IE浏览器
    const xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM']
    for (let i = 0; i < xmlDomVersions.length; i++) {
      try {
        xmlDoc = new window.ActiveXObject(xmlDomVersions[i])
        xmlDoc.async = false
        xmlDoc.loadXML(xmlString) // loadXML 方法载入 xml 字符串
        break
      } catch (e) {
        console.log(e)
      }
    }
  } else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
    // 支持 Mozilla 浏览器
    try {
      /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
       * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
       * parseFromString(text, contentType) 参数 text:要解析的 XML 标记 参数contentType文本的内容类型
       * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
       */
      const domParser = new DOMParser()
      xmlDoc = domParser.parseFromString(xmlString, 'text/xml')
    } catch (e) {
      console.log(e)
    }
  } else {
    return null
  }
  return xmlDoc
}
// 表单序列化
export const serialize = data => {
  let list = []
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}
export const getObjType = obj => {
  var toString = Object.prototype.toString
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}

/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
  delete obj1.close
  var o1 = obj1 instanceof Object
  var o2 = obj2 instanceof Object
  if (!o1 || !o2) { /*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object
    var t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = document.body.className + ' grayMode'
  } else {
    document.body.className = document.body.className.replace(' grayMode', '')
  }
}
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenElement()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}

/**
 * 跨浏览器返回正处于全屏的元素
 */
export const fullscreenElement = () => {
  var fullscreenEle = document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement
  // 注意：要在用户授权全屏后才能获取全屏的元素，否则 fullscreenEle为null
  console.log('全屏元素：' + fullscreenEle)
  return fullscreenEle
}

/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen () { callback() }
  document.addEventListener('fullscreenchange', function () { listen() })
  document.addEventListener('mozfullscreenchange', function () { listen() })
  document.addEventListener('webkitfullscreenchange', function () { listen() })
  document.addEventListener('msfullscreenchange', function () { listen() })
}

/**
 * 浏览器判断是否可以请求全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen = document.fullscreenEnabled ||
    window.fullScreen ||
    document.mozFullscreenEnabled ||
    document.webkitIsFullScreen
  return isFullscreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}

/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}

/**
 * 递归寻找子类的父类
 */
export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length !== 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id === id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length !== 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    }
  }
}

/**
 * 动态插入css
 */
export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

/**
 * 判断路由是否相等
 */
export const isObjectValueEqual = (a, b) => {
  let result = true
  Object.keys(a).forEach(ele => {
    const type = typeof (a[ele])
    if (type === 'string' && a[ele] !== b[ele]) result = false
    else if (type === 'object' && JSON.stringify(a[ele]) !== JSON.stringify(b[ele])) result = false
  })
  return result
}

/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value === value) {
      return i
    }
  }
  return -1
}

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}

/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

  const left = ((width / 2) - (w / 2)) + dualScreenLeft
  const top = ((height / 2) - (h / 2)) + dualScreenTop
  const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass (ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
