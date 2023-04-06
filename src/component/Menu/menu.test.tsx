import React from 'react'
import { fireEvent, render, RenderResult, screen, cleanup, waitFor } from  '@testing-library/react'

import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}
 
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled index={'1'}>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .jacky-submenu {
      display: none;
    }
    .jacky-submenu.menu-opened {
      display: block;
    }
  `
  // 創建一個style文件
  const style = document.createElement('style')
  style.innerText = cssFile
  return style
}

let wrapper: RenderResult, menuElememt: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
const setup = () => {
  wrapper = render(generateMenu(testProps))
  wrapper.container.append(createStyleFile())
  menuElememt = screen.getByTestId('test-menu')
  activeElement = screen.getByText('active')
  disabledElement = screen.getByText('disabled')
}
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    setup()
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElememt).toBeInTheDocument()
    expect(menuElememt).toHaveClass('jacky-menu')
    // expect(menuElememt.getElementsByTagName('li').length).toEqual(3)
    expect(menuElememt.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = screen.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active') // 點擊thirdItem後 之前的activeElement就不能有active
    expect(testProps.onSelect).toHaveBeenCalledWith('2') // onSelect這個要觸發 調用的參數index是2
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    wrapper = render(generateMenu(testVerProps))
    menuElememt = screen.getByTestId('test-menu')
    expect(menuElememt).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when hover on subMenu', async () => {
    // queryByText和getByText不同的地方是 queryByText會返回一個null或是html element
    expect(screen.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = screen.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(screen.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(screen.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(screen.queryByText('drop1')).not.toBeVisible()
    })
  })
})
