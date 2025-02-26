import { TypingContext, TypingStateActionType } from '../../store'
import Tooltip from '@/components/Tooltip'
import { CTRL } from '@/utils'
import { useContext } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import IconLanguage from '~icons/tabler/language'
import IconLanguageOff from '~icons/tabler/language-off'

export default function Switcher() {
  const { state, dispatch } = useContext(TypingContext) ?? {}


  const changeTransVisibleState = () => {
    if (dispatch) {
      dispatch({ type: TypingStateActionType.TOGGLE_TRANS_VISIBLE })
    }
  }

  useHotkeys(
    'ctrl+shift+v',
    () => {
      changeTransVisibleState()
    },
    { enableOnFormTags: true, preventDefault: true },
    [],
  )

  return (
    <div className="flex items-center justify-center gap-2">
      <Tooltip className="h-7 w-7" content={`Show translation (${CTRL} + Shift + V) or Temporary show (Tab)`}>
        <button
          className={`p-[2px] ${state?.isTransVisible ? 'text-indigo-500' : 'text-gray-500'} text-lg focus:outline-none`}
          type="button"
          onClick={(e) => {
            changeTransVisibleState()
            e.currentTarget.blur()
          }}
          aria-label={`Show translation (${CTRL} + Shift + V) or Temporary show (Tab)`}
        >
          {state?.isTransVisible ? <IconLanguage /> : <IconLanguageOff />}
        </button>
      </Tooltip>

    </div>
  )
}
