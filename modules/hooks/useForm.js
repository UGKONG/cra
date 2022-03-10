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