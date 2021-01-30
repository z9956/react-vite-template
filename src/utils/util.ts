/**
 * 文本框默认选中value
 * @param { Event } e
 * */
export const selectedContent = (e: { target: { select: () => void }; }) => {
  try {
    e.target.select();
  } catch (e) {
    console.error(e);
  }
};