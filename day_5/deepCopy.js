module.exports = function deepClone(obj, hash = new WeakMap()) {
  // 원시 타입은 그대로 반환
  if (obj === null || typeof obj !== "object") return obj;

  // 이미 복사된 객체인 경우, 저장된 참조를 반환
  if (hash.has(obj)) return hash.get(obj);

  const clonedObj = Array.isArray(obj) ? [] : new obj.constructor();
  hash.set(obj, clonedObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key], hash);
    }
  }

  return clonedObj;
};
