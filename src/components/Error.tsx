import { useRouteError } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Error = () => {
  const error: any = useRouteError()

  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('ErrorPage.Heading')}</h1>
      <p>{error.data || error.message}</p>
      <a href='/'>{t('ErrorPage.GoToHomePage')}</a>
    </div>
  )
}
