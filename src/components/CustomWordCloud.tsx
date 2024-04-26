'use client'

import { useTheme } from 'next-themes'
import D3WordCloud from 'react-d3-cloud'

type Props = {}
const data = [
  {
    text: 'Bobbi',
    value: 20,
  },
  {
    text: 'Crack',
    value: 500
  },
  {
    text: 'Ladron',
    value: 130
  },
  {
    text: 'Ingenio',
    value: 130
  }
]

const fontSizeMapper = (word: { value: number }) => Math.log2(word.value) * 5

const CustomWordCloud = (props: Props) => {


  const theme = useTheme()
  return (
    <>
      <D3WordCloud data={data}
        fill={theme.theme === 'dark' ? 'white' : 'dark'}
        height={550} font='Time' fontSize={fontSizeMapper} rotate={0} padding={10} />
    </>
  )
}

export default CustomWordCloud