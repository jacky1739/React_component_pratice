import type { Meta, StoryObj } from '@storybook/react'
import Menu from './menu'
import SubMenu from './subMenu'
import Item from './menuItem'

const menuMeta: Meta<typeof Menu> = {
  title: '第六章：Menu',
  id: 'Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    defaultIndex: {
      control: 'color',
      description: 'normal color'
    }
  }
}

export default menuMeta
type Story = StoryObj<typeof Menu>

export const DefaultMenu: Story = {
  render: (args) => (
    <Menu {...args}>
      <Item>
        cool link
      </Item>
      <Item>
        cool link 2
      </Item>
      <SubMenu title="下拉選單">
        <Item>
          下拉選單一
        </Item>
        <Item>
          下拉選單二
        </Item>
      </SubMenu>
    </Menu>
  )
}

export const ClickMenu: Story = {
  render: (args) => (
    <Menu defaultIndex='0' mode='vertical' {...args}>
      <Item>
        cool link
      </Item>
      <Item>
        cool link 2
      </Item>
      <SubMenu title="下拉選單">
        <Item>
          下拉選單一
        </Item>
        <Item>
          下拉選單二
        </Item>
      </SubMenu>
    </Menu>
  )
}
ClickMenu.parameters = {
  backgrounds: {
    values: [
      { name: 'twitter', value: '#00aced' },
      { name: 'facebook', value: '#3b5998' }
    ],
    docs: {
        description: {
          component: 'Another description, overriding the comments'
        },
      },
  }
}
ClickMenu.storyName = '垂直的 Menu'