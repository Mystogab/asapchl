export const sendMessage = ({ from, to, content }) => {
  //FIXME: Do real business logic in here
  return content.type === "text" && Boolean(content.text);
}