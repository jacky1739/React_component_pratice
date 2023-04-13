import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'

// 測試用戶點擊後是否可以正常觸發
// 因為點擊是個function
const defaultProps = {
  onClick: jest.fn(), // 監控的模擬函數 看是否有被調用到
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

// describe這個函數是分類
describe('test Button component', () => {
  // it 是測試用例
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Nice</Button>) // render掛載到節點上
    const element = screen.getByText('Nice') as HTMLButtonElement
    expect(element).toBeTruthy()
    expect(element).toBeInTheDocument()
    // 測試是否為button 因為element就是個dom元素
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('shouldd render the correct component based on different props', () => {
    render(<Button {...testProps}>Nice</Button>)
    const element = screen.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-primary btn-lg')
  })
  it('should render a link when btnType equals link and href is provided', () => {
    render(<Button btnType={'link'} href="http://dummyurl">Link</Button>)
    const element = screen.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render a disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>Nice</Button>) // render掛載到節點上
    const element = screen.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})