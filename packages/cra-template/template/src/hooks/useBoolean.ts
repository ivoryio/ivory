import { useState, Dispatch, SetStateAction } from 'react'

type DispatchToggleAction = (callback?: (previous: boolean) => void) => void

export function useBoolean(initialState: boolean): [boolean, DispatchToggleAction, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState(initialState)

  const toggleValue = (callback?: (prevValue: boolean) => void) =>
    setValue(prevValue => {
      if (callback && typeof callback === 'function') callback(prevValue)
      return !prevValue
    })

  return [value, toggleValue, setValue]
}
