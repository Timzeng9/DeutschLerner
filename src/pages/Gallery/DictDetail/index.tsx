import { useDeleteWordRecord } from '../../../utils/db'
import Chapter from '../Chapter'
import { ErrorTable } from '../ErrorTable'
import { getRowsFromErrorWordData } from '../ErrorTable/columns'
import { ReviewDetail } from '../ReviewDetail'
import useErrorWordData from '../hooks/useErrorWords'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { currentChapterAtom, currentDictIdAtom, reviewModeInfoAtom } from '@/store'
import type { Dictionary } from '@/typings'
import range from '@/utils/range'
import { useAtom, useSetAtom } from 'jotai'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IcOutlineCollectionsBookmark from '~icons/ic/outline-collections-bookmark'
import MajesticonsPaperFoldTextLine from '~icons/majesticons/paper-fold-text-line'
import PajamasReviewList from '~icons/pajamas/review-list'

enum Tab {
  Chapters = 'chapters',
}

export default function DictDetail({ classNames, dictionary: dict }: { classNames: string, dictionary: Dictionary }) {
  const [currentChapter, setCurrentChapter] = useAtom(currentChapterAtom)
  const [currentDictId, setCurrentDictId] = useAtom(currentDictIdAtom)
  const [curTab, setCurTab] = useState<Tab>(Tab.Chapters)
  const setReviewModeInfo = useSetAtom(reviewModeInfoAtom)
  const navigate = useNavigate()
  const { deleteWordRecord } = useDeleteWordRecord()
  const [reload, setReload] = useState(false)

  const chapter = useMemo(() => (dict.id === currentDictId ? currentChapter : 0), [currentChapter, currentDictId, dict.id])
  const { errorWordData, isLoading, error } = useErrorWordData(dict, reload)

  const tableData = useMemo(() => {
    return getRowsFromErrorWordData(errorWordData)
  }, [errorWordData])

  const onDelete = useCallback(
    async (word: string) => {
      await deleteWordRecord(word, dict.id)
      setReload((old) => !old)
    },
    [deleteWordRecord, dict.id],
  )

  const onChangeChapter = useCallback(
    (index: number) => {
      setCurrentDictId(dict.id)
      setCurrentChapter(index)
      setReviewModeInfo((old) => ({ ...old, isReviewMode: false }))
      navigate('/')
    },
    [dict.id, navigate, setCurrentChapter, setCurrentDictId, setReviewModeInfo],
  )

  const handleTabChange = useCallback(
    (value: Tab) => {
      if (value !== curTab) {
        setCurTab(value)
      }
    },
    [curTab],
  )

  return (
    <div className={classNames}>
      <div className="text relative flex  flex-col gap-2 items-start pb-5">
        <h3 className="text-2xl font-semibold">{dict.name}</h3>
        <p className="mt-1">{dict.chapterCount} Chapters</p>
        <p> {dict.length} Words</p>
        <p>{dict.description}</p>
        <div className="mt-auto">
          <ToggleGroup type="single" value={curTab} onValueChange={handleTabChange}>
            <ToggleGroupItem
              value={Tab.Chapters}
              disabled={curTab === Tab.Chapters}
              className={`${curTab === Tab.Chapters ? 'text-primary-foreground bg-primary' : ''} disabled:opacity-100`}
            >
              <MajesticonsPaperFoldTextLine className="mr-1.5 text-gray-500" />
              Select Chapter
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="flex pl-0">
        <Tabs value={curTab} className="h-[30rem] w-full ">
          <TabsContent value={Tab.Chapters} className="h-full ">
            <ScrollArea className="h-[30rem] ">
              <div className="flex w-full flex-wrap gap-3">
                {range(0, dict.chapterCount, 1).map((index) => (
                  <Chapter
                    key={`${dict.id}-${index}`}
                    index={index}
                    checked={chapter === index}
                    dictID={dict.id}
                    onChange={onChangeChapter}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
