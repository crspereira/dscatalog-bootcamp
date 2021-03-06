import React from 'react';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import './styles.scss';

type Props = {
   textButton: string;
}

const ButtonIcon = ({textButton}: Props) => {
   return (
      <div className="d-inline-flex">
         <button className="btn btn-primary btn-icon">
            <h5>{textButton}</h5>
         </button>
         <div className="btn-icon-content">
            <ArrowIcon />
         </div>
      </div>
   );
}

export default ButtonIcon;