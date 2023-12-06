// https://stackoverflow.com/a/11767598

export default function getCookie(cookiename: string) {
  // Get name followed by anything except a semicolon
  const cookiestring = RegExp(cookiename+"=[^;]+").exec(document.cookie)
  // Return everything after the equal sign, or an empty string if the cookie name not found
  // return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "")
  return decodeURIComponent(cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "")
}

//Sample usage
// var cookieValue = getCookie('MYBIGCOOKIE');
