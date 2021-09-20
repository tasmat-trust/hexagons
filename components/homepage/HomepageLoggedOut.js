import { Button, ImageList, ImageListItem } from "@material-ui/core"
import Image from 'next/image'
import { useLoginLogout } from '../auth/session'

import { makeStyles } from '@material-ui/core/styles';


const styles = makeStyles((theme) => ({
  homepage: {
    display: 'flex',
    minHeight: '90vh',
    flexDirection: 'column'
  },
  content: {
    flexGrow: '1'
  },
  welcome: {
    textAlign: 'center'
  },
  imageListItem: { 
  }
}));



export default function HomepageLoggedIn(props) {
  const { login } = useLoginLogout(props)
  const classes = styles()
  return (
    <section className={classes.homepage}>
      <div className={classes.content}>
        <h1 className={classes.welcome}>Welcome to Hexagons.</h1>
      </div>
      <ImageList cols={5} rowHeight={200}>
        <ImageListItem className={classes.imageListItem}>
          <Image src="/logos/department-for-education.png" alt="Department for Education" width="630" height="408" layout="responsive" />
        </ImageListItem>
        <ImageListItem className={classes.imageListItem}>
          <Image src="/logos/east-sussex-county-council.png" alt="East Sussex County Council" width="300" height="300" layout="responsive" />
        </ImageListItem>
        <ImageListItem className={classes.imageListItem}>
          <Image src="/logos/hastings-opportunity-area.png" alt="Hastings Opportunity Area" width="217" height="100" layout="responsive" />
        </ImageListItem>
        <ImageListItem className={classes.imageListItem}>
          <Image src="/logos/saxon-mount-community-school.png" alt="Saxon Mount Community School" width="512" height="493" layout="responsive" />
        </ImageListItem>
        <ImageListItem className={classes.imageListItem}>
          <Image src="/logos/torfield-school.png" alt="Torfield School" width="223" height="226" layout="responsive" />
        </ImageListItem>
      </ImageList>
    </section>
  )
}