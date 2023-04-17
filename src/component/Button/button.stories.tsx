// import React from 'react'
import Button from './button'

import type { Meta, StoryObj } from '@storybook/react'

// import { ComponentMeta, ComponentStory } from '@storybook/react'

// const buttonMeta: ComponentMeta<typeof Button> = {
//   title: '第四章：Buton',
//   component: Button
// }

// export default buttonMeta

// const Template: ComponentStory<typeof Button> = (args) => (
//   <Button {...args}>Default Button</Button>
// )

// export const Default = Template.bind({})
// Default.args = {
//   children: 'Default Button'
// }

// export const Large = Template.bind({})
// Large.args = {
//   size: 'lg',
//   children: 'Large Button'
// }

// export const Small = Template.bind({})
// Small.args = {
//   size: 'sm',
//   children: 'Small Button'
// }

// export const Primary = Template.bind({})
// Primary.args = {
//   btnType: 'primary',
//   children: 'Primary Button'
// }

// export const Link = Template.bind({})
// Link.args = {
//   btnType: 'link',
//   children: 'Link Button',
//   href: 'https://google.com'
// }

// export const Danger = Template.bind({})
// Danger.args = {
//   btnType: 'danger',
//   children: 'Danger Button'
// }


const buttonMeta: Meta<typeof Button> = {
  title: '第四章：Button',
  component: Button
}

export default buttonMeta
type Story = StoryObj<typeof Button>

export const defaultButton: Story = {
  args: {
    children: 'Default Button'
  }
}
defaultButton.storyName = '默認樣式按鈕'

export const LargeButton: Story = {
  args: {
    size: 'lg',
    children: 'large Button'
  }
}

export const SmallButton: Story = {
  args: {
    size: 'sm',
    children: 'Small Button'
  }
}

export const Primary: Story = {
  args: {
    btnType: 'primary',
    children: 'primary button'
  }
}

export const Danger: Story = {
  args: {
    btnType: 'danger',
    children: 'Danger Button'
  }
}

export const Link: Story = {
  args: {
    btnType: 'link',
    children: 'Link Story',
    href: 'https://google.com'
  }
}