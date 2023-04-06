import React, { useState ,FunctionComponentElement, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
  children: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children,className }) => {
  const context = useContext(MenuContext)
  const openSubMenus = context.defaultOpenSubMenus as string[]
  const isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false

  const [ menuOpen, setOpen ] = useState(isOpend)

  const classes = classNames('menu-item submenu-item' ,className, {
    'is-active': context.index === index
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
    console.log('click')
  }
  // 為了讓打開和關閉平和一些 可以使用setTimeOut
  // toggle 打開或關閉
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
  const clickEvents = context.mode === 'vertical' && { onClick: handleClick }
  const hoverEvents = context.mode !== 'vertical' && {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
  }

  const renderChildren = () => {
    const subMenuClasses = classNames('jacky-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem component")
      }
    })
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu