import React from "react"
import classNames from "classnames"

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement> // React已提供好了button全部的props
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement> // React已提供好了A連結全部的props
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps> // Partial 可以把所有的屬性都設置成可選的

const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props

  // btn, btn-lg, btn-primary
  const classes = classNames('btn',{
    [`btn-${btnType}`]: btnType, // 如果btnType是true的話 就添加前面的文字
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>{children}</a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button