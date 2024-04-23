class UtilService {

  async copyToClipboard(data, prefix) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(prefix !== undefined ? prefix + data : data);
    } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement("textarea");
      textArea.value = data;

      // Move textarea out of the viewport so it's not visible
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";

      document.body.prepend(textArea);
      textArea.select();

      try {
        document.execCommand('copy');
      } catch (error) {
        console.error(error);
      } finally {
        textArea.remove();
      }
    }
  }

}

export default new UtilService();
