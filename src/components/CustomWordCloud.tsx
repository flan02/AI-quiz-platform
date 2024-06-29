'use client'

import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import D3WordCloud from 'react-d3-cloud'
type Props = {
  formattedTopics: {
    text: string,
    value: number
  }[]
}


const fontSizeMapper = (word: { value: number }) => Math.log2(word.value) * 5

const CustomWordCloud = ({ formattedTopics }: Props) => {

  //console.log('formattedTopics: ', formattedTopics)
  const theme = useTheme()
  const router = useRouter()
  return (

    <D3WordCloud data={formattedTopics}
      onWordClick={(event, word) => {
        router.push(`/quiz?topic=${word.text}`)
      }}
      fill={theme.theme === 'dark' ? 'white' : 'dark'}
      height={500} font='Times' fontSize={fontSizeMapper} rotate={0} padding={10}
    />

  )
}

export default CustomWordCloud