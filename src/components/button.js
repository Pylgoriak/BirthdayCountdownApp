import React from 'react';

const Button = (title, name, icon, callback) => {
    if (icon == false) {
        return(
            <button className={name} onClick={callback}>
          {title}
      </button>
        )
    } else if (icon == true) {

    }
    return(
        <button className={name} onClick={callback}>
          <i className="far fa-calendar-alt"></i>
          {title}
      </button>
    )
}

export default Button;