import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../localStorageManager";

export function loadItemStatus() {
  return loadFromLocalStorage<{
    [key: string]: { isBookmark: boolean; isCompleted: boolean };
  }>("itemStatus", {});
}

export function toggleBookmark(id: number) {
  let itemStatus = loadItemStatus();

  itemStatus[id] = itemStatus[id] || { isBookmark: false, isCompleted: false };
  itemStatus[id].isBookmark = !itemStatus[id].isBookmark;

  saveToLocalStorage("itemStatus", itemStatus);
}
export function completed(id: number) {
  let itemStatus = loadItemStatus();

  itemStatus[id] = itemStatus[id] || { isBookmark: false, isCompleted: false };
  itemStatus[id].isCompleted = true;

  saveToLocalStorage("itemStatus", itemStatus);
}

export function getItemStatusById(id: number) {
  let itemStatus = loadItemStatus();

  return itemStatus[id] || { isBookmark: false, isCompleted: false };
}

export function getFilteredData(datas: any[]) {
  loadItemStatus();

  return datas.filter((d) => getItemStatusById(d.id).isBookmark);
}
