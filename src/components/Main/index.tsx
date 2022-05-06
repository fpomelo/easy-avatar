import { useState } from 'react';
import AvatarForm from '../AvatarForm';
import AvatarMain from '../AvatarMain';
import { Options } from '../../allOptions';
import style from './index.module.css';


export default function Main() {
  const [ options, setOptions ] = useState<Options>({ avatarStyle: "Circle" });

  const onChangeOptions = (option: {[index: string]: string}) => {
    setOptions({...options, ...option});
  }
  
  return (
    <div className={style.mainContainer}>
      <AvatarMain options={options} onChangeOptions={onChangeOptions}/>
      <AvatarForm onChangeOptions={onChangeOptions} />
    </div>
  );
}
