
const getStyles = () => ({
    title: {
      fontSize: 15,
      padding: '15px',
      marginBottom: '50px',
      alignContent:'center',
      JustifyContent:'center'
    }
  })
  
  const Title = (props) => {
    const {title}=props
    const styles = getStyles()
  
    return <h1 style={styles.title}>{title}</h1>
  }
  
  export default Title