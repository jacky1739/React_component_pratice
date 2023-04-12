import React, { useState ,FunctionComponentElement, useContext } from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'

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
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
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
      // in：從無到有自動添加的類名 timeout：從active到結束的時間 appear：第一次運行也會執行整個動畫過程
      // 使用unmountOnExit: true 裏面包裹的元件, 當in為true或false裡面的元件會被動態的添加到dom節點上
      <CSSTransition in={menuOpen} timeout={300} classNames="zoom-in-top" appear unmountOnExit>
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </CSSTransition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu