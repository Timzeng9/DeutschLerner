import { TypingContext, TypingStateActionType, WordartType } from '../../store'
import PrevAndNextWord from '../PrevAndNextWord'
import Progress from '../Progress'
import Phonetic from './components/Phonetic'
import Translation from './components/Translation'
import WordComponent from './components/Word'
import { usePrefetchPronunciationSound } from '@/hooks/usePronunciation'
import { isReviewModeAtom, isShowPrevAndNextWordAtom, loopWordConfigAtom, phoneticConfigAtom, reviewModeInfoAtom } from '@/store'
import type { Word } from '@/typings'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useContext, useMemo, useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import styles from './index.module.css'
import { useSaveWordRecord } from '@/utils/db'
import InfoBox from './InfoBox'

export default function WordPanel() {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state, dispatch } = useContext(TypingContext)!
  const phoneticConfig = useAtomValue(phoneticConfigAtom)
  const isShowPrevAndNextWord = useAtomValue(isShowPrevAndNextWordAtom)
  const [wordComponentKey, setWordComponentKey] = useState(0)
  const [currentWordExerciseCount, setCurrentWordExerciseCount] = useState(0)
  const { times: loopWordTimes } = useAtomValue(loopWordConfigAtom)
  const currentWord = state.chapterData.words[state.chapterData.index]
  const nextWord = state.chapterData.words[state.chapterData.index + 1] as Word | undefined
  const [clickedCorrect, setClickedCorrect] = useState(0);
  const saveWordRecord = useSaveWordRecord()
  
  const seconds = state.timerData.time % 60
  const minutes = Math.floor(state.timerData.time / 60)
  const secondsString = seconds < 10 ? '0' + seconds : seconds + ''
  const minutesString = minutes < 10 ? '0' + minutes : minutes + ''

  const prevIndex = useMemo(() => {
    const newIndex = state.chapterData.index - 1
    return newIndex < 0 ? 0 : newIndex
  }, [state.chapterData.index])
  const nextIndex = useMemo(() => {
    const newIndex = state.chapterData.index + 1
    return newIndex > state.chapterData.words.length - 1 ? state.chapterData.words.length - 1 : newIndex
  }, [state.chapterData.index, state.chapterData.words.length])

  usePrefetchPronunciationSound(nextWord?.name)

  // 检查是否结束该章节
  useEffect(() => {
    if(!state.chapterData.index) return
    if (state.chapterData.index >= state.chapterData.words.length || !state.isLastWordartCorrect) {
      // 用户完成当前章节
      dispatch({ type: TypingStateActionType.FINISH_CHAPTER })
    }

    }, [state.chapterData.index]);

  const [isShowTranslation, setIsHoveringTranslation] = useState(false)

  const handleShowTranslation = useCallback((checked: boolean) => {
    setIsHoveringTranslation(checked)
  }, [])

  useHotkeys(
    'tab',
    () => {
      handleShowTranslation(true)
    },
    { enableOnFormTags: true, preventDefault: true },
    [],
  )

  useHotkeys(
    'tab',
    () => {
      handleShowTranslation(false)
    },
    { enableOnFormTags: true, keyup: true, preventDefault: true },
    [],
  )

  const onSelectWordart = useCallback(
    (type:WordartType) => {
      const cur_wordart = type
      const word = state.chapterData.words[state.chapterData.index]
      let action_wordart = new RegExp(cur_wordart, "i");
      if (word.wordart &&word.wordart.match(action_wordart)) {
        setClickedCorrect((old) => old===1?2:1)
        dispatch({ type: TypingStateActionType.NEXT_WORD, isLastWordartCorrect: true })
      }
      else {
        setClickedCorrect((old) => old===-1?-2:-1)
        dispatch({ type: TypingStateActionType.NEXT_WORD, isLastWordartCorrect: false })
      }
      saveWordRecord({
        word: word.name,
        wrongCount: 1,
      })
    },
    [state.chapterData.index],
  )

  const shouldShowTranslation = useMemo(() => {
    return isShowTranslation || state.isTransVisible
  }, [isShowTranslation, state.isTransVisible])

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
      {state.isGoing && <InfoBox info={`${minutesString}:${secondsString}`} description="Time" />}
      <div className="container flex flex-grow flex-col items-center justify-center">
        {currentWord && (
          <div className="relative flex w-[90%] justify-center">
            <div className="relative">
              <WordComponent word={currentWord} clicked_correct={clickedCorrect} key={wordComponentKey} />
              {phoneticConfig.isOpen && <Phonetic word={currentWord} />}
              <Translation
                trans={currentWord.trans.join(';')}
                showTrans={shouldShowTranslation}
                onMouseEnter={() => handleShowTranslation(true)}
                onMouseLeave={() => handleShowTranslation(false)}
              />
              <Translation
                trans={currentWord.example ? currentWord.example : '\u00A0'}
                showTrans={shouldShowTranslation}
                onMouseEnter={() => handleShowTranslation(true)}
                onMouseLeave={() => handleShowTranslation(false)}
              />
            </div>
          </div>
        )}
      </div>
      <Progress className={`mb-10 mt-auto opacity-100`} />
      <div className="container flex h-15 w-[50%] grow-0 justify-between px-12 pb-10">
        <button className={`${styles.commonButton} ${styles.redButton}`} 
          onClick={() => onSelectWordart(WordartType.DER)}
          type="button">
          Der
        </button>
        <button className={`${styles.commonButton} ${styles.greenButton}`} 
          onClick={() => onSelectWordart(WordartType.DAS)}
          type="button">
          Das
        </button>
        <button className={`${styles.commonButton} ${styles.blueButton}`} 
          onClick={() => onSelectWordart(WordartType.DIE)}
          type="button">
          Die
        </button>
      </div>
    </div>
  )
}
