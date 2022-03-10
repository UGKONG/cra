import axios from 'axios';
import useCreateElement from './useCreateElement';

// 파일 다운로드
export default function useDownload (fileURL = '/', fileName = null) {
  axios.get(fileURL, { responseType: 'blob' }).then(({data}) => {
    let options = { download: fileName, href: window.URL.createObjectURL(data), target: '_blank' };
    let a = useCreateElement('a', options);
    a.click(); a.remove();
  });
}