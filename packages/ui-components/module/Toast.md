You can show a toast by using the `useToast` hook, but you can also use the `Toast` component directly

```jsx
import { useToast } from '../../hooks/useToast'
import { Button } from './Button'

const ToastExample = () => {
  const { showToast, Toast } = useToast()

  return (
    <>
      <Button onClick={() => showToast('Hello')}>Show toast</Button>
      <Toast />
    </>
  )
}
;<ToastExample />
```
