import React from "react"
import classNames from "classnames"

// export enum ButtonSize {
//   Large = 'lg',
//   Small = 'sm'
// }

export type ButtonSize = 'lg' | 'sm'

// export enum ButtonType {
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger',
//   Link = 'link'
// }

export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string;
  /**設定 Button 的禁用 */
  disabled?: boolean;
  /**設定 Button 的尺寸 */
  size?: ButtonSize;
  /**設定按鈕的樣式 */
  btnType?: ButtonType;
  children: React.ReactNode;
  /**連結的字串 */
  href?: string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement> // React已提供好了button全部的props
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement> // React已提供好了A連結全部的props
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps> // Partial 可以把所有的屬性都設置成可選的
/**
 * 頁面中最常用的按鈕元素, 適合於完成特定的交互, 支持 HTML button 和 a 連結 的所有屬性
 * ### 引用方法
 * ```js
 * import { Button } from 'jacky'
 * ```
 */
export const Button: React.FC<ButtonProps> = (props) => {
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
    'disabled': (btnType === 'link') && disabled
  })

  if (btnType === 'link' && href) {
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
  btnType: 'default'
}

export default Button