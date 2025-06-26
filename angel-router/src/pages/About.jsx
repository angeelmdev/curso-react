import { Link } from '../Link.jsx';

const i18n = {
  es: {
    title: 'Sobre nosotros',
    button: 'Ir a la Home',
    description: '¡Hola! me llamo Ángel Moreno'
  },
  en: {
    title: 'About us',
    button: 'Go to Home',
    description: 'Hi! My name is Angel Moreno'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')

  return (
    <>
      <h1>{i18n.title}</h1>
      <img src="https://avatars.githubusercontent.com/u/211195022?v=4" alt="Ángel" />
      <p>{i18n.description}</p>
      <Link to='/'>Ir a Home</Link>
    </>
  )
}
