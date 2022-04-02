export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  if (matches) {
    let out = decodeURIComponent(matches[1])
    return out;
  }
  return undefined;
}

export function setCookie(name: string, value: string | number | boolean) {
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, "");
}
