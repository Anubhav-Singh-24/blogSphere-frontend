export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};


export const getType = (value, body) => {
  if (value.params) {
    return { params: body };
  } else if (value.query) {
    if (typeof body === "object") {
      return { query: body._id };
    } else {
      return { query: body };
    }
  }
  return {};
};


 export const truncateHTML = (html, maxLength)=> {

  const text = html.replace(/<\/?[^>]+(>|$)/g, "");


  if (text.length > maxLength) {
    let truncated = text.substring(0, maxLength);
    let lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) {
      truncated = truncated.substring(0, lastSpace);
    }

    return truncated + "...";
  }

  return text;
}
