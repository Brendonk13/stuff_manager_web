

export function uid(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function addUid(key: string){
  return `${key}__${uid()}`
}
