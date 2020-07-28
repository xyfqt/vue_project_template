import { Toast } from "vant";
import Clipboard from 'clipboard'

function clipboardSuccess() {
  Toast({
    message: "复制成功",
    position: "bottom"
  });
}

function clipboardError() {
  Toast({
    message: "复制失败",
    position: "bottom"
  });
}

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
