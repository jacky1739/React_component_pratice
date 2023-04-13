import React, { useState } from 'react'
// 使用global import的方式 就不用每個元件都import
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// import Button, { ButtonSize, ButtonType } from './component/Button/button'
import useMousePosition from './hook/useMousePosition'
import Menu from './component/Menu/menu'
import MenuItem from './component/Menu/menuItem'
import SubMenu from './component/Menu/subMenu'
import Transition from './component/Transition/Transition'
import Button from './component/Button/button'

library.add(fas)

interface PropsType {
  username: string
}

const App: React.FC<PropsType> = (props) => {
  const { username } = props
  const positions = useMousePosition()

  const [ show, setShow ] = useState(false)
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
        <Button size='lg' onClick={() => { setShow(!show) }}> Toggle </Button>
        <Transition 
          in={show}
          timeout={300}
          animation="zoom-in-left"
        >
          <div>
            <p>Edit <code>src/App.tsx</code> and save to reload</p>
            <p>Edit <code>src/App.tsx</code> and save to reload</p>
            <p>Edit <code>src/App.tsx</code> and save to reload</p>
            <p>Edit <code>src/App.tsx</code> and save to reload</p>
            <p>Edit <code>src/App.tsx</code> and save to reload</p>
            <p>Edit <code>src/App.tsx</code> and save to reload</p>
            <p>Edit <code>src/App.tsx</code> and save to reload</p>
          </div>
        </Transition>
        <Transition in={show} timeout={300} animation="zoom-in-top" wrapper>
          <Button btnType="primary" size="lg">A Large Button</Button>
        </Transition>
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
