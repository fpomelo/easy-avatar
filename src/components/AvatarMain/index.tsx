import { useRef } from 'react';
import ReactDOM from 'react-dom';
import FileSaver from 'file-saver';
import Avatar from 'avataaars';
import allOptions, { Options } from '../../allOptions';
import style from './index.module.css';


interface Props {
  options: Options,
  onChangeOptions: Function
}

export default function AvatarMain(props: Props) {
  const avatarRef: any = useRef(null);
  const canvasRef: any = useRef(null);

  const downloadImg = () => {
    // svg格式
    // const svgNode = ReactDOM.findDOMNode(avatarRef.current!)! as Element;
    // const data = svgNode.outerHTML;
    // const svg = new Blob([data], { type: 'image/svg+xml' });
    // FileSaver.saveAs(svg, 'avataaars.svg');

    // png格式
    const svgNode = ReactDOM.findDOMNode(avatarRef.current!)! as Element
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const anyWindow = window as any
    const DOMURL = anyWindow.URL || anyWindow.webkitURL || window

    const data = svgNode.outerHTML
    const img = new Image()
    const svg = new Blob([data], { type: 'image/svg+xml' })
    const url = DOMURL.createObjectURL(svg)

    img.onload = () => {
      ctx.save()
      ctx.scale(2, 2)
      ctx.drawImage(img, 0, 0)
      ctx.restore()
      DOMURL.revokeObjectURL(url)
      canvasRef.current!.toBlob((imageBlob: Blob) => {
        FileSaver.saveAs(imageBlob, 'avatar.png');
      })
    }
    img.src = url
  }

  const generateRandomAvatar = () => {
    const keys = Object.keys(allOptions);
    const randomOptions: Options = keys.reduce((pre, key) => {
      const values = allOptions[key];
      const randomIndex = Math.floor(Math.random() * values.length);
      return {...pre, [key]: values[randomIndex]};
    }, {avatarStyle: ''});
    props.onChangeOptions(randomOptions);
  }

  return (
    <main className={style.avatarMain}>
      <header>
        <div className={style.header}>
          Easy Avatar
        </div>
      </header>
      <Avatar {...props.options} ref={avatarRef}/>
      <div>
        <button className={style.btn} onClick={generateRandomAvatar}>
          随机生成
        </button>
        <button className={style.btn} onClick={downloadImg}>
          下载头像
        </button>
      </div>
      <footer>for test</footer>
      <canvas
          style={{ display: 'none' }}
          width='528'
          height='560'
          ref={canvasRef}
        />
    </main>
  );
}