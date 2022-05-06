import { useState } from 'react';
import { Piece } from 'avataaars';
import { Colors, OptionNames } from '../../allOptions';
import style from './index.module.css';

interface Props {
  optionKey: string,
  optionValues: string[],
  onChangeOptions: Function
}

export default function FormGroup(props: Props) {
  const [activeIndex, setActiveIndex] = useState(-1); //选中的部件

  const onClickHandler = (option: {[index: string]: string}, index: number) => {
    props.onChangeOptions(option);      // 更新头像
    setActiveIndex(index);
  }
  /**
   * 生成单个选项下所有可选的小部件
   * 小部件用法 <Piece avatarStyle='Transparent' pieceType="mouth" pieceSize="100" mouthType="Eating"/>
   */
  const generatePieces= (optionKey: string, optionValues: string[]) => {
    const pieceOption = {
      avatarStyle: 'Circle',
      pieceSize: '50',
      pieceType: (optionKey.match(/^(.*)[A-Z][a-z]*$/) as string[])[1],
      [optionKey]: ''
    };
    // 加上后缀 's'
    if (['eye', 'eyebrow', 'graphic'].includes(pieceOption.pieceType)) {
      pieceOption.pieceType = pieceOption.pieceType + 's';
    }
    
    return optionValues.map((value, index) => {
      pieceOption[optionKey] = value;
      let className =  style.option + ' ' + style.type;
      if (index === activeIndex) {
        className += ' ' + style.active;
      }
      if (['Transparent', 'NoHair', 'Blank'].includes(value)) {
        className += ' ' + style.blank;
      }
      if (optionKey === 'avatarStyle' && value === 'Circle') {
        className += ' ' + style.avatarCircle;
      }
      
      return (
        <div 
          className={className}
          key={value} 
          onClick={() => onClickHandler({[optionKey]: value}, index)}
          data-type={optionKey}
        >
          <Piece {...pieceOption}/>
        </div>
      );
    });
  }

  // 生成色块
  const generateColor = (optionKey: string, optionValues: string[]) => {
    const color = Colors[optionKey];
    
    return optionValues.map((value, index) => {
      let className =  style.option + ' ' + style.color;
      if (index === activeIndex) {
        className += ' ' + style.active;
      }
      
      return (
        <div 
          className={className}
          style={{backgroundColor: color[value]}}
          key={value} 
          onClick={() => onClickHandler({[optionKey]: value}, index)}
          data-type={optionKey}
        >
        </div>
      );
    });
  }

  return (
    <div className={style.formGroup}>
      <div className={style.title}>
        {OptionNames[props.optionKey]}
      </div>
      <div className={style.options}>
        {
          props.optionKey.endsWith('Color')
          ? generateColor(props.optionKey, props.optionValues)
          : generatePieces(props.optionKey, props.optionValues)
        }
      </div>
    </div>
  );
}