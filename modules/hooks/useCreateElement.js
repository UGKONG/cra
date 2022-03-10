export default function useCreateElement (tagName = 'div', attribute = {}, children = '') {
  if (typeof(tagName) !== 'string' || typeof(attribute) !== 'object' || typeof(children) !== 'string') return null;
  let tag = document.createElement(tagName);
  for (let key in attribute) {
    tag.setAttribute(key, attribute[key]);
  }
  tag.innerHTML = children;
  return tag;
}