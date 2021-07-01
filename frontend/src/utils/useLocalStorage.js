import { useState } from "react";

export function getStorageItem(key, initialValue) {
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // If error also return initialValue
    console.log(error);
    return initialValue;
  }
};

export function setStorageItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));}
  catch(error) {
    console.log(error)
  }
};

// Hook
export default function useLocalStorage(key, initialValue) {
  //내부에 있던 코드를 밖으로 빼서 getStorageItem 이라는 함수를 만듬.
  // 아래는 getter 기능
  const [storedValue, setStoredValue] = useState(() => {
    return getStorageItem(key, initialValue)
  });
  
  //내부에 있던 코드를 밖으로 빼서 setStorageItem 이라는 함수를 만듬.
  // 아래는 setter 기능
  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state(상태값의 반영)
    setStoredValue(valueToStore);
      // Save to local storage(로컬스토리지에 반영)
    setStorageItem(key, valueToStore);
  };
  return [storedValue, setValue];
}