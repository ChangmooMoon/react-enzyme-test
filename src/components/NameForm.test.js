import React from 'react'
import { shallow } from 'enzyme'
import NameForm from './NameForm'

describe('NameForm', () => {
  let component = null

  // test용 onInsert 함수. changed 값을 바꿔줌
  let changed = null
  const onInsert = (name) => {
    changed = name
  }

  it('renders correctly', () => {
    component = shallow(<NameForm onInsert={onInsert}/>)
  })

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  describe('insert new text', () => {
    it('has a form', () => {
      expect(component.find('form').exists()).toBe(true)
    })
    it('has an input', () => {
      expect(component.find('input').exists()).toBe(true)
    })
    it('stimulates input change', () => {
      const mockedEvent = {
        target : {
          value: '테스트삽입'
        }
      }
      component.find('input').simulate('change', mockedEvent)
      expect(component.state().name).toBe('테스트삽입')
    })
    it('stimulates form submit', () => {
      const mockedEvent ={
        preventDefault: () => null // onSubmit에서 preventDefault를 호출하게 되므로, 가짜 함수 추가
      }
      component.find('form').simulate('submit', mockedEvent)
      expect(component.state().name).toBe('') // submit해도 값이 공백
      expect(changed).toBe('테스트삽입')
    })
  })
})