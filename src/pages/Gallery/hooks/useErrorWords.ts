import type { Dictionary, Word } from '@/typings'
import { db } from '@/utils/db'
import type { WordRecord } from '@/utils/db/record'
import { wordListFetcher } from '@/utils/wordListFetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

type groupRecord = {
  word: string
  records: WordRecord[]
}

export type TErrorWordData = {
  word: string
  originData: Word
  errorCount: number
  latestErrorTime: number
}

export default function useErrorWordData(dict: Dictionary, reload: boolean) {
  const { data: wordList, error, isLoading } = useSWR(dict?.url, wordListFetcher)

  const [errorWordData, setErrorData] = useState<TErrorWordData[]>([])

  useEffect(() => {
    if (!wordList) return
    
    db.wordRecords
      .where('wrongCount')
      .above(0)
      .filter((record) => record.dict === dict.id)
      .toArray()
      .then((records) => {
        const groupRecords: groupRecord[] = []

        records.forEach((record) => {
          let groupRecord = groupRecords.find((g) => g.word === record.word)
          if (!groupRecord) {
            groupRecord = { word: record.word, records: [] }
            groupRecords.push(groupRecord)
          }
          groupRecord.records.push(record as WordRecord)
        })

        const res: TErrorWordData[] = []

        groupRecords.forEach((groupRecord) => {
          const errorLetters = {} as Record<string, number>
          const word = wordList.find((word) => word.name === groupRecord.word)
          if (!word) return

          const errorData: TErrorWordData = {
            word: groupRecord.word,
            originData: word,
            errorCount: groupRecord.records.reduce((acc, cur) => {
              acc += cur.wrongCount
              return acc
            }, 0),

            latestErrorTime: groupRecord.records.reduce((acc, cur) => {
              acc = Math.max(acc, cur.timeStamp)
              return acc
            }, 0),
          }
          res.push(errorData)
        })

        setErrorData(res)
      })
  }, [dict.id, wordList, reload])

  return { errorWordData, isLoading, error }
}
