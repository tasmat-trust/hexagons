import CustomHead from '../components/ui-globals/CustomHead'
import Link from 'next/link'

export default function FourOhFour() {
  return <>
    <CustomHead titleContent="404 - Page not found" justTitle={true} />
    <h1>404 - Page Not Found</h1>
    <Link href="/">
      <a>
        Go back home
      </a>
    </Link>
  </>
}

