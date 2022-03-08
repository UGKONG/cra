/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import _ from 'lodash';
import axios from 'axios';
import SortableList, { SortableItem } from 'react-easy-sort';

// 리액트 라우터 페이지 전환 애니메이션 함수
export function PageAnimate (props) {
  if (!props.children) return console.warn('애니메이션 할 요소가 없습니다.');
  let duration = props.duration || .3;
  let name = props.name;
  let _in;
  let _out;
  switch (name) {
    case 'fade':
      _in = { opacity: 1 }
      _out = { opacity: 0 }
      break;
    case 'slide-left':
      _in = { x: 0, opacity: 1 }
      _out = { x: 20, opacity: 0 }
      break;
    case 'slide-right':
      _in = { x: 0, opacity: 1 }
      _out = { x: -20, opacity: 0 }
      break;
    case 'slide-up':
      _in = { y: 0, opacity: 1 }
      _out = { y: 20, opacity: 0 }
      break;
    case 'slide-down':
      _in = { y: 0, opacity: 1 }
      _out = { y: -20, opacity: 0 }
      break;
    case 'scale':
      _in = { transform: 'scale(1)' }
      _out = { transform: 'scale(0)' }
      break;
    case 'scale-rotate':
      _in = { transform: 'scale(1) rotate(0deg)' }
      _out = { transform: 'scale(0) rotate(360deg)' }
      break;
    default:
      _in = { opacity: 1 }
      _out = { opacity: 0 }
  }
  return (
    <motion.div initial={_out} animate={_in} exit={_out} transition={{ duration }} >
      {props.children}
    </motion.div>
  )
}

export function SortList (props) {
  if (props.list === undefined || props.list === null) return console.warn('list is not found!!');
  if (!Array.isArray(props.list)) return console.warn('list is not array!!');
  if (!props.id) return console.warn('id is not found!!');
  if (!props.name) return console.warn('name is not found!!');
  
  const list = props.list;
  const onChange = useCallback((_old, _new) => {
    let result = useArrayMove(list, _old, _new);
    props.change(result);
  }, [list, props]);

  return (
    <SortableList onSortEnd={onChange} draggedItemClassName='active'>
      {list.map(item => (
        <SortableItem key={item[props.id]}>
          <div style={props.itemStyle}>{ item.children ?? item[props.name] }</div>
        </SortableItem>
      ))}
    </SortableList>
  );
}

// 브라우저 타이틀 변경 함수
export function useTitle (defaultTitle = '') {
  const [title, setTitle] = useState(defaultTitle);
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerText = title;
  }, [title]);
  return setTitle;
}

// 배열 중복값 필터 함수
export function useCleanArray (allArr = [], fieldName, returnKey = []) {
  if (allArr.length === 0) return console.warn('배열 allArr가 비어있습니다.');
  if (!fieldName) return console.warn('Key값이 없습니다.');
  if (!Array.isArray(returnKey)) return console.warn('Return Key값이 배열이 아닙니다.');
  let result = _.uniqBy(allArr, fieldName);
  let returnValue = [...result];
  
  if (returnKey.length > 0) {
    returnValue = result.map(item => {
      let data = {};
      returnKey.forEach(key => data[key] = item[key]);
      return data;
    })
  }
  return returnValue;
}

// fade 함수
export function useFade (id, state, duration = 500) {
  if (!id) return;
  const el = document.querySelector(id);
  el.style.transition = `${duration / 1000}s`;
  el.style.opacity = 0;
  if (state) {
    el.style.display = 'block';
    setTimeout(() => el.style.opacity = 1, 0);
  } else {
    setTimeout(() => el.style.display = 'none', duration);
  }
  return true;
}

// 연락처 하이픈 추가 함수
export function useHyphen (defaultValue) {
  const [value, setValue] = useState(defaultValue);
  if (value === undefined) return;
  let result = value.replace(/[^0-9]/g, "")
                    .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3")
                    .replace("--", "-");
  return [result, setValue];
}

// 숫자 포맷 함수
export function useNumber (defaultValue) {
  const [value, setValue] = useState(String(defaultValue));
  if (value === undefined) return;
  let result = value.replaceAll(',', '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return [result, setValue];
}

// 날짜 | 시간 출력 함수
export function useDate (dt = new Date(), type = 'all', format = false) {
  let date = new Date(dt);
  let Y = date.getFullYear();
  let M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  let resultDate = format ? Y + '년' + M + '월' + D + '일' : Y + '-' + M + '-' + D;
  let resultTime = format ? h + '시' + m + '분' + s + '초' : h + ':' + m + ':' + s;
  let result = null;
  if (type === 'date') result = resultDate;
  if (type === 'time') result = resultTime;
  if (type !== 'date' && type !== 'time') result = resultDate + ' ' + resultTime;
  return result;
}

// 나이계산 함수
export function useAge (defaultBirth = null) {
  // console.log(typeof(defaultBirth))
  if (!defaultBirth || typeof(defaultBirth) !== 'string' || defaultBirth.length < 6) return console.warn('dd');
  if (defaultBirth.length !== 6 && defaultBirth.length !== 8) return console.warn('dd');
  const [birth, setBirth] = useState(defaultBirth);
  let now = new Date();
  let date = '';
  let birthDate;
  let result;
  
  if (birth.length === 8) {
    let y = birth.slice(0, 4);
    date = `${y}-01-01`;
    birthDate = new Date(date);
    result = now.getFullYear() - birthDate.getFullYear() + 1;
  } else if (birth.length === 6) {
    let _nowY = Number(String(now.getFullYear()).slice(2, 4));
    let _birthY = Number(birth.slice(0, 2));
    let nowY = Number(String(now.getFullYear()).slice(0, 2));
    let firstNum = String(_birthY >= _nowY ? nowY - 1 : nowY);
    _birthY = _birthY === 0 ? '00' : (_birthY < 10 ? '0' + _birthY : _birthY);
    date = `${firstNum + _birthY}-01-01`;
    birthDate = new Date(date);
    result = now.getFullYear() - birthDate.getFullYear() + 1;
  } else {
    result = null;
  }
  
  return [birth, result, setBirth];
}

// 이미지 미리보기 함수
export function useImgPreview () {
  const [img, setImg] = useState([]);
  if (!img || img.length === 0) return [[], setImg];
  let result = [];
  if (img.length === 1) {
    result = [URL.createObjectURL(img[0])];
  } else {
    result = [];
    for(let i = 0; i < img.length; i++) {
      result.push(URL.createObjectURL(img[i]));
    }
  }
  return [result, setImg];
}

// 암호화 하는 함수
export function usePwEncoding (defaultStr = '') {
  const [str, setStr] = useState(defaultStr);
  let result = btoa(unescape(encodeURIComponent(str)));
  return [str, result, setStr];
}

// 복호화 하는 함수
export function usePwDecoding (defaultStr = '') {
  return decodeURIComponent(escape(atob(defaultStr)));
}

// 해당 월의 첫날짜, 끝날짜, 기본날짜, 첫날요일 리턴 함수
export function useMonthSpan (defaultDate) {
  let startDay = null, startDate = null, endDate = null;
  const [date, setDate] = useState(defaultDate);
  if (date.length !== 10) return {
    date, startDate, startDay, endDate, setDate
  }

  let dateObj = new Date(date);
  dateObj.setDate(1);
  startDay = dateObj.getDay();
  startDate = useDate(dateObj, 'date');
  dateObj.setMonth(dateObj.getMonth() + 1);
  dateObj.setDate(1);
  dateObj.setDate(dateObj.getDate() - 1);
  endDate = useDate(dateObj, 'date');

  return { startDay, startDate, endDate, setDate, date };
}

// GET파라미터 객체 변환 함수
export function useQueryObject (defaultString = '') {
  const [query, setQuery] = useState(defaultString);
  if (typeof(defaultString) !== 'string') return [null, null, null];
  let queryString = query.indexOf('?') > -1 ? query.split('?')[1] : query;
  let resultObj = {};
  let stringArr = [];
  
  if (queryString.indexOf('&') > -1) {
    stringArr = queryString.split('&');
  } else {
    stringArr[0] = queryString;
  }
  stringArr.forEach(data => {
    let [key, value] = data.split('=');
    resultObj[key] = value;
  });
  return [query, resultObj, setQuery];
}

// GET파라미터 스트링 변환 함수
export function useQueryString (defaultObject = {}) {
  const [query, setQuery] = useState(defaultObject);
  if (typeof(query) !== 'object' || !query) return [query, '', setQuery];
  let strArr = [];
  let keys = Object.keys(query);
  keys.forEach(key => strArr.push(key + '=' + query[key]));
  let result = strArr.join('&');
  return [query, result, setQuery];
}

// 배열 아이템 value중 가장 높/낮은 Object 반환 함수
export function useArrayMaxItem (defaultArray = [], keyName = '', option = false) {
  const [array, setArray] = useState(defaultArray);
  if (array.length === 0) return [[], setArray];
  if (!(keyName in array[0])) return [[], setArray];
  let sortArr = array.sort((a, b) => Number(a[keyName]) - Number(b[keyName]));
  let maxObj = sortArr[sortArr.length - 1];
  let minObj = sortArr[0];
  
  return [option ? minObj : maxObj, setArray];
}

// 배열의 프로퍼티 value 정렬 후 리스트 반환 함수
export function useOrderArr (defaultArray = [], prop = '') {
  const [array, setArray] = useState(defaultArray);
  if (array.length < 2) return [array, setArray];
  let isJustArray = typeof(array[0]) !== 'object';

  if (isJustArray) {
    let type = typeof(array[0]);
    if (type === 'string') return [array.sort((a, b) => a < b ? -1 : a > b ? 1 : 0), setArray];
    if (type === 'number') return [array.sort((a, b) => Number(a) - Number(b)), setArray];
  } else {
    if (!prop) return [array, setArray];
    let type = typeof(array[0][prop]);
    if (type === 'string') return [array.sort((a, b) => a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0), setArray];
    if (type === 'number') return [array.sort((a, b) => Number(a[prop]) - Number(b[prop])), setArray];
  }
  return [array, setArray];
}

// 파일 사이즈 반환 함수
export function useFileSize (defaultSize) {
  const [size, setSize] = useState(defaultSize);
  if (typeof(size) !== 'number') return [size, 'Not Number Type', setSize];
  if (size === 0) return [0, '0Byte', setSize];
  let extList = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let result = 0;
  let ext = '';
  let n = 1024;
  if (size < n) {
    result = size;
    ext = extList[0];
  }
  if (size >= n) {
    result = size / n;
    ext = extList[1];
  }
  if (size >= n * n) {
    result = size / n / n;
    ext = extList[2];
  }
  if (size >= n * n * n) {
    result = size / n / n / n;
    ext = extList[3];
  }
  if (size >= n * n * n * n) {
    result = size / n / n / n / n;
    ext = extList[4];
  }
  if (size >= n * n * n * n * n) {
    result = size / n / n / n / n / n;
    ext = extList[5];
  }
  if (size >= n * n * n * n * n * n) {
    result = size / n / n / n / n / n / n;
    ext = extList[6];
  }
  result = result.toFixed(2) + ext;
  return [size, result, setSize];
}

// 날짜 Validation 함수
export function useDateValidation (defaultDate = {}, callbackFn = () => {}) {
  const [date, setDate] = useState(defaultDate);
  let result = false;
  if (!date?.start || !date?.end) return [date, result, setDate];
  let start = date.start, end = date.end;
  if (start === '' || end === '' || typeof(start) !== 'string' || typeof(end) !== 'string') return [date, result, setDate];
  if (start.length !== 10 || end.length !== 10) return [date, result, setDate];

  let startDT = new Date(start);
  let endDT = new Date(end);
  startDT.setHours(0); endDT.setHours(0);
  startDT.setMinutes(0); endDT.setMinutes(0);
  startDT.setSeconds(0); endDT.setSeconds(0);
  startDT.setMilliseconds(0); endDT.setMilliseconds(0);
  let calc = endDT - startDT;
  result = calc >= 0;

  callbackFn(result);
  return [date, result, setDate];
}

// Element 위치 반환 함수
export function useOffsetY (ref) {
  let result = null;
  if (!ref?.current) return result;
  result = ref.current.getBoundingClientRect().top;
  return result;
}

// 푸쉬 알림 함수
export const useAlert = {
  title: 'Example Title',
  text: 'Example Description',
  skin: {
    info: {
      icon: 'fas fa-info-circle',
      txt: '#f8f9fb',
      bg: '#0c86eb',
      progress: 'rgb(12,117,204)'
    },
    success: {
      icon: 'fas fa-check-circle',
      txt: '#f8f9fb',
      bg: '#54ac3b',
      progress: 'rgb(65 158 38)'
    },
    warn: {
      icon: 'fas fa-exclamation-triangle',
      txt: '#353a40',
      bg: '#feb100',
      progress: 'rgb(196 140 11)'
    },
    error: {
      icon: 'fas fa-times',
      txt: '#f8f9fb',
      bg: '#ff395a',
      progress: 'rgb(214 41 70)'
    },
    other: {
      icon: 'fas fa-question',
      txt: '#f8f9fb',
      bg: '#464646',
      progress: 'rgb(61 52 52)'
    }
  },
  style (isMobile) {
    return `
      <style>
        section[alert] {
          user-select: none;
          position: fixed;
          top: -100px;
          right: ${isMobile ? '50%' : '10px'};
          width: ${isMobile ? 'calc(100% - 40px)' : '400px'};
          transform: ${isMobile ? 'translateX(50%)' : 'unset'};
          height: ${isMobile ? '50px' : '70px'};
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0px 2px 6px #00000050;
          z-index: 99999999999999999999999999;
          transition-duration: .4s;
          overflow: hidden;
        }
        section[alert] > .wrap {
          user-select: none;
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          padding: ${isMobile ? '6px' : '10px'};
        }
        section[alert] > .wrap > .icon {
          user-select: none;
          width: 50px;
          min-width: ${isMobile ? '38px' : '50px'};
          font-size: ${isMobile ? '26px' : '34px'};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        section[alert] > .wrap > .context {
          user-select: none;
          padding: 0 ${isMobile ? '3px' : '10px'};
          width: calc(100% - ${isMobile ? '50px' : '64px'});
        }
        section[alert] > .wrap > .context > .title {
          user-select: none;
          font-weight: 500;
          letter-spacing: .5px;
          height: ${isMobile ? '48%' : '50%'};
          margin: 0;
          font-size: ${isMobile ? '12px' : '16px'};
        }
        section[alert] > .wrap > .context > .text {
          user-select: none;
          font-size: 13px;
          height: 50%;
          display: flex;
          align-items: center;
          padding-bottom: 3px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          margin: 0;
        }
        section[alert] .progress {
          user-select: none;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          margin: 0;
          background-color: #eeeeee50;
        }
        section[alert] .progress > div {
          user-select: none;
          width: 0%;
          height: 100%;
          transition: 2.5s;
        }
        section[alert] .xBtn {
          user-select: none;
          width: 14px;
          height: 14px;
          background: transparent;
          border: none;
          display: ${isMobile ? 'none' : 'flex'};
          align-items: center;
          justify-content: center;
          font-size: 16px;
          opacity: .6;
        }
        section[alert] .xBtn:hover {
          user-select: none;
          box-shadow: none;
          opacity: 1;
          background: transparent;
        }
      </style>
    `;
  },
  init (skin = this.skin.info, title = this.title, text = this.text, isMobile) {
    let count = document.querySelectorAll('section[alert]').length;
    let dom = document.createElement('section');
    dom.setAttribute('alert', '');
    dom.style.backgroundColor = skin.bg;
    dom.style.color = skin.txt;
    dom.style.top = '-100px';

    dom.innerHTML = `
      <div class="wrap">
        <div class="icon"><i class="${skin.icon}"></i></div>
        <div class="context"><p class="title">${title}</p><p class="text">${text}</p></div>
        <button class="xBtn"><i class="fas fa-times"></i></button>
        <article class="progress"><div style="
          background-color: ${skin.progress}
        "></div>
      </div>${this.style(isMobile)}
    `;
    document.body.appendChild(dom);
    let xBtn = dom.children[0].children[2];
    let progress = dom.children[0].children[3].children[0];
    if (isMobile) {
      dom.onclick = () => this.close(dom);
    } else {
      xBtn.onclick = () => this.close(dom);
    }
    window.setTimeout(() => {
      dom.style.top = 60 * count + 10 + 'px';
      progress.style.width = '100%';
    }, 0);
    this.autoClose(dom);
  },
  info (title, text, isMobile = false) {
    this.init(this.skin.info, title, text, isMobile);
  },
  success (title, text, isMobile = false) {
    this.init(this.skin.success, title, text, isMobile);
  },
  warn (title, text, isMobile = false) {
    this.init(this.skin.warn, title, text, isMobile);
  },
  error (title, text, isMobile = false) {
    this.init(this.skin.error, title, text, isMobile);
  },
  other (title, text, isMobile = false) {
    this.init(this.skin.other, title, text, isMobile);
  },
  close (el) {
    el.style.top = '-100px';
    el.style.transitionDelay = '0s';
    window.setTimeout(() => el.remove(), 330); // 3300
  },
  autoClose (el) {
    window.setTimeout(() => {
      el.style.transitionDelay = '3s';
      el.style.top = '-100px';
      el.style.transitionDelay = '0s';
    }, 3300);
    window.setTimeout(() => el.remove(), 3630);
  },
}

// 세션 스토리지 (GET, POST, PUT)
export function useSessionStorage (key = null, value) {
  if (!key || typeof(key) != 'string') return console.warn('useSession key is Null!!');
  if (!value) return window.sessionStorage[key];
  
  window.sessionStorage.setItem(key, value);
  return window.sessionStorage[key];
}

// 세션 스토리지 (DELETE)
export function useRemoveSessionStorage (key) {
  if (!key || typeof(key) != 'string') return console.warn('delSession key is Null!!');
  window.sessionStorage.removeItem(key);

  return window.sessionStorage;
}

// 로컬 스토리지 (GET, POST, PUT)
export function useLocalStorage (key = null, value) {
  if (!key || typeof(key) != 'string') return console.warn('useSession key is Null!!');
  if (!value) return window.localStorage[key];
  
  window.localStorage.setItem(key, value);
  return window.localStorage[key];
}

// 로컬 스토리지 (DELETE)
export function useRemoveLocalStorage (key) {
  if (!key || typeof(key) != 'string') return console.warn('delSession key is Null!!');
  window.localStorage.removeItem(key);

  return window.localStorage;
}

// 파일 다운로드
export function useDownload (fileURL = '/', fileName = null) {
  axios.get(fileURL, { responseType: 'blob' }).then(({data}) => {
    let options = { download: fileName, href: window.URL.createObjectURL(data), target: '_blank' };
    let a = useCreateElement('a', options);
    a.click(); a.remove();
  })
}

// 딜레이 함수
export function useDelay (duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), duration);
  });
}

// FormData 리턴함수
export function useForm (data = {}, files = {}) {
  if (typeof(data) != 'object') return console.warn('data is not object!!');

  let keys = Object.keys(data);
  let form = new FormData();
  keys.forEach((key) => {
    let value = Array.isArray(data[key]) ? JSON.stringify(data[key]) : data[key];
    form.append(key, value);
  });

  let key = Object.keys(files)[0];
  if (!key) return form;
  if (files[key].length === 0) return form;
  files[key].forEach((file) => form.append(key, file));

  return form;
}

// Cookie
export function useCookie (name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export function useCreateElement (tagName = 'div', attribute = {}, children = '') {
  if (typeof(tagName) !== 'string' || typeof(attribute) !== 'object' || typeof(children) !== 'string') return null;
  let tag = document.createElement(tagName);
  for (let key in attribute) {
    tag.setAttribute(key, attribute[key]);
  }
  tag.innerHTML = children;
  return tag;
}

// 배열 순서 랜덤 함수
export function useRandomArray (array = []) {
  if (array.length === 0 || !Array.isArray(array)) return [];
  return _.shuffle(array);
}

// 배열 순서 변경 함수
export function useArrayMove (_array, _old, _new) {
  if (!Array.isArray(_array)) return console.warn('_array is not Array!!');
  if (_array.length === 0) return _array;
  let result = [];
  let temp = _array[_old];
  _array.forEach((item, i) => i !== _old && result.push(item));
  result.splice(_new, 0, temp);
  return result;
}
