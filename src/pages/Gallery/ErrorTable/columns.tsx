import type { TErrorWordData } from '../hooks/useErrorWords'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { ColumnDef } from '@tanstack/react-table'
import PhArrowsDownUpFill from '~icons/ph/arrows-down-up-fill'
import DeleteIcon from '~icons/weui/delete-filled'

export type ErrorColumn = {
  word: string
  wordart: string
  trans: string
  errorCount: number
}

export const errorColumns = (onDelete: (word: string) => Promise<void>): ColumnDef<ErrorColumn>[] => [
  {
    accessorKey: 'word',
    size: 100,
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="p-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Word
          <PhArrowsDownUpFill className="ml-1.5 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'trans',
    size: 500,
    header: 'translation',
  },
  {
    accessorKey: 'errorCount',
    size: 40,
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="p-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Error Times
          <PhArrowsDownUpFill className="ml-1.5 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <span className="flex justify-center">{row.original.errorCount} </span>
    },
  },
  {
    accessorKey: 'wordart',
    header: 'Wordart',
    size: 40,
    cell: ({ row }) => {
      return <span className="flex justify-center">{row.original.wordart} </span>
    },
  },
  {
    accessorKey: 'delete',
    header: '',
    size: 40,
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DeleteIcon className="cursor-pointer" onClick={() => onDelete(row.original.word)} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Records</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
]

export function getRowsFromErrorWordData(data: TErrorWordData[]): ErrorColumn[] {
  return data.map((item) => {
    return {
      word: item.word,
      wordart: item.originData.wordart,
      trans: item.originData.trans.join(',') ?? '',
      errorCount: item.errorCount,
    }
  })
}
