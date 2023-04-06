import React from 'react'

import Button, { ButtonSize, ButtonType } from './component/Button/button'
import useMousePosition from './hook/useMousePosition'
import Menu from './component/Menu/menu'
import MenuItem from './component/Menu/menuItem'
import SubMenu from './component/Menu/subMenu'

interface PropsType {
  username: string
}

const App: React.FC<PropsType> = (props) => {
  const { username } = props
  const positions = useMousePosition()
  return (
    <div className="App">
      <p>{username}</p>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Menu defaultIndex={'0'} onSelect={(index) => {alert(index)}}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link 1
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <SubMenu title="dropDown">
            <MenuItem>
              dropDown 1
            </MenuItem>
            <MenuItem disabled>
              dropDown 2
            </MenuItem>
            <MenuItem>
              dropDown 3
            </MenuItem>
          </SubMenu>
        </Menu>
        <Menu onSelect={(index) => {alert(index)}} mode={'vertical'} defaultOpenSubMenus={['2']}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <SubMenu title="dropDown">
            <MenuItem>
              dropDown 1
            </MenuItem>
            <MenuItem disabled>
              dropDown 2
            </MenuItem>
            <MenuItem>
              dropDown 3
            </MenuItem>
          </SubMenu>
        </Menu>
        <Button disabled>hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>這是按鈕</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>這是按鈕</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>這是按鈕</Button>
        <Button btnType={ButtonType.Default} size={ButtonSize.Small}>這是按鈕</Button>
        <Button btnType={ButtonType.Link} size={ButtonSize.Small}>這是按鈕</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <p>x: {positions.x}, y: {positions.y}</p>
      </header>
    </div>
  );
}

export default App;
