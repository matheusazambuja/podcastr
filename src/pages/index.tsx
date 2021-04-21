import { GetStaticProps } from "next"

// Pode ser feito com type ou interface
type HomeProps = {

}

export default function Home(props) {
  return (
    <>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  )
}

// Tipar de função por completo:
// Tipagem dos Parâmetros e retorno da função ao mesmo tempo
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}