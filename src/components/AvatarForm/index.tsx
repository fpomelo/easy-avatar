import { useState } from 'react';
import FormGroup from '../FormGroup';
import allOptions from '../../allOptions';
import style from './index.module.css';

interface Props {
  onChangeOptions: Function
}

export default function AvatarForm(props: Props) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  }

  const className = isCollapsed ? `${style.formContainer} ${style.collapsed}` : style.formContainer;
  return (
    <aside className={className}>
      <button className={style.collapsedBtn} onClick={toggleCollapsed}></button>
      <div className={style.avatarForm}>
        {
          Object.keys(allOptions).map(key => {
            return <FormGroup 
              key={key} 
              optionKey={key} 
              optionValues={allOptions[key]} 
              onChangeOptions={props.onChangeOptions}
            />
          })
        }
      </div>
    </aside>
  );
}